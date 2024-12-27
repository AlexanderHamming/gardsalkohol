import {
  CollectionReference,
  onSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetCollection = <T>(
  colRef: CollectionReference<T>,
  queryConstraints: QueryConstraint[] = [],
  isLoggedOut: boolean = false
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedOut) return;
    setLoading(true);
    setError(null);

    const q = query(colRef, ...queryConstraints);
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(docs);

        setLoading(false);
      },
      (err) => {
        console.error("Error fetching collection:", err);
        setError("Failed to fetch data.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [colRef, ...queryConstraints]);

  return { data, loading, error };
};

export default useGetCollection;
