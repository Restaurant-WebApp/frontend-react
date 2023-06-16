import React from "react";

import logo from "../assets/logo.svg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">Restaurant Web App</h1>

    <p className="lead">
      This Restaurant app is built using ReactJS. Functionalities: Authentication and authorization with Auth0.
    </p>
  </div>
);

export default Hero;
