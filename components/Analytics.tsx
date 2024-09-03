import { View } from "./Themed";
import type { FoodListing } from "@/types";
import { AnalyticsChart } from "./AnalyticsChart";

interface Props {
  items: FoodListing[];
}

export const Analytics = ({ items }: Props) => {
  return (
    <View>
      <AnalyticsChart items={items} />
    </View>
  );
};
