import React, {useEffect, useState} from 'react';
import axios from "axios";
//import { Redirect } from "react-router-dom";
//import {useSelector} from 'react-redux';

function  WhoLiked(props) {
    //const isLogged = useSelector(state => state.isLogged);

    const [usersWhoLiked,setUsersWhoLiked] = useState([]);

    //const dev_uri = "http://localhost:5000";
    const prod_uri = "https://tapesnippets.herokuapp.com";

    useEffect(() => {
        
    //console.log("is array?", props.whoLiked);
          //const token = localStorage.getItem("authToken");
   
          axios({
            method: "post",
            url: `${prod_uri}/finduserswholikedme`,
            data: {
                usersIds: props.whoLiked,
            },
            headers: {
              //authToken: token,
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              //console.log(" userswholiked", res.data);
              setUsersWhoLiked(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
    
         
      }, [props.whoLiked]);


    return (
        <div>
        {/*!isLogged ? <Redirect to='/Login' /> : null*/}
            <div className="like-pannel"><br/>Likes:
            
            {usersWhoLiked.map(item => 
            <span className="like-li" key={item._id}> {item.name} {" "} <img height="20px" src={item.avatar} alt="avatar"/></span>
                
                )}
               
            </div>
        </div>
    );

}

export default WhoLiked;