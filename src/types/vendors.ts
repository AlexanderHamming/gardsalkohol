export interface Product {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  description: string;
  productImgUrl: string;
}

export interface ProductRating {
  productId: string;
  rating: number;
  review: string;
}

export interface Geopoint {
  lat: number;
  lng: number;
}

export interface VendorFormValues extends Vendor {
  profileImageFile?: FileList;
  photosFiles?: FileList;
}

export interface Vendor {
  id: string;
  profileImageUrl?: string | null;
  name: string;
  description: string;
  categories: string[];
  address: string;
  phone: string;
  email: string;
  website?: string;
  open_times?: string;
  adressLocation: { lat: number; lng: number };
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  region: string;
  products: Product[];
}
