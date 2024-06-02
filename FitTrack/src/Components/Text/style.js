import { Text } from "react-native";
import { styled } from "styled-components";
import Theme from "../../Styles/Theme";

export const TextMABold = styled(Text)`
  font-family: ${Theme.fonts.montserratAlternates.MontserratAlternates_700Bold};
  font-size: ${(props) => props.fontSize || "12px"};
  color: ${props => props.color || Theme.colors.grayScale.V9};
`;

export const TextQuickSandBold = styled(Text)`
  font-family: ${Theme.fonts.quicksand.Quicksand_700Bold};
  font-size: ${(props) => props.fontSize || "10px"};
  color: ${props => props.color || Theme.colors.secondaryScale.V5};
`;
