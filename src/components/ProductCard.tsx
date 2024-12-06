import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Product } from "../types/vendors"; // Justera sökvägen vid behov

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card style={{ width: "15rem" }} className="mb-4">
      {product.productImgUrl && (
        <Card.Img
          variant="top"
          src={product.productImgUrl}
          alt={product.name}
        />
      )}
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Pris: {product.price} kr</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ProductCard;
