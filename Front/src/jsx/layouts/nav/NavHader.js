	import React, { Fragment, useContext, useEffect, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";

import "./NavHader.css"

import logg from "../../../images/logo.JPG";
import axios from "axios";

const NavHader = () => {
  const PF = "http://localhost:8800/images/"
  const [agence, setAgence] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/api/agences/61460dbb02f0294a903e9498");
      setAgence(res.data)
    };
    fetchUser();
  }, []);
  const [toggle, setToggle] = useState(false);
  const { navigationHader, openMenuToggle, background } = useContext(
    ThemeContext
  );
  return (
    <div className="nav-header">
      <Link to="/" >
        {
			<div className="loca_dev">
			  <img src={ agence.profileImg
                      ? PF + agence.logo
                      : PF + "noAvatar.png"} alt=""  className="logo_location" />
			  {
				  !toggle ? 
				  <div className="name_location">{ agence.nom }</div>
				  :
				  null
			  }
          </div>
		}
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
