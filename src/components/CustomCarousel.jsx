import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const CustomCarousel = ({ images }) => {
  if (!images || images.length === 0) {
    return <p>No images available for the carousel.</p>;
  }

  return (
    <div className="max-w-screen-lg mx-auto overflow-hidden rounded-lg shadow-lg">
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        stopOnHover
        dynamicHeight
      >
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Slide ${index + 1}`} className="object-cover w-full h-auto" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
