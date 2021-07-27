import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import ImgSrc from "./../../shared/ImageSource";
import FeatureCard from "./../../components/FeatureCard/FeatureCard";

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
        <label className="home__explore--btn">
          <Link to="/feed">Explore The Feed</Link>
        </label>
        <figcaption className="home__image--container">
          <img src={ImgSrc.homeBanner} alt="banner" />
        </figcaption>
      </div>
      {/* <--Features Section--> */}
      <div className="home__features">
        <h1 className="home__features--head">FEATURES</h1>
        <div className="home__feat--card__container">
          <FeatureCard
            svg="rocket"
            head="Share Your Thoughts"
            para="Create post filled with your thoughts and post it online"
          />
          <FeatureCard
            svg="code"
            head="Code Snippets"
            para="Found a cool trick to solve any problem. Share code image with
              other people"
          />
          <FeatureCard
            svg="connect"
            head="Connect"
            para="See what others developers are working on and connect with them"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
