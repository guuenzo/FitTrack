import { Text } from "react-native";
import { styled } from "styled-components";
import Theme from "../../Styles/Theme";

export const TextMABold = styled(Text)`
  font-family: ${Theme.fonts.montserratAlternates.MontserratAlternates_700Bold};
  font-size: 12px;
  color: ${Theme.colors.grayScale.V9};
`;
