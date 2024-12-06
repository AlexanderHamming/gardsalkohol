import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import RegionCarousel from "../components/RegionCarousel";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(regionName);
    navigate(`/region/${regionName}`);
  };

  return (
    <>
      <NavigationBar />

      <div className="header">
        <RegionCarousel onClick={handleRegionClick} />

        <div className="backgroundH1">
          <h1 className="h1homepage">
            Hitta din nya favoritdryck från svenska gårdsförsäljningar!
          </h1>
        </div>

        <div className="container pictureHomepageContainer">
          <div className="pictureHomepage"></div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
