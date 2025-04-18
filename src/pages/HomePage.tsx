import { useState } from "react";
import RegionCarousel from "../components/RegionCarousel";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const Homepage = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(regionName);
    navigate(`/region/${regionName}`);
  };

  console.log(selectedRegion);
  return (
    <>
      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Hitta din nya favoritdryck från svenska gårdsförsäljningar!
          </h1>
          <p className="hero-description">
            Utforska unika lokala drycker från hela Sverige.
          </p>
        </div>
      </div>
      <Container className="py-3">
        <h2 className="carousel-title">Välj ett län för att börja utforska</h2>
        <div className="row justify-content-center">
          <RegionCarousel onClick={handleRegionClick} />
        </div>
      </Container>
    </>
  );
};

export default Homepage;
