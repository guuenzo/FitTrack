import { View, Text } from "react-native";
import React from "react";
import { ImageLogoStyle } from "./style";

const ImageLogo = ({ fieldMargin = "0 0 20px 0" }) => (
  <ImageLogoStyle
    fieldMargin={fieldMargin}
    source={require("../../Assets/Images/LogoFitTrack.png")}
  />
);

export default ImageLogo;
