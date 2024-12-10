import React from "react";
import { Vendor } from "@/types/vendors";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Container, Button } from "react-bootstrap";

interface VendorsGridProps {
  vendors: Vendor[];
}

const VendorsGrid: React.FC<VendorsGridProps> = ({ vendors }) => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/vendor/${id}`);
  };
  return (
    <Container className="my-4">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {vendors.map((vendor) => (
          <Col key={vendor.id}>
            <Card
              className="VendorCard"
              onClick={() => handleCardClick(vendor.id)}
              style={{ cursor: "pointer" }}
            >
              <Card.Img
                className="VendorCardimg"
                variant="top"
                src={vendor.profileImageUrl || "/placeholder-image.jpg"}
                alt={vendor.name}
              />
              <Card.Body>
                <Card.Title className="Nameh1">{vendor.name}</Card.Title>

                <Card.Text>
                  {vendor.categories.length > 1
                    ? `Kategorier: ${vendor.categories.join(", ")}`
                    : `Kategori: ${vendor.categories[0]}`}
                </Card.Text>
                <Button>Se sortiment</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VendorsGrid;
