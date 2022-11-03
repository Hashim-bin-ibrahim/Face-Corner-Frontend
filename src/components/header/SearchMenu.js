import "./style.css";
import { Return, Search } from "../../svg";
import { useRef } from "react";
import useClickOutide from "../../helpers/clickOutside";
import { useState } from "react";
import { useEffect } from "react";

export default function SearchMenu(props) {
  const { color, setShowSearchMenu } = props;
  const menu = useRef(null);
  const input = useRef(null);
  const [iconVisible, setIconVisible] = useState(true);
  useClickOutide(menu, () => {
    setShowSearchMenu(false);
  });
  useEffect(() => {
    input.current.focus();
  });
  return (
    <div className="header_left search_area scroll_bar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover_1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
          onFocus={() => {
            setIconVisible(false);
          }}
          onBlur={() => {
            setIconVisible(true);
          }}
        >
          <div>{iconVisible && <Search color={color} />}</div>
          <input type="text" placeholder="search.." ref={input} />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent Search</span>
        <a href=""> Edit</a>
      </div>
      <div className="search_histoty"></div>
      <div className="search_results scroll_bar"></div>
    </div>
  );
}
