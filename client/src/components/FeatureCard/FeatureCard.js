import React from "react";
import "./FeatureCard.css";
import SvgSrc from "../../shared/SvgSrc";

function FeatureCard(props) {
  let SvgItem;
  switch (props.svg) {
    case "connect":
      SvgItem = SvgSrc.Connect;
      break;
    case "code":
      SvgItem = SvgSrc.Code;
      break;
    case "rocket":
      SvgItem = SvgSrc.Rocket;
      break;
  }

  return (
    <div className="home__feat--card">
      <figcaption>
        <SvgItem />
      </figcaption>
      <h1>{props.head}</h1>
      <p>{props.para}</p>
    </div>
  );
}

export default FeatureCard;
