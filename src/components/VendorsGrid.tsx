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
              onClick={() => handleCardClick(vendor.id)}
              style={{ cursor: "pointer" }}
            >
              <Card.Img
                variant="top"
                src={vendor.profileImageUrl || "/placeholder-image.jpg"}
                alt={vendor.name}
              />
              <Card.Body>
                <Card.Title>{vendor.name}</Card.Title>

            <Button>Se sortiment</Button>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Region: {vendor.region}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VendorsGrid;
