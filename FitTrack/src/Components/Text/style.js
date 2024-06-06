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

export const TextQuickSandMedium = styled(Text)`
  font-family: ${Theme.fonts.quicksand.Quicksand_500Medium};
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${props => props.color || Theme.colors.white.v1};
  text-align: center;
`

export const TextQuickSandSemiBold = styled(TextMABold)`
color: ${props => props.color || Theme.colors.grayScale.V2};
font-family: ${Theme.fonts.quicksand.Quicksand_600SemiBold};
`

export const TextMarcado = styled(TextQuickSandBold)`
  color: #080808;
  text-decoration-line: underline;
  font-size: 16px;
`