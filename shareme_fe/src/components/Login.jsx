import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { client } from "../client";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (res) => {
    const decoded = jwt_decode(res.credential);
    const { name, picture, sub, email } = decoded;

    localStorage.setItem("user", JSON.stringify(decoded));

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
      email,
    };

    client.createIfNotExists(doc).then(() => navigate("/", { replace: true }));
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="Logo" width="130px" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin onSuccess={responseGoogle} onError={responseGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
