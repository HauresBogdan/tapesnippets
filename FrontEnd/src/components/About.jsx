import React from "react";
import Footer from "./Footer";


function About() {



    return (

        <>

        <div className="film-data">
            <br/>
            <h1>About this website</h1>
            <p>This web app has been made because of a passion for movies and a desire to gather a community of like-minded people.
            You can track your movies, review, rate, and discuss them. And I hope this is just the beginning.</p>
            
            <h1>Film Data</h1>
            <br/>
            
          <span>

          <p>The movies metadata of this website is provided by The Movie Database <a className="prevent-link-defaults" href="https://themoviedb.org">(TMDb)</a>.
          This product uses the TMDb API but is not endorsed or certified by <a className="prevent-link-defaults" href="https://themoviedb.org">TMDb</a>.</p>  
          <a className="prevent-link-defaults" href="https://themoviedb.org"><img className="tmdb-logo" src="./tmdb-2020.svg" alt="tmdb-logo"/></a>
          <br/>
          <br/>
          <h1>Future of this website</h1>
          <p>At the moment this website sits on a free tier of MongoDB Atlas service and a free Tier Heroku Hosting.
              Witch means low speed and response time. And also when the database space will be filled sadly the website will
               no longer work if I won't upgrade to a standard monthly subscription. If you would like to help,
                your generosity will be much appreciated.</p>

        <h1>First aid needed:</h1>
        <div className="display-flex">
        <img src="./firstaid.jpg" height="100px" alt="fist aid"/>
        
                <ul className="aid-bullets">
                <br/> 
                <li><a className="prevent-link-defaults" href="https://www.patreon.com/TapeSnippets">Patreon Link.</a> Your help would be much appreciated</li>
                <li><a className="prevent-link-defaults" href="https://www.paypal.com/paypalme/hauresb">Paypal Link.</a> Your help would be much appreciated</li>
                </ul>
                </div>
                 
          </span>
        </div>
        <br/>
        <br/>
        <br/>
<Footer />

        </>
    );

}

export default About;