import { useState } from "react";
import StarsRating from "./StarsRating";
import { Button } from "react-bootstrap";

const ReviewForm = ({
  onSubmit,
}: {
  onSubmit: (rating: number, review: string) => void;
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      console.error("Du måste välja ge ett betyg");
      return;
    }
    onSubmit(rating, review);
    setRating(0);
    setReview("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <StarsRating rating={rating} onRatingSelect={setRating} />
      <textarea
        className="TextArea"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Skriv din recension här..."
      />
      <Button type="submit">Skicka</Button>
    </form>
  );
};

export default ReviewForm;
