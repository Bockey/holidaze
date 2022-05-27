import React from "react";
import Carousel from "react-bootstrap/Carousel";

function CarouselSpec({ images }) {
  return (
    <Carousel>
      {images.map((image) => (
        <Carousel.Item key={image.id}>
          <img className="d-block w-100" src={image.src} alt="Slide item" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselSpec;
