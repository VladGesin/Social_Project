import React, { useState, useEffect } from "react";
import { Carousel, CarouselItem, CarouselControl } from "reactstrap";
import "./Slider.css";
import axios from "axios";

import api from "../../../../../api";

const Slider = () => {
   const [photos, setPhotos] = useState([]);
   const [goPhotos, setGoPhotos] = useState([]);
   const apiLink = "https://www.hitprojectscenter.com/social-API/";
   const [activeIndex, setActiveIndex] = useState(0);
   const [animating, setAnimating] = useState(false);

   useEffect(() => {
      getPhotos();
   }, []);

   const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
   };

   const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
   };

   const getPhotos = async () => {
      const res = await axios.get(
         "https://www.hitprojectscenter.com/social-API/getImagesByStatus/true"
      );
      console.log(res.data);
      setPhotos(res.data);
      // api.get("getAllImages").then((res) => {
      //    setPhotos(res.data);
      // });
   };

   const slides = photos.map((photo) => {
      return (
         <CarouselItem key={photo.path}>
            <img
               className="d-block w-100"
               src={`${apiLink}${photo.path}`}
               alt={photo.path}
            />
         </CarouselItem>
      );
   });

   return (
      <Carousel
         activeIndex={activeIndex}
         next={next}
         previous={previous}
         className="mb-2 mt-1"
         style={{ maxWidth: "10rem" }}
      >
         {slides}
         <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
         />
         <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
         />
      </Carousel>
   );
};

export default Slider;
