import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import VendorNavbar from "./VendorNavbar";
import { VendorFormValues } from "@/types/vendors";
import { Product } from "../types/vendors";
import ProductCard from "./ProductCard";

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

      <div className="VendorMainInfo">
        <h1>{vendorData.name}</h1>
        <p>{vendorData.open_times}</p>
        <p>{vendorData.description}</p>
      </div>
      <p>{vendorData.address}</p>
      <p>{vendorData.phone}</p>
      <p>{vendorData.categories.join(", ")}</p>
      <p>{vendorData.email}</p>
      <p>{vendorData.tiktok}</p>
      <p>{vendorData.facebook}</p>
      <p>{vendorData.instagram}</p>
      <p>{vendorData.website}</p>

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
  );
};

export default VendorDetails;
