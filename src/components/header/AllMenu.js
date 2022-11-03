import { menu, create } from "../../data/allMenu";
import AllmenuItems from "./AllMenuItems.js";
export default function AllMenu() {
  return (
    <div className="all_menu">
      <div className="all_menu_header">Menu</div>
      <div className="all_menu_wrap scrollbar">
        <div className="all_left">
          <div className="all_menu_search">
            <i className="amm_s_ic"></i>
            <input type="text" placeholder="search menu.." />
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">All Menus</div>
            {menu.map((item, i) => (
              <AllmenuItems
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
