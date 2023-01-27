/* eslint-disable no-undef */
import axios from "axios";
import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const SignupGoogle = () => {
  let navigate = useNavigate();

  const handleCallbackResponse = (response) => {
    console.log(response.credential);
    let user = jwt_decode(response.credential);
    console.log(user);
    axios({
      method: "post",
      url: "http://localhost:8000/api/google/signup",
      data: {
        googleId: user.sub,
        email: user.email,
        first_name: user.givenName,
        last_name: user.familyName,
      },
    })
      .then((res) => {
        localStorage.setItem("isAuthenticate", true);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      id="signinDiv"
      style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
    >
      <GoogleLogin
        onSuccess={handleCallbackResponse}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default SignupGoogle;
