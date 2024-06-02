import { View, Text } from "react-native";
import React from "react";
import { TitleStyle } from "./style";

const Title = ({ text = "text" }) => {
  return <TitleStyle>{text}</TitleStyle>;
};

export default Title;
