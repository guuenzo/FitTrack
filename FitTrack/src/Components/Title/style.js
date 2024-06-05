import { Text } from "react-native";
import { styled } from "styled-components";
import Theme from "../../Styles/Theme";

export const TitleStyle = styled(Text)`
  font-family: ${Theme.fonts.montserratAlternates.MontserratAlternates_700Bold};
  color: ${Theme.colors.secondaryScale.V1};
  font-size: 22px;
  margin: ${(props) => props.fieldMargin || "25px 0 0 0"};
  text-align: ${(props) => props.textAling || "start"};
`;
