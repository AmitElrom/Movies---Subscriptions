import React, { useState, useContext } from "react";
import useAxios from "../../hooks/use-axios";

import AppContext from "../../context/AppContext"

export const Login = () => {
  const { login } = useContext(AppContext);
  const[user, setUser] = useState(null)
  const[password, setPassword] = useState(null)
  
  const {
    isLoadingg,
    fetchErrorr,
    sendRequest: sendLoginRequest,
  } = useAxios();

  const loginHandler = async () => {
    await sendLoginRequest(
      {
        baseUrl:"http://localhost:4000",
        url: `login`,
        method:"POST",
        data:{username:user,password}
      },
      (data) => {
        if(data){
          login(data.wantedUser,data.accessToken)
        }
      }
    );
  };

  return (
    <div>
        <h2>Login Page</h2>
        <input type="text" placeholder='enter username' name="username" onChange={(e) => setUser(e.target.value)}/> <br />
        <input type="password" placeholder='enter password' name="password" onChange={(e) => setPassword(e.target.value)} /> <br />
        <input type="button" value="Login" onClick={loginHandler} />
    </div>
  )
}
