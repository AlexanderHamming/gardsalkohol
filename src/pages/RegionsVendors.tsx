import { useParams, useNavigate } from "react-router-dom";
import regions from "../data/regions.json";
import RegionCarousel from "../components/RegionCarousel";
import Googlemaps from "../components/Googlemaps";
import VendorsGrid from "@/components/VendorsGrid";
import { useGetVendorsByRegion } from "@/hooks/useGetVendorsbyRegion";
import { Container, Tab, Nav } from "react-bootstrap";
import LoadingSpinner from "@/components/LoadingSpinner";
import BackPicture from "../assets/imgs/back.png";

const RegionsVendors = () => {
  const navigate = useNavigate();

  const { regionName } = useParams<{ regionName: string }>();

  const selectedRegion = regions.find((region) => region.name === regionName);

  if (!selectedRegion) {
    return <p>Län hittades inte</p>;
  }

  const { lat, lng } = selectedRegion;

  const {
    data: vendors,
    isLoading,
    isError,
    error,
  } = useGetVendorsByRegion(regionName || "");

  return (
    <Container className="py-3 VendorDetailsContainer">
      <div className="HomepageButton">
        <img src={BackPicture} alt="Back button" />
        <h2 onClick={() => navigate("/")}>Startsida</h2>
      </div>

      <RegionCarousel
        onClick={(regionName) => navigate(`/region/${regionName}`)}
      />

      <h1 className="h1regionvendors">
        {vendors && vendors.length > 0
          ? `Gårdsförsäljningar i ${selectedRegion.name}`
          : `Inga registrerade gårdsförsäljningar i ${selectedRegion.name}`}
      </h1>
      <Tab.Container defaultActiveKey="grid">
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey="grid">Normal</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="map">Karta</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="mt-3">
          <Tab.Pane eventKey="grid">
            {isLoading && <LoadingSpinner />}
            {isError && (
              <p>
                {error?.message
                  ? `Kunde inte hämta: ${error.message}`
                  : "Ett oväntat fel inträffade. Försök igen senare."}
              </p>
            )}
            {!isLoading && !isError && <VendorsGrid vendors={vendors || []} />}
          </Tab.Pane>

          <Tab.Pane eventKey="map">
            {isLoading && <LoadingSpinner />}
            {isError && (
              <p>
                {error?.message
                  ? `Kunde inte hämta: ${error.message}`
                  : "Ett oväntat fel inträffade. Försök igen senare."}
              </p>
            )}
            {!isLoading && !isError && (
              <div className="googlemaps-container">
                <Googlemaps
                  regionCoordinates={{ lat, lng }}
                  vendors={vendors || []}
                />
              </div>
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default RegionsVendors;
