import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Username from "./Username";
import axios from "axios";
import {useSelector, useDispatch } from 'react-redux';
import { loggedin,  } from '../actions';
import 'bootstrap/dist/css/bootstrap.min.css';


function Login() {

  
  
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  const [showing, setShowing] = useState({
    inputShow: false,
    actionTitle: "Login",
    icon: "fas fa-user lock mr-2",
    color: "row login-row",
    question: "Don't have an Account!",
    action: " Sign Up Here"
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
    username: ""
  });

  const [message, setMessage] = useState({
    msg: "",
    color: "mess-collor-red"
  });

  function takeData(event) {
    // console.log("intra");
    const { name, value } = event.target;
    setLogin(prev => {
      if (name === "email")
        return {
          ...prev,
          email: value
        };
      else if (name === "password")
        return {
          ...prev,
          password: value
        };
      else if (name === "username")
        return {
          ...prev,
          username: value
        };
    });
  }

  function unhideUsername() {
    setShowing(() => {
      if (showing.inputShow) {
        return {
          inputShow: false,
          actionTitle: "Login",
          icon: "fas fa-user lock mr-2",
          color: "row login-row",
          question: "Don't have an Account!",
          action: " Sign Up Here"
        };
      } else if (!showing.inputShow) {
        return {
          inputShow: true,
          actionTitle: "Register",
          icon: "fas fa-edit lock mr-2",
          color: "row login-row bg-purple",
          question: "I have a accout!",
          action: " Login here"
        };
      }
    });

    //hide message
    setMessage(prev => {
      return {
        ...prev,
        msg: ""
      };
    });
  }

  function postData() {
    const { username, email, password } = login;

    //if button sais register create acount with data posted
    if (showing.actionTitle === "Register") {
      //register post (create account)
      axios({
        method: "post",
        url: "http://localhost:5000/register",
        data: {
          name: username,
          email: email,
          password: password
        }
      })
        .then(function(response) {
          //console.log(response);
          if (response.status === 200) {
            setMessage({
              msg: "Account created successfully",
              color: "mess-collor-green"
            });
          }
        })
        .catch(function(error) {
          console.log(error.response);

          setMessage({
            msg: error.response.data,
            color: "mess-collor-red"
          });
        });
    } //if button sais Login try to log in with data posted
    else if (showing.actionTitle === "Login") {
      //login user
      axios({
        method: "post",
        url: "http://localhost:5000/login",
        data: {
          email: email,
          password: password
        }
      })
        .then(function(response) {
         // console.log(response);
          if (response.status === 200) {
            setMessage({
              msg: response.data.username,
              color: "mess-collor-green"
            });

            //save token in localStorage if response status 200
            try
            {
              localStorage.setItem('authToken',response.data.authToken);
            }
            catch(e){
              console.log(e);
            }
            
            
            
            //set logged in to true so we can redirect to homepage in return             
            //add the loggedin state to local storage
            try
            {
              localStorage.setItem('loggedIn','true');
              localStorage.setItem('username',response.data.username);
              localStorage.setItem('gravatar',response.data.gravatar);
              dispatch(loggedin());
            }
            catch(e){
              console.log(e);
            }
            
           

          }
        })
        .catch(function(error) {
          console.log(error.response);

          setMessage({
            msg: error.response.data,
            color: "mess-collor-red"
          });
        });
    }
  }



  return (
    <>
      {isLogged ? <Redirect to='/' /> : null}
      <div className="container login-container">
        <div className={showing.color}>
          <h1 className="login-title">
            <i className={showing.icon} aria-hidden="true" />{" "}
            {showing.actionTitle}
          </h1>
        </div>
        <br />
        <span className={message.color}>
          <strong>{message.msg==="Account created successfully" ? <div>{message.msg}<br/>Confirmation email sent!</div> : message.msg  }</strong>
        </span>
        <br />{" "}
        {showing.inputShow ? (
          <Username onChange={takeData} value={login.username} />
        ) : null}
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-envelope" />
            </span>
          </div>
          <input
            type="email"
            name="email"
            onChange={takeData}
            className="form-control"
            placeholder="Email"
            value={login.email}
          />
        </div>
        <br />
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-key icon" />
            </span>
          </div>
          <input
            type="password"
            name="password"
            onChange={takeData}
            className="form-control"
            placeholder="Password"
            value={login.password}
          />
        </div>
        <br />
        
        <br />
        <button
          type="submit"
          onClick={postData}
          className="btn btn-success login-button"
        >
          <span className="glyphicon glyphicon-off" /> {showing.actionTitle}
        </button>
       
        <br />
        <hr className="login-hr" />
        <div className="footer">
          <p>
            {showing.question}
            <Link  className="login-register-here" onClick={unhideUsername} to="/Login">
              {showing.action}
            </Link>
          </p>
          <p>            
            <Link className="forgot-password" to="/Login">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
