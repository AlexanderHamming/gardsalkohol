import { storage } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useUploadImage = () => {
  const uploadImage = async (path: string, file: File): Promise<string> => {
    const imageRef = ref(storage, path);
    const snapshot = await uploadBytes(imageRef, file);
    return getDownloadURL(snapshot.ref);
  };

  return { uploadImage };
};

export default useUploadImage;
