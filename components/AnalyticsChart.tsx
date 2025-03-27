import React from "react";
import { Text, View } from "react-native";
import type { ItemListing } from "@/types";
import { PieChart } from "react-native-gifted-charts";

interface Props {
  items: ItemListing[];
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

  const clothingCount = items.filter((item) => item.category === "Clothing").length;
  const electronicsCount = items.filter((item) => item.category === "Electronics").length;
  const homeEssentialsCount = items.filter(
    (item) => item.category === "Home Essentials",
  ).length;
  const stationeryCount = items.filter((item) => item.category === "Stationery").length;
  const sportsCount = items.filter((item) => item.category === "Sports").length;
  const miscellaneousCount = items.filter(
    (item) => item.category === "Miscellaneous",
  ).length;

  const clothingPercentage = (clothingCount / totalDonations) * 100;
  const electronicsPercentage = (electronicsCount / totalDonations) * 100;
  const homeEssentialsPercentage = (homeEssentialsCount / totalDonations) * 100;
  const stationeryPercentage = (stationeryCount / totalDonations) * 100;
  const sportsPercentage = (sportsCount / totalDonations) * 100;
  const miscellaneousPercentage = (miscellaneousCount / totalDonations) * 100;


  const pieData = [
    {
      value: clothingPercentage,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
    },
    {
      value: electronicsPercentage,
      color: "#93FCF8",
      gradientCenterColor: "#3BE9DE",
    },
    {
      value: homeEssentialsPercentage,
      color: "#BDB2FA",
      gradientCenterColor: "#8F80F3",
    },
    {
      value: stationeryPercentage,
      color: "#FFA5BA",
      gradientCenterColor: "#FF7F97",
    },
    {
      value: sportsPercentage,
      color: "#FFD6A5",
      gradientCenterColor: "#FFB800",
    },
    {
      value: miscellaneousPercentage,
      color: "#FF8C8C",
      gradientCenterColor: "#FF4D4D",
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
            <Text style={{ color: "white" }}>Clothing: {clothingPercentage}%</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#8F80F3")}
            <Text style={{ color: "white" }}>Electronics: {electronicsPercentage}%</Text>
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
              Home Essentials: {homeEssentialsPercentage}%
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#FF7F97")}
            <Text style={{ color: "white" }}>Stationery: {stationeryPercentage}%</Text>
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
            {renderDot("#FFB800")}
            <Text style={{ color: "white" }}>
              Sports: {sportsPercentage}%
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#FF4D4D")}
            <Text style={{ color: "white" }}>Miscellaneous: {miscellaneousPercentage}%</Text>
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
