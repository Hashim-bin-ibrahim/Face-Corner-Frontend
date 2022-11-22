import { useState } from "react";
import { Link } from "react-router-dom";
import Followers_details from "../../components/Followers_details";
import { Dots } from "../../svg";

export default function ProfileMenu({ profile, visitor, photos, othername }) {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <div className="profile_menu_wrap">
      <div className="profile_menu">
        <Link to="/" className="profile_menu_active">
          POSTS
        </Link>

        <Link
          to={""}
          onClick={() => setShow((prev) => !prev)}
          className="hover1"
        >
          FOLLOWERS
        </Link>
        {show && <Followers_details setShow={setShow} name="followers" />}

        <Link
          to={""}
          onClick={() => setVisible((prev) => !prev)}
          className="hover1"
        >
          FOLLOWING
        </Link>
        {visible && (
          <Followers_details setVisible={setVisible} name="following" />
        )}

        <Link to="/" className="hover1">
          SAVED
        </Link>
      </div>
    </div>
  );
}
