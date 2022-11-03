import axios from "axios";
import React, { useRef, useState } from "react";
import Moment from "react-moment";

import { useEffect } from "react";
import { getSingleData } from "../../functions/post";
import useClickOutide from "../../helpers/clickOutside";
import CreateComment from "./CreateComment";

export default function Details_page({
  user,
  post,
  setShow,
  myComment,
  setMyComment,
}) {
  console.log("post", post);
  const [viewComment, setViewComment] = useState(true);
  const popup = useRef(null);
  useClickOutide(popup, () => {
    setShow(false);
    setViewComment((prev) => !prev);
  });
  return (
    <div className="blur">
      <div className="more_comments_wraps" ref={popup}>
        <div className="more_comments_right">
          <div className="post_wrap">
            <img src={post.images.length ? post.images[0].url : ""} alt="" />
          </div>
        </div>
        <div className="more_comments_left">
          <div className="header_part">
            <img src={post.user.picture} alt="" width={50} height={50} />
            <div className="header_user_name">{post.user.username}</div>
          </div>
          <div className="comment_section">
            <div className="comments_wrap">
              {post.ads ? (
                ""
              ) : (
                <>
                  <div className="view_comments">
                    {post.comments.map((comment) => (
                      <div className="comment_wraps">
                        <div className="comment_text">
                          <p className="view_comments_1">
                            {comment.commentBy.username}
                          </p>
                          <p className="view_comments_2">{comment.comment}</p>
                        </div>
                        <div className="comment_time">
                          <Moment fromNow interval={30}>
                            {comment.commentAt}
                          </Moment>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="comment_input_field">
            <CreateComment
              user={user}
              postId={post._id}
              setMyComment={setMyComment}
              viewComment={viewComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
