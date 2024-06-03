import { View, Text } from "react-native";
import React from "react";
import { TitleStyle } from "./style";

const Title = ({ text = "text", fieldMargin }) => {
  return <TitleStyle fieldMargin={fieldMargin}>{text}</TitleStyle>;
};

export default Title;
