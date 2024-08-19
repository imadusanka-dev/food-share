export interface FoodListing {
  id: number;
  title: string;
  category: string;
  quantity: string;
  special_notes: string;
  status: "AVAILABLE" | "CLAIMED";
  image: string;
  city: string | null;
  created_at: string; // You can use Date if you parse it into a Date object
  user_id: number | null;
  user_name: string | null;
}
