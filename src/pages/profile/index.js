import axios from "axios";
import { useEffect, useState } from "react";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import { ProfileReducer } from "../../functions/Reducers";
import Cover from "./cover";
import ProfilePictureinfos from "./ProfilePictureinfos";
import "./style.css";
import ProfileMenu from "./ProfileMenu";
import Photo from "./Photo";

export default function Profile() {
  const [show, setShow] = useState(false);
  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const userName = username === undefined ? user.username : username;
  const [{ loading, error, profile }, dispatch] = useReducer(ProfileReducer, {
    loading: false,
    profile: {},
    error: "",
  });

  useEffect(() => {
    getProfile();
  }, [userName]);

  var visitor = userName === user.username ? false : true;
  const Navigate = useNavigate();

  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (data.ok === false) {
        Navigate("/profile");
      } else {
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile.cover} visitor={visitor} />
          <ProfilePictureinfos
            profile={profile}
            visitor={visitor}
            setShow={setShow}
            show={show}
          />
          <ProfileMenu />
          <Photo username={userName} token={user.token} />
        </div>
      </div>
    </div>
  );
}
