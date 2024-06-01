import { View, Text } from "react-native";
import React from "react";
import { ImageLogoStyle, ImageProfileUserStyle } from "./style";

export const ImageProfileUser = ({ uriImageProfile, isHeader = true }) => {
  return (
    <ImageProfileUserStyle
      isHeader={isHeader}
      source={{ uri: uriImageProfile }}
    />
  );
};

const ImageLogo = ({ fieldMargin = "0 0 20px 0" }) => (
  <ImageLogoStyle
    fieldMargin={fieldMargin}
    source={require("../../Assets/Images/LogoFitTrack.png")}
  />
);

export default ImageLogo;
