import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
//import UserCard from "./UserCard";
import { useSelector } from "react-redux";
import MyPagination from "./Pagination";
import {
  AiOutlineFacebook,
  AiOutlineYoutube,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineBook,
} from "react-icons/ai";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

function People() {
  //const [allPeople, setAllPeople] = useState([]);
  const [response, setResponse] = useState([]);
  const page = useSelector((state) => state.pageStateFromRedux);

  //const dev_uri = "http://localhost:5000";
  const prod_uri = "https://tapesnippets.herokuapp.com";

  useEffect(() => {
    axios({
      method: "post",
      url: `${prod_uri}/allpeople`,
      data: {
        pagina: page.activePage,
      },
      headers: {
        //authToken: localStorage.getItem("authToken"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //(res.data);
        //setAllPeople(res.data);
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page.activePage]);

  /*function chunkArray(myArray, chunk_size) {
    var index = 0;
    //var page = 1;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      const myChunk = myArray.slice(index, index + chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  }
  // Split in group of 20 items per page
  const peopleObjSplitedByPages = chunkArray(allPeople, 10);
  console.log(peopleObjSplitedByPages);*/

  document.body.style.backgroundColor = "white";

  return (
    <div className="people">
      <Helmet>
        <title>TapeSnippets - Discover new like minded individuals</title>
        <meta name="description" content="Find new people who like movies and like to discuss them" />
      </Helmet>
      <br/>
      <h2 className="text-align-center rm">Check our latest members</h2>

      <div className="minheight3">
        <div className="people-parent">
          {response.pageUsers &&
            response.pageUsers.map((profile) => (
              <div key={profile._id} className="people-child">
                {/*<UserCard                
                src={user.avatar}
                name={user.name}
                date={user.date}
                bio={user.profile.bio}
              />*/}
                <div className="bio-user-card2">
                  <div className="bio-img-area">
                    {profile && (
                      <img
                        className="bio-avatar"
                        src={profile.avatar}
                        alt="avatar"
                      />
                    )}
                  </div>
                  <div className="bio-bio-area">
                    <span className="actual-bio">
                      <h5>{profile && profile.name}</h5>
                      {profile && profile.profile.bio}
                    </span>
                  </div>
                  <div className="bio-social-media-links ">
                    <a href={profile && profile.profile.facebook}>
                      <AiOutlineFacebook size="2em" />
                    </a>
                    <a href={profile && profile.profile.youtube}>
                      <AiOutlineYoutube size="2em" />
                    </a>
                    <a href={profile && profile.profile.instagram}>
                      <AiOutlineInstagram size="2em" />
                    </a>
                    <a href={profile && profile.profile.twitter}>
                      <AiOutlineTwitter size="2em" />
                    </a>
                    <a href={profile && profile.profile.linkedin}>
                      <AiOutlineLinkedin size="2em" />
                    </a>
                    <a href={profile && profile.profile.website}>
                      <AiOutlineBook size="2em" />
                    </a>
                  </div>
                  <div className="bio-footer-area ">
                    Memeber since: {profile && profile.date.slice(0, 10)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="people-pag">
        <span className="centered-pagination">
          {/*3 is items per page*/}
          <MyPagination totalItemsCount={Math.ceil(response.allUsers / 3)} />
        </span>
      </div>

      <Footer/ >
    </div>
  );
}

export default People;
