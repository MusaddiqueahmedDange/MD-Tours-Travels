import React from "react";
import Slider from "react-slick";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";

const HeroSection = () => {
  const images = [hero1, hero2];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`slide-${index}`}
              className="w-full h-[80vh] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center"></div>{" "}
          </div>
        ))}
      </Slider>
      <div className="discover">
        {" "}
        <h1 className="text-4xl md:text-6xl font-bold">
          Discover Your Next Adventure
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Explore the world with our exclusive travel packages
        </p>
      </div>
      {/* <button>
        <a href="/international">Explore Destinations</a>
      </button> */}
    </div>
  );
};

export default HeroSection;
