import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Product } from "../types/vendors";
import { useNavigate } from "react-router-dom";
import { useAverageRating } from "@/hooks/useAverageRating";
import AverageProductRating from "./AverageProductRating";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/vendor/${product.vendorId}/product/${product.id}`);
  };

  const {
    data: averageRating,
    isLoading,
    isError,
  } = useAverageRating(product.vendorId, product.id);

  return (
    <Card
      style={{ width: "12rem" }}
      className="mb-4 ProductCard"
      onClick={handleClick}
    >
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
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Inga betyg tillgängliga</p>
        ) : (
          <AverageProductRating rating={averageRating || 0} />
        )}
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Pris: {product.price} kr</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ProductCard;
