import React from "react";
import {Link} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loggedout } from "../actions";

function UserToggleMenu() {
  const username = localStorage.getItem("username");
  const gravatar = localStorage.getItem("gravatar");
  const dispatch = useDispatch();
  //const [logoutRefresher,setlogoutRefresher] = useState(false);

  function logout() {
    dispatch(loggedout());
    localStorage.setItem('loggedIn', 'false');
    localStorage.setItem('authToken', '');
    //setlogoutRefresher(!logoutRefresher);
  }

  //useEffect(()=> {  },[logoutRefresher]);

  return (
    <>
    
      <div className="dropdown">
        <span
          className="btn btn-primarydropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
        <img className="gravatar" src={gravatar} alt="avatar" /> 
        </span>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <Link className="dropdown-item" to="/UserFile">
          {username}
          </Link>
          <Link className="dropdown-item" to="/About">
          About
          </Link>
          <button className="dropdown-item" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default UserToggleMenu;
