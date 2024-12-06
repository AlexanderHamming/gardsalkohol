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
          {region.name}
        </div>
      ))}
    </div>
  );
};

export default RegionsCarousel;
