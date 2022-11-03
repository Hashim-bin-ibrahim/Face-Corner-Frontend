import { Link, Navigate } from "react-router-dom";
import "./style.css";
import Moment from "react-moment";
import { Dots, Public } from "../../svg";
import ReactsPopup from "./ReactsPopup";
import { useState } from "react";
import CreateComment from "./CreateComment";
import { useNavigate } from "react-router-dom";
import Details_page from "./Details_page";
import { useEffect } from "react";
import { getReacts } from "../../functions/post";

export default function Post({ post, user }) {
  const Navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [viewComment, setViewComment] = useState(true);
  const initialComment = post.comments.filter(
    (obj) => obj.commentBy == user.id
  );

  const [myComment, setMyComment] = useState(initialComment);

  // useEffect(() => {
  //   getPostReacts();
  // }, [post]);

  // // const getPostReacts = async () => {
  // //   const res = await getReacts(post._id, user.token);
  // // };

  // useEffect(() => {
  //   setComments([post.comment]);
  // }, [post]);

  return (
    <>
      <div className="post">
        <div className="post_header">
          <Link
            to={`/profile/${post.user.username}`}
            className="post_header_left"
          >
            <img src={post.user.picture} alt="" />
            <div className="header_col">
              <div className="post_profile_name">
                {post.user.first_name} {post.user.last_name}
                <div className="updated_p">
                  {post.type == "profilePicture" &&
                    `updated ${
                      post.user.gender === "male" ? "his" : "her"
                    } profile picture`}
                  {post.type == "cover" &&
                    `updated ${
                      post.user.gender === "male" ? "his" : "her"
                    } cover picture`}
                </div>
              </div>

              {post.ads ? (
                <div className="post_profile_privacy_date">
                  <h5>Sponsored </h5>
                  <Public color="#828387" />
                </div>
              ) : (
                <div className="post_profile_privacy_date">
                  <Moment fromNow interval={30}>
                    {post.createdAt}
                  </Moment>
                  <Public color="#828387" />
                </div>
              )}
            </div>
          </Link>
          <div className="post_header_right hover1">
            <Dots color="#828387" />
          </div>
        </div>
        {post.background ? (
          <div
            className="post_bg"
            style={{ backgroundImage: `url(${post.background})` }}
          >
            <div className="post_bg_text">{post.text}</div>
          </div>
        ) : (
          <>
            <div className="post_text">{post.text}</div>
            {post.images && post.images.length && (
              <div
                className={
                  post.images.length === 1
                    ? "grid_1"
                    : post.images.length === 2
                    ? "grid_2"
                    : post.images.length === 3
                    ? "grid_3"
                    : post.images.length === 4
                    ? "grid_4"
                    : post.images.length >= 5 && "grid_5"
                }
              >
                {post.images.map((image, i) => (
                  <img
                    src={image.url}
                    key={i}
                    alt=""
                    className={`image-${i}`}
                  />
                ))}
                {post.images.length > 5 && (
                  <div className="more-pics-shadow">
                    +{post.images.length - 5}
                  </div>
                )}
              </div>
            )}
          </>
        )}
        {post.ads ? (
          <div className="ads_ref_buttons">
            <div className="ads_ref_text">
              click the button to redirect to our website
            </div>

            <button
              onClick={() => {
                window.open(`http://${post.adLink}`);
              }}
            >
              {" "}
              Click me
            </button>
          </div>
        ) : (
          <div className="post_infos">
            <div className="reacts_count">
              <div className="reacts_count_imgs"></div>
              <div className="reacts_count_num"></div>
            </div>
            {/* <div className="to_right">
              <div className="comments_count">13 comments</div>
              <div className="share_count">1 share</div>
            </div> */}
          </div>
        )}
        {post.ads ? (
          ""
        ) : (
          <div className="post_actions">
            <ReactsPopup
              visible={visible}
              setVisible={setVisible}
              postId={post._id}
            />
            <div
              className="post_action hover1"
              onMouseOver={() => {
                setTimeout(() => {
                  setVisible(true);
                }, 500);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setVisible(false);
                }, 500);
              }}
            >
              <i className="like_icon"></i>
              <span>Like</span>
            </div>
            <div className="post_action hover1">
              <i className="comment_icon"></i>
              <span>Comment</span>
            </div>
            <div className="post_action hover1">
              <i className="share_icon"></i>
              <span>Share</span>
            </div>
          </div>
        )}
        <div className="comments_wrap">
          {post.ads ? (
            ""
          ) : (
            <>
              {viewComment && (
                <div className="view_comments">
                  {post.comments.length == 0 ? (
                    ""
                  ) : (
                    <p
                      className="view_comments_p1"
                      onClick={() => {
                        setShow((prev) => !prev);
                      }}
                    >
                      view all {post.comments.length} comments
                    </p>
                  )}
                  {myComment.slice(-2).map((comment) => (
                    <div className="myComment_wraps">
                      <div className="myComment_text">
                        <p className="view_comments_p2">{user.username}</p>
                        <p className="view_comments_p3">{comment.comment}</p>
                      </div>
                      <div className="myComment_time">
                        <Moment fromNow interval={30}>
                          {comment.commentAt}
                        </Moment>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <CreateComment
                user={user}
                postId={post._id}
                setMyComment={setMyComment}
              />
            </>
          )}
        </div>
      </div>
      {show && (
        <Details_page
          user={user}
          post={post}
          setShow={setShow}
          myComment={myComment}
          setMyComment={setMyComment}
          CreateComment={CreateComment}
        />
      )}
    </>
  );
}
