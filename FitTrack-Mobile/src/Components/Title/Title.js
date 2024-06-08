import { View, Text } from "react-native";
import React from "react";
import { TitleStyle } from "./style";

const Title = ({ text = "text", fieldMargin, textAling }) => {
  return (
    <TitleStyle textAling={textAling} fieldMargin={fieldMargin}>
      {text}
    </TitleStyle>
  );
};

export default Title;
