import { useParams, useNavigate } from "react-router-dom";
import regions from "../data/regions.json";
import RegionCarousel from "../components/RegionCarousel";
import Googlemaps from "../components/Googlemaps";
import VendorsGrid from "@/components/VendorsGrid";
import { useGetVendorsByRegion } from "@/hooks/useGetVendorsbyRegion";
import { useState } from "react";
import { Container, Button } from "react-bootstrap";

const RegionsVendors = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"grid" | "map">("grid");

  const { regionName } = useParams<{ regionName: string }>();

  const selectedRegion = regions.find((region) => region.name === regionName);

  const changeRegionClick = (regionName: string) => {
    navigate(`/region/${regionName}`);
  };

  if (!selectedRegion) {
    return <p>Län hittades inte</p>;
  }

  const handleTabChange = (tab: "grid" | "map") => {
    setActiveTab(tab);
  };

  const { lat, lng } = selectedRegion;
  console.log(lat, lng);

  const {
    data: vendors,
    isLoading,
    isError,
  } = useGetVendorsByRegion(regionName || "");

  console.log(vendors);
  return (
    <Container className="py-3 VendorDetailsContainer">
      <RegionCarousel onClick={changeRegionClick} />

      <h1>Gårdsförsäljningar i {selectedRegion.name}</h1>

      <div className="tabs">
        <Button
          className={activeTab === "grid" ? "active" : ""}
          onClick={() => handleTabChange("grid")}
        >
          Gridvy
        </Button>
        <Button
          className={activeTab === "map" ? "active" : ""}
          onClick={() => handleTabChange("map")}
        >
          Kartvy
        </Button>
      </div>
      {isLoading && <p>Loading vendors...</p>}
      {isError && <p>Failed to load vendors</p>}
      {!isLoading && !isError && (
        <>
          {activeTab === "grid" && <VendorsGrid vendors={vendors || []} />}
          {activeTab === "map" && (
            <Googlemaps
              regionCoordinates={{ lat, lng }}
              vendors={vendors || []}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default RegionsVendors;
