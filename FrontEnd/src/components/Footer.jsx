import React from "react"
import {Link} from 'react-router-dom';

function Footer() {

const date = new Date();
const year = date.getFullYear();

    return (

        <>

<footer className="footer-specific">
          <span className="text-align-center">
            <div>Copyright @ {year} Haures Mihai Bogdan</div>
            <div>Movie data from the movie database <a className="prevent-link-defaults" href="https://themoviedb.org">(TMDb)</a>.</div>
            <Link  className="prevent-link-defaults" to="/About">About?</Link>
          </span>
        </footer>


        </>
    );

}

export default Footer;