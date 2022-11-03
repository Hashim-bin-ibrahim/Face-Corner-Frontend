import { useEffect } from "react";
import { useState } from "react";
import ProfilePicture from "../../components/ProfilePicture";
import useClickOutide from "../../helpers/clickOutside";

export default function ProfilePictureinfos({
  profile,
  visitor,
  show,
  setShow,
}) {
  console.log("profile component rendrs................");
  return (
    <div className="profile_img_wrap">
      {show && <ProfilePicture setShow={setShow} />}
      <div className="profile_w_left">
        <div className="profile_w_img" onClick={() => setShow((prev) => !prev)}>
          <div
            className="profile_w_bg"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
          {!visitor && (
            <div className="profile_circle hover1">
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className="profile_w_col">
          <div className="profile_name">
            {profile.first_name} {profile.last_name}
            {/* <div className="othername">Othername</div> */}
          </div>
          <div className="profile_friend_count"></div>
          <div className="profile_friend_imgs"></div>
        </div>
      </div>
      {visitor ? (
        ""
      ) : (
        <div className="profile_w_right">
          <div className="blue_btn">
            <img src="../../../icons/plus.png" alt="" className="invert" />
            <span>Add to story</span>
          </div>
          <div className="gray_btn">
            <i className="edit_icon"></i>
            <span>Edit profile</span>
          </div>
        </div>
      )}
    </div>
  );
}
