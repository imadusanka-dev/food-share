import React from "react";
import { Text, View } from "react-native";
import type { FoodListing } from "@/types";
import { PieChart } from "react-native-gifted-charts";

interface Props {
  items: FoodListing[];
}

export const AnalyticsChart = ({ items }: Props) => {
  const totalDonations = items.length;
  const pendingDonations = items.filter(
    (item) => item.status === "AVAILABLE",
  ).length;
  const donationsWithinLast7Days = items.filter((item) => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return new Date(item.created_at) > sevenDaysAgo;
  }).length;

  const riceCount = items.filter((item) => item.category === "Rice").length;
  const bakeryCount = items.filter((item) => item.category === "Bakery").length;
  const desertsCount = items.filter(
    (item) => item.category === "Deserts",
  ).length;
  const othersCount = items.filter((item) => item.category === "Others").length;

  const ricePercentage = (riceCount / totalDonations) * 100;
  const bakeryPercentage = (bakeryCount / totalDonations) * 100;
  const desertsPercentage = (desertsCount / totalDonations) * 100;
  const othersPercentage = (othersCount / totalDonations) * 100;

  const pieData = [
    {
      value: ricePercentage,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
    },
    {
      value: bakeryPercentage,
      color: "#93FCF8",
      gradientCenterColor: "#3BE9DE",
    },
    {
      value: desertsPercentage,
      color: "#BDB2FA",
      gradientCenterColor: "#8F80F3",
    },
    {
      value: othersPercentage,
      color: "#FFA5BA",
      gradientCenterColor: "#FF7F97",
    },
  ];

  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#006DFF")}
            <Text style={{ color: "white" }}>Rice: {ricePercentage}%</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#8F80F3")}
            <Text style={{ color: "white" }}>Bakery: {bakeryPercentage}%</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#3BE9DE")}
            <Text style={{ color: "white" }}>
              Deserts: {desertsPercentage}%
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#FF7F97")}
            <Text style={{ color: "white" }}>Others: {othersPercentage}%</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        margin: 20,
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#232B5D",
      }}
    >
      <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
        Donations By Category
      </Text>
      <View style={{ padding: 20, alignItems: "center" }}>
        <PieChart
          data={pieData}
          donut
          showGradient
          radius={90}
          innerRadius={60}
          innerCircleColor={"#232B5D"}
        />
      </View>
      {renderLegendComponent()}
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: "white" }}>
          Total Donations: {totalDonations}
        </Text>
        <Text style={{ color: "white" }}>
          Current Pending: {pendingDonations}
        </Text>
        <Text style={{ color: "white" }}>
          Donations within last 7 days: {donationsWithinLast7Days}
        </Text>
      </View>
    </View>
  );
};
