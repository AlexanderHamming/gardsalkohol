import { useParams } from "react-router-dom";
import useGetDocument from "@/hooks/useGetDocument";
import { Product } from "@/types/vendors";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Container } from "react-bootstrap";
import ReviewForm from "../components/ReviewForm";
import { db } from "@/services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAverageRating } from "@/hooks/useAverageRating";
import AverageProductRating from "../components/AverageProductRating";

const ProductPage = () => {
  const { vendorId, productId } = useParams<{
    vendorId: string;
    productId: string;
  }>();

  const {
    data: averageRating,
    isLoading: ratingLoading,
    isError: ratingError,
  } = useAverageRating(vendorId || "", productId || "");

  const {
    data: product,
    loading: productLoading,
    error: productError,
  } = useGetDocument<Product>(`vendors/${vendorId}/products`, productId || "");

  if (productLoading) return <LoadingSpinner />;
  if (productError || !product) return <p>Det gick inte att hämta produkten</p>;

  const handleSubmit = async (rating: number, review: string) => {
    if (!vendorId || !productId) return;

    try {
      const reviewsRef = collection(
        db,
        "vendors",
        vendorId,
        "products",
        productId,
        "reviews"
      );
      await addDoc(reviewsRef, {
        rating: rating,
        review: review,
      });
      console.log("Review added");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <Container className="py-3">
      <div className="productContainer">
        <div className="imgContainer">
          <img src={product.productImgUrl} alt={product.name} />
        </div>
        <div className="info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>{product.price} Kr</p>
          {ratingLoading ? (
            <p>Loading...</p>
          ) : ratingError ? (
            <p>Inga betyg tillgängliga</p>
          ) : (
            <AverageProductRating rating={averageRating || 0} />
          )}
        </div>

        <div className="reviewField">
          <h4>Har du testat {product.name}?</h4>
          <h5>Lämna din recension här</h5>
          <ReviewForm onSubmit={handleSubmit} />
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;
