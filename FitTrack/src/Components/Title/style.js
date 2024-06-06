import { Text } from "react-native";
import { styled } from "styled-components";
import Theme from "../../Styles/Theme";

export const TitleStyle = styled(Text)`
  font-family: ${Theme.fonts.montserratAlternates.MontserratAlternates_700Bold};
  color: ${Theme.colors.secondaryScale.V1};
  font-size: 22px;
  margin: 25px 0 0 0;
`;

export const TitleLogins = styled(TitleStyle)`
  color: ${Theme.colors.white.v1};
`;
