import React, { Fragment } from "react";

import Hero from "../components/Hero";
import backgroundImage from "../assets/background-image.jpg";
import styles from "./Home.module.css";

const Home = () => (
  <Fragment>
    <div className={styles.background}>
      <img src={backgroundImage} alt="Background" className={styles.backgroundImage} />
    </div>
    <Hero />
  </Fragment>
);

export default Home;

