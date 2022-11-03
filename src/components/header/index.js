import "./style.css";
import {
  ArrowDown,
  Friends,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchMenu from "./SearchMenu";
import { useState } from "react";
import { useRef } from "react";
import AllMenu from "./AllMenu";
import useClickOutide from "../../helpers/clickOutside";
import UserMenu from "./userMenu";
import { useNavigate } from "react-router-dom";

export default function Header({ page }) {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const Navigate = useNavigate();

  const { user } = useSelector((user) => ({ ...user }));
  const color = "#65676b";
  const userMenu = useRef(null);
  const showMenu = useRef(null);
  useClickOutide(userMenu, () => {
    setShowUserMenu(false);
  });
  useClickOutide(showMenu, () => {
    setShowAllMenu(false);
  });

  return (
    <div className="lll">
      <header>
        <div className="header_left">
          <Link to="/" className="header_logo">
            <div className="circle">
              <Logo />
            </div>
          </Link>
          <div
            className="search search1"
            onClick={() => {
              setShowSearchMenu(true);
            }}
          >
            <Search />
            <input type="text" placeholder="Search..." className="hide_input" />
          </div>
        </div>
        {showSearchMenu && (
          <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
        )}

        <div className="header_middle">
          <Link
            to="/"
            className={`middle_icon  hover_1 ${
              page === "home" ? "active" : ""
            }`}
          >
            {page === "home" ? <HomeActive /> : <Home color={color} />}
          </Link>
          <Link to="/" className="middle_icon hover_1">
            <Friends color={color} />
          </Link>
          <Link to="/" className="middle_icon hover_1">
            <Watch color={color} />
            <div className="middle_notification">9+</div>
          </Link>
          {/* <Link to="/" className="middle_icon hover_1">
            <Market color={color} />
          </Link> */}
          {/* <Link to="/" className="middle_icon hover_1">
            <Gaming color={color} />
          </Link> */}
        </div>

        <div className="header_right">
          <Link
            to="/profile"
            className={`profile_link hover_1 ${
              page === "profile" ? "active" : ""
            }`}
          >
            <img src={user?.picture} alt="" />
            <span>{user?.first_name}</span>
          </Link>
          <div
            className={`circle_icon hover_1 ${showAllMenu && "active_header"}`}
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
            ref={showMenu}
          >
            <Menu />
          </div>
          {showAllMenu && <AllMenu />}
          <div
            className={`circle_icon hover_1 ${
              page === "messenger" ? "active" : ""
            }`}
            onClick={() => {
              Navigate("/messenger");
            }}
          >
            <Messenger />
          </div>
          <div className="circle_icon hover_1">
            <Notifications />
            <div className="right_notification">5</div>
          </div>
          <div
            className={`circle_icon hover_1 ${showUserMenu && "active_header"}`}
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
            ref={userMenu}
          >
            <ArrowDown />
            {showUserMenu && <UserMenu user={user} />}
          </div>
        </div>
      </header>
    </div>
  );
}
