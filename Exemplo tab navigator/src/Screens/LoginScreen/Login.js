import { View, Text } from "react-native";
import React from "react";
import ButtonComponent from "../../Components/Button";
import SwitchLoginToCreateAccountButton from "../../Components/SwitchLoginToCreateAccountButton";

export default function Login() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1E91DB",
      }}
    >
      
      <Text style={{ color: "#fff" }}>Login</Text>
    </View>
  );
}
