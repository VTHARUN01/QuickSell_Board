import React from "react";
import Dropdown from "react-dropdown";

import "react-dropdown/style.css";
import "./Navbar.css";

const NavBar = ({ setGrp, setStatus, setPriority, setUser, grp }) => {
  return (
    <div className="Navbar">
      <a href="https://quicksell.co/">
        <img
          src={"https://dwtqm09zovi8z.cloudfront.net/assets/powered_by.png"}
          alt="logo"
          className="Navbar__img"
        />
      </a>

      <div className="Navbar__filter">
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
  );
};

export default NavBar;
