import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserToggleMenu from "./UserToggleMenu";
import { FaBars } from "react-icons/fa";
import { sendSearchTermToRedux } from "../actions";

import { useLocation } from "react-router-dom";

function Navbar() {
  const isLogged = useSelector((state) => state.isLogged);

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  function getSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  //set class to bring backdrop image forward and after the pbuttons
  const [cl, setCl] = useState("");
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const currentPath = location.pathname;
    //console.log("current path:", currentPath);

    if (currentPath === "/SpecificMovie") {
      setCl("add-opacity-to-new-navbar-in-component");
    } else setCl("");
  }, [location]);

  function onEnter(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
      if(searchTerm!=="" && searchTerm.trim()!=="") {
        dispatch(sendSearchTermToRedux(searchTerm));
      }
      history.push("/Search");
    }
  }

  return (
    <nav className={`new-navbar ${cl}`}>
      <Link className="new-logo" to="/">
        TapeSnippets
      </Link>

      <label
        className="navbar-toggle"
        id="js-navbar-toggle"
        htmlFor="chkToggle"
      >
        <FaBars />
      </label>

      <input type="checkbox" id="chkToggle"></input>

      <ul className="new-ul">
        <li>
          {isLogged ? (
            <UserToggleMenu />
          ) : (
            <Link className="new-links" to="/Login">
              Login
            </Link>
          )}
        </li>
        <li>
          <Link className="new-links" to="/Films">
            Films
          </Link>
        </li>
        <li>
          <Link className="new-links" to="/People">
            People
          </Link>
        </li>
        <li>
          <Link className="new-links" to="/Ratings">
            Ratings
          </Link>
        </li>
        <li>
          <Link className="new-links" to="/WatchLater">
            WatchLater
          </Link>
        </li>
        <li>
          <Link className="new-links" to="/Reviews">
            Reviews
          </Link>
        </li>
        {/*<li>
          <Link className="new-links " to="/Trash">
            Trash
          </Link>
        </li>*/}

        <li>
          <input 
            onKeyUp={onEnter}
            type="text"
            className="new-searchbox begining-round-inbox-borders search-input"
            placeholder=""
            value={searchTerm}
            onChange={getSearchTerm}
          />
          <Link to="/Search">
            <button
              onClick={() => dispatch(sendSearchTermToRedux(searchTerm))}
              className="new-btn end-round-inbox-borders "
            >
              <i className="fa fa-search"></i>
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
