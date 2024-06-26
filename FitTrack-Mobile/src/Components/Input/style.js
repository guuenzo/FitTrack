import styled from "styled-components";
// import { TextInput as TextInputPaper } from "react-native-paper";
import Theme from "../../Styles/Theme";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput, Touchable, View } from "react-native";
import { BlurView } from "expo-blur";

export const InputContainer = styled(View)`
  border-radius: 20px;
`;

export const InputStyle = styled(TextInput).attrs({
  placeholderTextColor: Theme.colors.white.v1,
})`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background-color: transparent;
  padding: 0 10px;
  font-family: ${Theme.fonts.quicksand.Quicksand_700Bold};
  font-size: 16px;
  color: ${Theme.colors.white.v1};
  text-decoration: none;
`;

export const InputFormStyle = styled(InputStyle).attrs({
  placeholderTextColor: Theme.colors.secondaryScale.V1,
})`
  height: 40px;
  border: 1px solid ${Theme.colors.secondaryScale.V1};
  color: ${Theme.colors.secondaryScale.V1};
`;

export const LinearGradientInputView = styled(LinearGradient).attrs({
  start: { x: -1, y: -0.3 },
  end: { x: 1.1, y: 1.3 },
  colors: [`rgba(239, 239, 239, 0.2)`, `rgba(239, 239, 239, 0.1)`],
})`
  border-radius: 10px;
`;

export const BlurViewComponent = styled(BlurView).attrs({
  tint: "light",
  intensity: 40,
})`
  border-radius: 10px;
  overflow: hidden;
  height: max-content;
  width: max-content;
`;

export const InputDataView = styled(Touchable)`
  color: ${(props) => props.textColor || Theme.colors.white.v1};
  background-color: transparent;
  border-radius: 10px;
`;

//Input para verificacao do codigo recebido no email
export const InputCode = styled(TextInput)`
  width: 65px;
  height: 62px;
  text-align: center;
  font-size: 40px;
  color: ${Theme.colors.white.v1};
`;
