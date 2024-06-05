import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components";
import Theme from "../../Styles/Theme";
import Animated from "react-native-reanimated";

export const ButtonStyle = styled(Button)`
  height: 45px;
  width: 125px;
  background-color: ${(props) =>
    props.statusButton ? "#2B3C64" : "transparent"};
`;

export const ButtonStyleText = styled(Text)`
  color: ${Theme.colors.white.v1};
  font-family: ${Theme.fonts.quicksand.Quicksand_700Bold};
  font-size: 14px;
  text-align: center;
  text-transform: ${(props) => (props.statusButton ? "uppercase" : "none")};
`;

export const ButtonScondaryStyle = styled(TouchableOpacity)`
  width: max-content;
  align-items: center;
  margin: ${(props) => props.fieldMargin || "0px"};
`;

export const ButtonScondaryText = styled(Text)`
  color: ${Theme.colors.white.v1};
  font-family: ${Theme.fonts.montserratAlternates
    .MontserratAlternates_500Medium};
`;
export const ButtonLoginCriarContaBoxStyle = styled(Animated.View)`
  width: 100%;
  height: max-content;
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.fieldMargin || "0px"};
`;

export const AnimatedBoxStyle = styled(Animated.View)`
  width: 100%;
  /* border-radius: ${(props) =>
    props.statusButton ? "20px 0 0 20px" : "0 20px 20px 0"}; */
  flex-direction: row;
  justify-content: space-around;
  /* background-color: red; */
`;

export const AnimatedButton = styled(Animated.View)`
  width: 45%;
  align-items: center;
  border-radius: ${(props) => props.fieldBorderRadius || "0px"};
`;

export const Toggle = styled(View)``;

export const ToggleLogin = styled(View)``;
export const ToggleCriarConta = styled(View)``;
export const ButtonDefault = styled(ButtonStyle)`
  width: 200px;
  border-radius: 20px;
`;

