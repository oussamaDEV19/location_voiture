import React, { useEffect, useState } from "react";
import {connect, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { logout } from '../../../store/actions/AuthActions';
import { isAuthenticated } from '../../../store/selectors/AuthSelectors';
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

//import ChatBox from "../ChatBox";
import LogoutPage from './Logout';

/// Image
import profile from "../../../images/me.png";
import avatar from "../../../images/avatar/1.jpg";
import { Dropdown } from "react-bootstrap";
import axios from "axios";


function Header ({onNote}) {

  const PF = "http://localhost:8800/images/"
  const [agence, setAgence] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/api/agences/61460dbb02f0294a903e9498");
      setAgence(res.data)
    };
    fetchUser();
  }, []);
    
  var path = window.location.pathname.split("/");
  var name = path[path.length - 1].split("-");
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  var finalName = filterName.includes("app")
    ? filterName.filter((f) => f !== "app")
    : filterName.includes("ui")
    ? filterName.filter((f) => f !== "ui")
    : filterName.includes("uc")
    ? filterName.filter((f) => f !== "uc")
    : filterName.includes("basic")
    ? filterName.filter((f) => f !== "basic")
    : filterName.includes("jquery")
    ? filterName.filter((f) => f !== "jquery")
    : filterName.includes("table")
    ? filterName.filter((f) => f !== "table")
    : filterName.includes("page")
    ? filterName.filter((f) => f !== "page")
    : filterName.includes("email")
    ? filterName.filter((f) => f !== "email")
    : filterName.includes("ecom")
    ? filterName.filter((f) => f !== "ecom")
    : filterName.includes("chart")
    ? filterName.filter((f) => f !== "chart")
    : filterName.includes("editor")
    ? filterName.filter((f) => f !== "editor")
    : filterName;
  // console.log(finalName.join(" "));
   console.log(finalName);
  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
				 <div
					className="dashboard_bar"
					style={{ textTransform: "capitalize" }}
				  >
					{finalName.join(" ").length === 0
					  ? "Dashboard"
					  : finalName.join(" ") === "dashboard dark"
					  ? "Dashboard"
					  : finalName.join(" ")}
				</div> 
            </div>
            <ul className="navbar-nav header-right main-notification">
				
				
              <Dropdown as="li" className="nav-item dropdown header-profile">
                <Dropdown.Toggle
                  variant=""
                  as="a"
                  className="nav-link i-false c-pointer"
                  // href="#"
                  role="button"
                  data-toggle="dropdown"
                >
                  <img src={ agence.profileImg
                      ? PF + agence.profileImg
                      : PF + "noAvatar.png"} width={20} alt={agence.profileImg} />
                  <div className="header-info">
                    <span>{agence.nom}</span>
                    <small>Administrateur</small>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu align="right" className="mt-2">
                  <Link to="/app-profile" className="dropdown-item ai-icon">
                    <svg
                      id="icon-user1"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                    <span className="ml-2">Profile </span>
                  </Link>


                  <LogoutPage />
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
