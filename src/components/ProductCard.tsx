import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Product } from "../types/vendors";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card style={{ width: "12rem" }} className="mb-4 ProductCard">
      {product.productImgUrl && (
        <Card.Img
          variant="top"
          src={product.productImgUrl}
          alt={product.name}
          className="ProductCardimg"
        />
      )}
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Pris: {product.price} kr</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ProductCard;
