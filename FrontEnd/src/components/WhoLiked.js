import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENV_URL } from "./constants";

function WhoLiked(props) {
  const [usersWhoLiked, setUsersWhoLiked] = useState([]);

  const prod_uri = ENV_URL.HEROKU;

  useEffect(() => {
    axios({
      method: "post",
      url: `${prod_uri}/finduserswholikedme`,
      data: {
        usersIds: props.whoLiked,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setUsersWhoLiked(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.whoLiked]);

  return (
    <div>
      <div className="like-pannel">
        <br />
        Likes:
        {usersWhoLiked.map((item) => (
          <span className="like-li" key={item._id}>
            {item.name} <img height="20px" src={item.avatar} alt="avatar" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default WhoLiked;
