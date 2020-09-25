import React, {useEffect} from "react";
import Navbar from "./components/Navbar2";
import Home from "./components/Home";
import Login from "./components/Login";
import Films from "./components/Films";
import People from "./components/People";
import Ratings from "./components/Ratings";
import WatchLater from "./components/WatchLater";
import Reviews from "./components/Reviews";
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




function App() {

  useEffect(() => {
    document.title = "TapeSnippets"
 }, []);
  
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
          <Route path="/SpecificMovie" component={SpecificMovie} />
          <Route path="/SpecificTsRatings" component={SpecificTSRatings} />
          <Route path="/Search" component={Search} />
          <Route path="/UserFile" component={UserFile} />
          <Route path="/About" component={About} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
