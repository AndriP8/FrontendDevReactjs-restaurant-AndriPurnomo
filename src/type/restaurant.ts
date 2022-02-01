interface Review {
  id: string;
  images: string[];
  name: string;
  rating: number;
  text: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface RestaurantItem {
  id: string;
  category: Category;
  images: string[];
  name: string;
  open: boolean;
  price: number;
  rating: number;
  reviews: Review[];
}
