import {
  AnimatedBoxStyle,
  AnimatedButton,
  ButtonDefault,
  ButtonLoginCriarContaBoxStyle,
  ButtonScondaryStyle,
  ButtonScondaryText,
  ButtonStyle,
  ButtonStyleText,
} from "./style";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Theme from "../../Styles/Theme";
import { ActivityIndicator } from "react-native-paper";

//Tela de login
export const ButtonComponent = ({
  text = "",
  onPress,
  statusButton = false,
}) => {
  return (
    <ButtonStyle onPress={onPress} statusButton={statusButton}>
      <ButtonStyleText statusButton={statusButton}>{text}</ButtonStyleText>
    </ButtonStyle>
  );
};

//Botao que sera utilizado em todas as telas

export const ButtonComponentDefault = ({
  text = "",
  onPress,
  marginBottom,
  statusButton = false,
  isLoading = false,
  isDeleteButton = false,
}) => {
  return (
    <ButtonDefault
      disabled={isLoading}
      onPress={onPress}
      statusButton={statusButton}
      marginBottom={marginBottom}
      isDeleteButton={isDeleteButton}
    >
      {!isLoading ? (
        <ButtonStyleText
          
          statusButton={statusButton}
        >
          {text}
        </ButtonStyleText>
      ) : (
        <ActivityIndicator size={"small"} color="white" />
      )}
    </ButtonDefault>
  );
};

export const ButtonSecondary = ({
  textButton = "Esqueceu sua senha ?",
  onPress,
  fieldMargin = "20px 0 0 0",
  colorText,
}) => {
  return (
    <ButtonScondaryStyle fieldMargin={fieldMargin} onPress={onPress}>
      <ButtonScondaryText color={colorText}>{textButton}</ButtonScondaryText>
    </ButtonScondaryStyle>
  );
};

export const ButtonLoginCriarContaBox = ({
  statusButton = true,
  handleLogar,
  handleCriarConta,
  fieldMargin = "0px",
}) => {
  const translateX = useSharedValue(0);
  const backgroundColor = useSharedValue(statusButton ? 0 : 1); // 0 para login, 1 para criar conta

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const loginButtonStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        backgroundColor.value,
        [0, 1],
        [Theme.colors.secondaryScale.V1, "transparent"]
      ),
    };
  });

  const signUpButtonStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        backgroundColor.value,
        [0, 1],
        ["transparent", Theme.colors.secondaryScale.V1]
      ),
    };
  });

  const handlePress = (isLogin) => {
    translateX.value = withTiming(0, { duration: 500 });
    backgroundColor.value = withTiming(isLogin ? 0 : 1, { duration: 500 });
    if (isLogin) {
      handleLogar();
    } else {
      handleCriarConta();
    }
  };

  return (
    <ButtonLoginCriarContaBoxStyle fieldMargin={fieldMargin}>
      <AnimatedBoxStyle style={animatedStyle} statusButton={statusButton}>
        <AnimatedButton
          fieldBorderRadius={"20px 20px 20px 20px"}
          style={loginButtonStyle}
          statusButton={statusButton}
        >
          <ButtonComponent
            onPress={() => handlePress(true)}
            statusButton={statusButton}
            text="Entrar"
          />
        </AnimatedButton>
        <AnimatedButton
          fieldBorderRadius={"20px 20px 20px 20px"}
          style={signUpButtonStyle}
        >
          <ButtonComponent
            onPress={() => handlePress(false)}
            statusButton={!statusButton}
            text="Criar conta"
          />
        </AnimatedButton>
      </AnimatedBoxStyle>
    </ButtonLoginCriarContaBoxStyle>
  );
};
