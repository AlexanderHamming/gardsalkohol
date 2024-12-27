import React from "react";
import regions from "../data/regions.json";

interface RegionsCarouselProps {
  onClick: (regionName: string) => void;
}
const RegionsCarousel: React.FC<RegionsCarouselProps> = ({ onClick }) => {
  return (
    <div className="regions-carousel">
      {regions.map((region, index) => (
        <div
          className="region"
          key={index}
          onClick={() => onClick(region.name)}
        >
          <div className="region-container">
            <div>
              <img
                className="region-image"
                src={region.image}
                alt={region.name}
              />
            </div>
            <div className="region-name">
              <h2>{region.name}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegionsCarousel;
