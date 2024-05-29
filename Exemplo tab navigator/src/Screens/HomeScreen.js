import { View, Text } from "react-native";
import React from "react";
import SwitchComponent from "../Components/Switch";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa",
      }}
    >
      <SwitchComponent />
      <Text>Treino</Text>
    </View>
  );
}
