import { Link } from "react-router-dom";
import { Dots } from "../../svg";

export default function ProfileMenu() {
  return (
    <div className="profile_menu_wrap">
      <div className="profile_menu">
        <Link to="/" className="profile_menu_active">
          POSTS
        </Link>
        <Link to="/" className="hover1">
          FOLLOWERS
        </Link>
        <Link to="/" className="hover1">
          FOLLOWING
        </Link>
        <Link to="/" className="hover1">
          SAVED
        </Link>
      </div>
    </div>
  );
}
