import React from "react";
import axios from "axios";
import { useParams} from "react-router";
import { useState } from "react";
import { ENV_URL } from "./constants";



function ChangePassWord() {

const { tokenFromParam } = useParams();
const [newPassword1, setNewPassword1] = useState("");
const [newPassword2, setNewPassword2] = useState("");
const [msg,setMsg] = useState("");



function handleSubmitNewPassword() {

    if(newPassword1===newPassword2){
        //passwords match and send to backend

        axios({
        method: "post",
        url: `${ENV_URL.LOCALHOST}/registernewpassword`,
        data: {
            newPassword : newPassword2,
            tokenWithEmailSigned : tokenFromParam
        }
    }).then(res => {
        
        if(res.status===200) {
            setMsg("Passwords was changed successfully!");
        } else if (res.status===201) {            
            setMsg(res.data);
        }
        
    }).catch(err => {
        console.log(err);
        setMsg("Error! Try again later!");
    }
    );
    } else if(newPassword1!==newPassword2) {
        //password don't match and print msg with warning
        setMsg("Passwords don't match!");

    }
    
}

function handleInputChange(event) {

    const {name, value} = event.target 
    
    if(name==='password1')
    {
        setNewPassword1(value);
    } else if(name==='password2') {
        setNewPassword2(value);
    }
    
   


}

document.body.style.background = "white";
  return (
    <>
      <div className="change-password">
          Choose your new password:<br/><br/>

          {msg!=="" && <div className="new-pass-msg">{msg}</div>}

          <input type="password" className="form-control" onChange={handleInputChange} name="password1" value={newPassword1} placeholder="New Password"/><br/>
          <input type="password" className="form-control" onChange={handleInputChange} name="password2" value={newPassword2} placeholder="Confirm Password"/><br/>
          <button type="submit" onClick={handleSubmitNewPassword} className="btn btn-primary">Submit</button>
          

      </div>
      
    </>
  );
}

export default ChangePassWord;
