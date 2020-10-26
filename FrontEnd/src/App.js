import React from "react";
import Navbar from "./components/Navbar2";
import Home from "./components/Home";
import Login from "./components/Login";
import Films from "./components/Films";
import People from "./components/People";
import Ratings from "./components/Ratings";
import WatchLater from "./components/WatchLater";
import Reviews from "./components/Reviews";
import myReviews from "./components/myReviews";
//import Trash from "./components/Trash";
import SpecificMovie from "./components/SpecificMovie";
import SpecificTSRatings from "./components/SpecificTSRatings";
import Search from "./components/Search";
import UserFile from "./components/UserFile";
import About from "./components/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useDispatch } from "react-redux";
import { loggedin, loggedout } from "./actions";
import { Helmet } from "react-helmet";
import ChangePassWord from "./components/ChangePassWord";
import PersonalInfo from "./components/PersonalInfo";




function App() {
 
  const dispatch = useDispatch();

  function checkLogStatus() {
    const logstatus = localStorage.getItem("loggedIn");
    if (logstatus==='true') {
      dispatch(loggedin());
    } else if (logstatus==='false') {
      dispatch(loggedout());
     // console.log(logstatus);
    } else {
      //  console.log(logstatus);
        dispatch(loggedout());
    }
  }

  return (
    <div>
      <Helmet>
        <title>TapeSnippets - Browse movies and write reviews or rate them</title>
        <meta name="description" content="Browse and find movies by category, with or without genre, sort them by popularity or rating, by language and much more.
        Rate movies and film and check the score on other websites. Discover a network of people and interact with them socially. Review movies and track your progress. 
        Add movies to watchlist to remind you of what to watch next." />
      </Helmet>
      {checkLogStatus()}
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Login" component={Login} />
          <Route path="/Films" component={Films} />
          <Route path="/People" component={People} />
          <Route path="/Ratings" component={Ratings} />
          <Route path="/WatchLater" component={WatchLater} />
          <Route path="/Reviews" component={Reviews} />
         { /*<Route path="/Trash" component={Trash} />*/}
          <Route path="/SpecificMovie/:movieIdfromParams" component={SpecificMovie} />
          <Route path="/SpecificTsRatings/:movieIdfromParams" component={SpecificTSRatings} />
          <Route path="/forgotpassword/:tokenFromParam" component={ChangePassWord} />
          <Route path="/Search" component={Search} />
          <Route path="/UserFile" component={UserFile} />
          <Route path="/myReviews" component={myReviews} />
          <Route path="/About" component={About} />
          <Route path="/PersonalInfo/:userIdfromParams" component={PersonalInfo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
