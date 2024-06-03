import { useNavigation } from "@react-navigation/native";
import Theme from "../../Styles/Theme";
import { LeftArrowAndXStyle, LeftArrowAndXStyleCamera } from "./style";
import { AntDesign } from "@expo/vector-icons"; //import para os ícones leftarrow e close X

export const LeftArrowAOrXComponent = ({
  size = 26,
  color = Theme.colors.secondaryScale.V1,
  isLefArrow = true,
  top,
  left,
  fieldMargin,
}) => {
  const navigation = useNavigation();
  return (
    <LeftArrowAndXStyle fieldMargin={fieldMargin} top={top} left={left}>
      <AntDesign
        onPress={() => navigation.goBack()}
        name={isLefArrow ? "arrowleft" : "close"}
        size={size}
        color={color}
      />
    </LeftArrowAndXStyle>
  );
};

export const LeftArrowAOrXCameraComponent = ({
  size = 26,
  color = Theme.colors.secondaryScale.V1,
  isLefArrow = true,
  navigation,
  onPress,
}) => {
  return (
    <LeftArrowAndXStyleCamera onPress={onPress}>
      <AntDesign
        name={isLefArrow ? "arrowleft" : "close"}
        size={size}
        color={color}
      />
    </LeftArrowAndXStyleCamera>
  );
};
