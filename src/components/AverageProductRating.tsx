interface AverageProductRatingProps {
  rating: number;
}

const AverageProductRating: React.FC<AverageProductRatingProps> = ({
  rating,
}) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  const stars = [];

  for (let i = 1; i <= fullStars; i++) {
    stars.push(
      <span key={`full-${i}`} className="star full">
        ★
      </span>
    );
  }

  for (let i = 1; i <= emptyStars; i++) {
    stars.push(
      <span key={`empty-${i}`} className="star empty">
        ☆
      </span>
    );
  }

  return (
    <div className="average-rating">
      {stars}
      <span> ({rating})</span>
    </div>
  );
};

export default AverageProductRating;
