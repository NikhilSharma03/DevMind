import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Home.css'

import FeatureCard from './../../components/FeatureCard/FeatureCard'

import ImgSrc from './../../shared/ImageSource'

const Home = () => {
  const token = useSelector((state) => state.user.token)

  return (
    <section className="home__main">
      <div className="home__head">
        <div className="home__heading">
          <h1>Share your ideas with developers all over the world</h1>
          <p>
            Connect with other developers and share your ideas and code snippets
            by posting on this app
          </p>
        </div>
        <label className="home__explore--btn">
          <Link to={token ? '/feed' : '/login'}>Explore The Feed</Link>
        </label>
        <figcaption className="home__image--container">
          <img src={ImgSrc.homeBanner} alt="banner" />
        </figcaption>
      </div>
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
  )
}

export default Home
