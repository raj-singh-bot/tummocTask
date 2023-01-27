import React from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const SigninGoogle = () => {
  let navigate = useNavigate();

  const handleCallbackResponse = (response) => {
    console.log(response.credential);
    let user = jwt_decode(response.credential);
    console.log(user);
    axios({
      method: "post",
      url: "http://localhost:8000/api/google/signin",
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

export default SigninGoogle;
