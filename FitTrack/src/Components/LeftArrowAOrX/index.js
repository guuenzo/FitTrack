import { useNavigation } from "@react-navigation/native";
import Theme from "../../Styles/Theme";
import { LeftArrowAndXStyle, LeftArrowAndXStyleCamera } from "./style";
import { AntDesign } from "@expo/vector-icons"; //import para os ícones leftarrow e close X

export const LeftArrowAOrXComponent = ({
  size = 26,
  isLefArrow = true,
  top,
  left,
  fieldMargin,
  isBlue = false
}) => {
  const navigation = useNavigation();
  return (
    <LeftArrowAndXStyle
      onPress={() => navigation.goBack()}
      fieldMargin={fieldMargin}
      top={top}
      left={left}
    >
      <AntDesign
        name={isLefArrow ? "arrowleft" : "close"}
        size={size}
        color={isBlue ? Theme.colors.secondaryScale.V1 : Theme.colors.white.v1}
      />
    </LeftArrowAndXStyle>
  );
};

