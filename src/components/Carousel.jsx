import React from "react";
import { UncontrolledCarousel } from "reactstrap";
import c1 from "../images/Carousel1.png";
import c2 from "../images/Carousel2.png";
import c3 from "../images/Carousel3.png";

const items = [
  {
    src: c1,
    altText: "Slide 1",
  },
  {
    src: c2,
    altText: "Slide 2",
  },
  {
    src: c3,
    altText: "Slide 3",
  },
];

const Carousel = () => (
  <div className="container mt-5">
    <UncontrolledCarousel items={items} />
  </div>
);
export default Carousel;
