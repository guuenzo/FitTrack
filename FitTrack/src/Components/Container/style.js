import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { styled } from "styled-components";
import Theme from "../../Styles/Theme";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Theme.colors.white.v2};
`;

export const MainContentScroll = styled(ScrollView)`
  flex: 1;
  background-color: ${Theme.colors.white.v2};
`;

export const LinearGradientTelasIniciais = styled(LinearGradient).attrs({
  start: { x: 0, y: 0.5 },
  end: { x: 1, y: 0.5 },
  colors: ["#2B3C64", "#1E91DB"],
})`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const GridLayout = styled(View)`
  width: 90%;
  height: 100%;
  align-self: center;
  background-color: transparent;
`;

export const MainContent = styled(View)`
  background-color: ${(props) =>
    props.backGround ? props.backGround : Theme.colors.white.v2};
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.gap || "0px"};
`;

export const InputBox = styled(View)`
  width: 100%;
  height: ${(props) => props.fieldHeight || "max-content"};
  /* background-color: red; */
  gap: ${(props) => props.gap || "0px"};
  align-items: ${(props) => props.fieldAlignItems || "stretch"};
  justify-content: ${(props) => props.fieldJustifyContent || "flex-start"};
`;
