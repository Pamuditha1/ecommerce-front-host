import React from "react";
import { UncontrolledCarousel } from "reactstrap";
import c1 from "../images/Carousel1.png";
import c2 from "../images/Carousel2.png";
import c3 from "../images/Carousel3.png";

const items = [
  {
    src: c1,
    altText: "Slide 1",
    // caption: 'Slide 1',
    // header: 'Slide 1 Header',
    // key: '1'
  },
  {
    src: c2,
    altText: "Slide 2",
    // caption: 'Slide 2',
    // header: 'Slide 2 Header',
    // key: '2'
  },
  {
    src: c3,
    altText: "Slide 3",
    // caption: 'Slide 3',
    // header: 'Slide 3 Header',
    // key: '3'
  },
];

const coStyle = {
  boxShadow: "0px 10px 10px black",
  borderRadius: "30px",
};

const Carousel = () => (
  <div className="container mt-5">
    <UncontrolledCarousel items={items} />
  </div>
);
export default Carousel;
