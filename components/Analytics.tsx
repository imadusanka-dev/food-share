import { View } from "./Themed";
import type { ItemListing } from "@/types";
import { AnalyticsChart } from "./AnalyticsChart";

interface Props {
  items: ItemListing[];
}

export const Analytics = ({ items }: Props) => {
  return (
    <View>
      <AnalyticsChart items={items} />
    </View>
  );
};
