import { Image } from "react-native";
import { styled } from "styled-components";

export const ImageLogoStyle = styled(Image)`
  width: 190px;
  height: 90px;
  margin: ${(props) => props.fieldMargin || "0px"};
`;
