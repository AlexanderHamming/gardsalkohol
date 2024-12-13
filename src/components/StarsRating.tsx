const StarsRating = ({
  rating,
  onRatingSelect,
}: {
  rating: number;
  onRatingSelect: (value: number) => void;
}) => {
  const ratingArray = [1, 2, 3, 4, 5];

  return (
    <div>
      {ratingArray.map((starValue) => (
        <span
          key={starValue}
          className="star"
          onClick={() => onRatingSelect(starValue)}
        >
          {starValue <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default StarsRating;
