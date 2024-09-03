import { supabase } from "../../supabase";
import type { FoodListing } from "../../types";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { ItemForm, DataLoading } from "../../components";

const Edit = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<FoodListing | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await supabase
        .from("food_listings")
        .select("*")
        .eq("id", id)
        .single();

      setItem(data);
      setLoading(false);
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return <DataLoading />;
  }

  return <ItemForm item={item} />;
};

export default Edit;
