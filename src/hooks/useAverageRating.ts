import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";
import { ProductRating } from "@/types/vendors";

const fetchAverageRating = async (
  vendorId: string,
  productId: string
): Promise<number> => {
  const reviewsRef = collection(
    db,
    "vendors",
    vendorId,
    "products",
    productId,
    "reviews"
  );
  const snapshot = await getDocs(reviewsRef);
  const ratings: number[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data() as ProductRating;
    ratings.push(data.rating);
  });

  if (ratings.length === 0) return 0;

  const sum = ratings.reduce((acc, curr) => acc + curr, 0);
  return parseFloat((sum / ratings.length).toFixed(1));
};

export const useAverageRating = (vendorId: string, productId: string) => {
  return useQuery<number, Error>({
    queryKey: ["averageRating", vendorId, productId],
    queryFn: () => fetchAverageRating(vendorId, productId),
    enabled: !!vendorId && !!productId,
  });
};
