import React, { useEffect, useState } from "react";
import EmojiPickerBackgrounds from "../createPostPopup/EmojiPickerBackgrounds";
import PulseLoader from "react-spinners/PulseLoader";
import { uploadComment } from "../../functions/post";

export default function CreateComment({
  user,
  postId,
  setMyComment,
  viewComment,
}) {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState("");

  const submitComment = async (e) => {
    if (e.key === "Enter") {
      await uploadComment(postId, comments, user.id, user.token);
      setMyComment((prev) => [
        ...prev,
        { comment: comments, commentBy: user.id, commentAt: new Date() },
      ]);
      setComments("");
    }
  };

  return (
    <div className={viewComment ? "view_comment_wrap" : "comment_wrap"}>
      <div className="left_comment">
        <i className="comment_icon"></i>
      </div>
      <div className={viewComment ? "view_middle_comment" : "middle_comment"}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Add a comment..."
          value={comments}
          onChange={(e) => {
            setComments(e.target.value);
          }}
          onKeyUp={submitComment}
        />
      </div>
      <div className="right_comment">
        <button className="post_submit" onClick={() => submitComment}>
          {loading ? <PulseLoader color="#fff" size={5} /> : "Post"}
        </button>
      </div>
    </div>
  );
}
