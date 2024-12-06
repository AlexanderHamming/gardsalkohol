import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/services/firebase";
import { Vendor } from "@/types/vendors";

const fetchVendorsByRegion = async (region: string): Promise<Vendor[]> => {
  const q = query(collection(db, "vendors"), where("region", "==", region));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Vendor[];
};

export const useGetVendorsByRegion = (region: string) => {
  return useQuery<Vendor[], Error>({
    queryKey: ["vendors", region],
    queryFn: () => fetchVendorsByRegion(region),
    enabled: !!region,
  });
};
