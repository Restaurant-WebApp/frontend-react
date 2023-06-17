import React from "react";
import styles from "../views/Adminis.module.css";

import logo from "../assets/logo.svg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className={styles.success_title}>Restaurant Web App</h1>

    <p className={styles.success_message}>
      This Restaurant app is built using ReactJS. Functionalities: Authentication and authorization with Auth0.
    </p>
  </div>
);

export default Hero;
