import { useParams } from "react-router-dom";
import VendorDetails from "../components/VendorDetails";
import useGetDocument from "../hooks/useGetDocument";
import { VendorFormValues } from "../types/vendors";
import { useEffect, useMemo } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import useGetCollection from "../hooks/useGetCollection";
import { getProductsCollection } from "../services/firebase";
import { Product } from "../types/vendors";

const VendorPage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#FAF9F6";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const { id } = useParams<{ id: string }>();
  const {
    data: vendorData,
    loading: vendorLoading,
    error: vendorError,
  } = useGetDocument<VendorFormValues>("vendors", id || "");

  const productsCollectionRef = useMemo(
    () => getProductsCollection(id || ""),
    [id]
  );

  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = useGetCollection<Product>(productsCollectionRef);



  if (vendorLoading) {
    return <LoadingSpinner />;
  }

  if (products && products.length > 0) {
    if (productsLoading) {
      return <LoadingSpinner />;
    }
  }

  if (vendorError || productsError || !vendorData) {
    return <p>Det gick inte att hämta datan.</p>;
  }

  return (
    <div>
      <VendorDetails
        vendorData={vendorData}
        products={products || []}
        isOwner={false}
      />
    </div>
  );
};

export default VendorPage;
