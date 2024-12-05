import VendorForm from "@/components/VendorForm";
import { auth, vendorsCollection } from "@/services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { VendorFormValues, Vendor } from "@/types/vendors";
import useGeocode from "../hooks/useGeoCoding";
import useUploadImage from "@/hooks/useUploadImages";
import { useNavigate } from "react-router-dom";

const VendorCreationPage = () => {
  const { geocodeAddress } = useGeocode();
  const { uploadImage } = useUploadImage();
  const navigate = useNavigate();

  const handleCreateVendor = async (vendorData: VendorFormValues) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("user not logged in");
      return;
    }

    try {
      const { lat, lng, region } = await geocodeAddress(vendorData.address);

      const profileImageUrl = vendorData.profileImageFile
        ? await uploadImage(
            `vendors/${userId}/profile.jpg`,
            vendorData.profileImageFile[0]
          )
        : null;

      const { profileImageFile, photosFiles, ...cleanVendorData } = vendorData;

      const vendorWithId: Vendor = {
        ...cleanVendorData,
        id: userId,
        adressLocation: { lat, lng },
        region,
        profileImageUrl,
      };

      await setDoc(doc(vendorsCollection, userId), vendorWithId);
      console.log("vendor created");
      navigate("/mypage");
    } catch (error) {
      console.error("error creating vendor:", error);
    }
  };

  return <VendorForm onSubmit={handleCreateVendor} title="Skapa din profil" />;
};

export default VendorCreationPage;
