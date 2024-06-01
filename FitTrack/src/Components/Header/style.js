import { LinearGradient } from "expo-linear-gradient";
import { Image, TouchableOpacity, View } from "react-native";
import { styled } from "styled-components";
import Theme from "../../Styles/Theme/index";

export const HeaderStyle = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  colors: [Theme.colors.secondaryScale.V1, Theme.colors.primaryScale.V1],
})`
  width: 90%;
  height: 85px;
  border-radius: 10px;
  padding: 17px 22px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const WelcomeTextBox = styled(View)`
  width: max-content;
  margin-left: 7px;
`;

export const ProfileButton = styled(TouchableOpacity)`
  /* background-color: red; */
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const WelcomeBox = styled(View)`
  flex-direction: row;
`;
