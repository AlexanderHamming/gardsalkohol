import VendorDetails from "@/components/VendorDetails";
import useAuth from "../hooks/useAuth";
import { VendorFormValues, Product } from "../types/vendors";
import { useEffect, useMemo } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { addDoc } from "firebase/firestore";
import useUploadImage from "../hooks/useUploadImages";
import { getProductsCollection } from "@/services/firebase";
import useGetCollection from "@/hooks/useGetCollection";
import { SubmitHandler } from "react-hook-form";
import { ProductFormValues } from "../components/ProductForm";
import ProductForm from "../components/ProductForm";
import VendorNavbar from "../components/MyPageNavbar";
import { useState } from "react";
import EditVendorModal from "../components/EditVendorModal";
import { updateDocument } from "@/services/firebase";
import useStreamDocument from "@/hooks/useStreamDocument";

const MyPage = () => {
  const [showEditModal, setShowEditModal] = useState(false);

  const { uploadImage } = useUploadImage();
  const { currentUser } = useAuth();

  useEffect(() => {
    document.body.style.backgroundColor = "#FAF9F6";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  if (!currentUser) {
    return <LoadingSpinner />;
  }

  const userId = currentUser.uid;

  const {
    data: vendorData,
    loading: vendorLoading,
    error: vendorError,
  } = useStreamDocument<VendorFormValues>("vendors", userId || "");

  const productsCollectionRef = useMemo(
    () => getProductsCollection(userId),
    [userId]
  );
  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = useGetCollection<Product>(productsCollectionRef);

  const handleAddProduct: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      if (!userId) return;
      const imageFile = data.productImageFile[0];
      const imagePath = `vendors/${userId}/products/${imageFile.name}`;
      const productImgUrl = await uploadImage(imagePath, imageFile);

      const newProduct: Omit<Product, "id"> = {
        name: data.name,
        price: data.price,
        description: data.description,
        productImgUrl,
        vendorId: userId,
      };

      await addDoc(productsCollectionRef, newProduct);
    } catch (error) {
      console.error("Fel vid tillägg av produkt:", error);
    }
  };

  const handleUpdateVendor = async (updatedData: VendorFormValues) => {
    try {
      const { profileImageFile, ...rest } = updatedData;

      let updatedVendorData = { ...rest }; // Utgångsläget

      if (profileImageFile && profileImageFile.length > 0) {
        const file = profileImageFile[0];
        const downloadUrl = await uploadImage(`path/${file.name}`, file);
        updatedVendorData = { ...rest, profileImageUrl: downloadUrl };
      }

      await updateDocument("vendors", userId, updatedVendorData);
    } catch (error) {
      console.error("Fel vid uppdatering:", error);
    }
  };

  if (vendorLoading) {
    return <LoadingSpinner />;
  }

  if (products && products.length > 0) {
    if (productsLoading) {
      return <LoadingSpinner />;
    }
  }

  if (vendorError || productsError || !vendorData) {
    return <p>Det gick inte att hämta din data.</p>;
  }

  return (
    <>
      <VendorNavbar
        profileImageUrl={vendorData.profileImageUrl ?? ""}
        setShowEditModal={setShowEditModal}
      />
      <VendorDetails vendorData={vendorData} products={products || []}>
        {products && products.length > 1 ? (
          <h2 className="h2-addProduct">Lägg till fler produkter!</h2>
        ) : (
          <h2 className="h2-addProduct">Lägg till din första produkt!</h2>
        )}
        <ProductForm onSubmit={handleAddProduct} />
      </VendorDetails>
      <EditVendorModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        vendorData={vendorData}
        onSubmit={handleUpdateVendor}
      />
    </>
  );
};

export default MyPage;
