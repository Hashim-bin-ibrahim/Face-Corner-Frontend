import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { friendsReducer } from "../../functions/Reducers";
import { follow, getFollowers, unfollow } from "../../functions/user";
import "./style.css";
import useClickOutside from "../../helpers/clickOutside";

export default function Followers_details({ setShow, name, setVisible }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [followed_users, setFollowed_users] = useState([]);
  const popup = useRef(null);

  const [{ loading, error, data }, dispatch] = useReducer(friendsReducer, {
    loading: false,
    data: {},
    error: "",
  });

  useEffect(() => {
    getData();
  }, [data]);

  useClickOutside(popup, () => {
    setVisible(false);
  });

  const getData = async () => {
    try {
      dispatch({ type: "FRIENDS_REQUEST" });
      const data = await getFollowers(user.token);

      if (data.status == "ok") {
        dispatch({ type: "FRIENDS_SUCCESS", payload: data.data });
      } else {
        dispatch({ type: "FRIENDS_ERROR", payload: data.data });
      }
      setFollowed_users(data.user.followers);
    } catch (error) {
      return error.response.data.message;
    }
  };
  console.log(data);

  const followHandler = async (userId) => {
    await follow(userId, user.token);
  };

  const unFollowHandler = async (userId) => {
    await unfollow(userId, user.token);
  };

  return (
    <div className="blur">
      <div className="followers_wraps" ref={popup}>
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setShow(false);
              setVisible(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          {name === "following" ? (
            <span>Following</span>
          ) : name === "followers" ? (
            <span>Followers</span>
          ) : (
            ""
          )}
        </div>
        {name === "followers" &&
          data.followers?.map((f, i) => (
            <>
              <div className="single_follower" key={f._id}>
                <div className="follower_image">
                  <img src={f.picture} alt="" height={50} width={50} />
                </div>
                <div className="follower_name">
                  <span>{f.username}</span>
                </div>
                <div>
                  {data.following.find((el) => el._id === f._id) ? (
                    <button className="blue_btn">
                      <span> Friends</span>
                    </button>
                  ) : (
                    <button
                      className="blue_btn"
                      onClick={() => {
                        followHandler(f._id);
                      }}
                    >
                      <span>Follow Back</span>
                    </button>
                  )}
                </div>
              </div>
            </>
          ))}
        {name === "following" &&
          data.following?.map((f, i) => (
            <>
              <div className="single_follower" key={f._id}>
                <div className="follower_image">
                  <img src={f.picture} alt="" height={50} width={50} />
                </div>
                <div className="follower_name">
                  <span>{f.username}</span>
                </div>
                <div>
                  {data.followers.find((el) => el._id === f._id) ? (
                    <button className="blue_btn">
                      <span> Friends</span>
                    </button>
                  ) : (
                    <button
                      className="blue_btn"
                      onClick={() => {
                        unFollowHandler(f._id);
                      }}
                    >
                      <span>UnFollow</span>
                    </button>
                  )}
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}
