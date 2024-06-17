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
  disabled = false,
}) => {
  return (
    <ButtonStyle
      disabled={disabled}
      onPress={onPress}
      statusButton={statusButton}
    >
      {!disabled ? (
        <ButtonStyleText statusButton={statusButton}>{text}</ButtonStyleText>
      ) : (
        <ActivityIndicator size={"small"} color={Theme.colors.white.v1} />
      )}
    </ButtonStyle>
  );
};

//Botao que sera utilizado em todas as telas

export const ButtonComponentDefault = ({
  text = "",
  onPress,
  marginBottom,
  statusButton = false,
  isDeleteButton = false,
  fieldMargin,
  disabled = false,
}) => {
  return (
    <ButtonDefault
      fieldMargin={fieldMargin}
      disabled={disabled}
      onPress={onPress}
      statusButton={statusButton}
      marginBottom={marginBottom}
      isDeleteButton={isDeleteButton}
    >
      {!disabled ? (
        <ButtonStyleText statusButton={statusButton}>{text}</ButtonStyleText>
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
  loadingLogin = false,
  loadingCriarConta = false,
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
            disabled={loadingLogin}
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
            disabled={loadingCriarConta}
            onPress={() => handlePress(false)}
            statusButton={!statusButton}
            text="Criar conta"
          />
        </AnimatedButton>
      </AnimatedBoxStyle>
    </ButtonLoginCriarContaBoxStyle>
  );
};
