import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import VendorNavbar from "./VendorNavbar";
import { VendorFormValues } from "@/types/vendors";
import { Product } from "../types/vendors";
import ProductCard from "./ProductCard";
import logopic from "../assets/imgs/logo.png";
import VendorFooter from "./VendorFooter";

interface VendorDetailsProps {
  vendorData: VendorFormValues;
  isOwner: boolean;
  products: Product[];
}

const VendorDetails: React.FC<VendorDetailsProps> = ({
  vendorData,
  isOwner,
  products,
}) => {
  return (
    <>
      <Container className="py-3 VendorDetailsContainer">
        {isOwner && (
          <>
            <VendorNavbar
              profileImageUrl={
                vendorData.profileImageUrl ?? "/path/to/default/image.png"
              }
            />
            <Button>Redigera</Button>
          </>
        )}
        <img src={logopic} alt="Logo" width={250} height={70} />
        <div className="VendorMainInfo">
          <h1>{vendorData.name}</h1>
          <p>{vendorData.description}</p>
        </div>

        {products && products.length > 0 && (
          <>
            <h2>Produkter</h2>
            <Row xs={1} sm={2} md={3} className="g-4">
              {products.map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>

      <VendorFooter
        opentimes={vendorData.open_times}
        Email={vendorData.email}
        phonenumber={vendorData.phone}
        adress={vendorData.address}
        facebooklink={vendorData.facebook}
        instagramlink={vendorData.instagram}
        tiktoklink={vendorData.tiktok}
        websitelink={vendorData.website}
      />
    </>
  );
};

export default VendorDetails;
