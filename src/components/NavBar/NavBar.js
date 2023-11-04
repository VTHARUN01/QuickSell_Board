import React from "react";
import Dropdown from "react-dropdown";
import Popup from "reactjs-popup";

import "react-dropdown/style.css";
import "reactjs-popup/dist/index.css";
import "./Navbar.css";

const NavBar = ({ setGrp, setStatus, setPriority, setUser, grp }) => {
  const ref = React.useRef();
  return (
    <div className="Navbar">
      <Popup
        ref={ref}
        trigger={
          <div className="Navbar__Display">
            <span class="material-symbols-outlined">tune</span>Display
          </div>
        }
        modal
      >
        <div className="Navbar__filter">
          <div className="Navbar__drp">
            <div className="Navbar__filter__heading">Grouping </div>
            <Dropdown
              options={["Status", "User", "Priority"]}
              value={"Status"}
              placeholder="Grouping"
              className="Navbar__filter__dropdown"
              onChange={(e) => {
                setStatus(false);
                setPriority(false);
                setUser(false);
                if (e.value === "Status") {
                  setStatus(true);
                }
                if (e.value === "User") {
                  setUser(true);
                }
                if (e.value === "Priority") {
                  setPriority(true);
                }
              }}
            />
          </div>
          <div className="Navbar__drp">
            <div className="Navbar__filter__heading">Ordering</div>
            <Dropdown
              options={["Priority", "Title"]}
              placeholder="Ordering"
              value={"Priority"}
              className="Navbar__filter__dropdown"
              onChange={() => {
                setGrp(!grp);
              }}
            />
          </div>
        </div>
      </Popup>
      <a href="https://quicksell.co/">
        <img
          src={"https://dwtqm09zovi8z.cloudfront.net/assets/powered_by.png"}
          alt="logo"
          className="Navbar__img"
        />
      </a>
    </div>
  );
};

export default NavBar;
