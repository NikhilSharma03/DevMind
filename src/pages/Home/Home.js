import React from "react";
import "./Home.css";
import ImgSrc from "./../../shared/ImageSource";

const Home = () => {
  return (
    <section className="home__main">
      <div className="home__head">
        <div className="home__heading">
          <h1>
            Share your ideas and thoughts with developers all over the world
          </h1>
          <p>
            Connect with developers and post your thoughts and images by posting
            online on this site
          </p>
        </div>
        <figcaption className="home__image--container">
          <img src={ImgSrc.homeBanner} alt="banner" />
        </figcaption>
      </div>
    </section>
  );
};

export default Home;
