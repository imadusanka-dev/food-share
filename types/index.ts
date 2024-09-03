export interface FoodListing {
  id: number;
  title: string;
  category: string;
  quantity: string;
  special_notes: string;
  status: "AVAILABLE" | "CLAIMED";
  image: string;
  city: string;
  created_at: string;
  user_id: number;
  user_name: string;
  phone: string;
}
