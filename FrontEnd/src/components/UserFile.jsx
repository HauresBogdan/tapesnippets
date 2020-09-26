import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AiOutlineFacebook,
  AiOutlineYoutube,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineBook,
} from "react-icons/ai";
import Footer from "./Footer";

function UserFile() {
  const [userBio, setUserBio] = useState({
    bio: "",
    facebook: "",
    youtube: "",
    website: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  });
  const [profile, setProfile] = useState("");
  //const dev_uri = "http://localhost:5000";
  const prod_uri = "https://tapesnippets.herokuapp.com";

  function handleChange(event) {
    const { name, value } = event.target;
    //console.log(event.target);
    setUserBio({
      ...userBio,
      [name]: value,
    });
  }

  function handleUpdateAll() {
    //axios call to backend to update with the new  userBio obj

    axios({
      method: "post",
      url: `${prod_uri}/profile`,
      data: {
        userBio: userBio,
      },
      headers: {
        authToken: localStorage.getItem("authToken"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //console.log("sup",res.data);
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios({
      method: "post",
      url: `${prod_uri}/profile`,
      headers: {
        authToken: localStorage.getItem("authToken"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //console.log("sup",res.data);
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  document.body.style = "background-color: white;";

  return (
    <>
      <div className="minheight">
        <div className="add-bio-and-bio-card">
          <div className="textarea-and-btn-and-links">
            <textarea
              className="bio-textarea"
              rows="7"
              placeholder="Add Bio..."
              onChange={handleChange}
              value={userBio.bio}
              name="bio"
            />
            <br />
            <br />
            <input
              type="text"
              className="bio-input"
              placeholder="Add link to your facebook..."
              onChange={handleChange}
              value={userBio.facebook}
              name="facebook"
            ></input>
            <input
              type="text"
              className="bio-input"
              placeholder="Add link to your youtube..."
              name="youtube"
              onChange={handleChange}
              value={userBio.youtube}
            ></input>
            <input
              type="text"
              className="bio-input"
              placeholder="Add link to your website..."
              name="website"
              onChange={handleChange}
              value={userBio.website}
            ></input>
            <input
              type="text"
              className="bio-input"
              placeholder="Add link to your twitter..."
              name="twitter"
              onChange={handleChange}
              value={userBio.twitter}
            ></input>
            <input
              type="text"
              className="bio-input"
              placeholder="Add link to your linkedin..."
              name="linkedin"
              onChange={handleChange}
              value={userBio.linkedin}
            ></input>
            <input
              type="text"
              className="bio-input"
              placeholder="Add link to your instagram..."
              name="instagram"
              onChange={handleChange}
              value={userBio.instagram}
            ></input>
            <br />
            <br />
            <button className="bio-textarea-btn" onClick={handleUpdateAll}>
              Update all!
            </button>
            <br/>
            <br/>
            <p>Your avatar is being pulled up from <a href="https://en.gravatar.com/">https://en.gravatar.com/</a> you can upload it there.</p>
          </div>

          <div className="bio-user-card">
            <div className="bio-img-area">
              {profile && (
                <img  className="bio-avatar "    data-toggle="tooltip" data-placement="top" title="Your avatar is being pulled up from https://en.gravatar.com you can upload it there"           src={profile.avatar} alt="avatar" />
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
      </div>

      <Footer />
    </>
  );
}

export default UserFile;
