import { Dimensions } from "react-native";
import React, { useEffect } from "react";
import SplashAnimation from "../../Assets/Animations/SplashAnimationFitTrack.json";
import LottieView from "lottie-react-native";
import {
  Container,
  LinearGradientTelasIniciais,
} from "../../Components/Container/style";
import { CommonActions, useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const size = Dimensions.get("window").width * 0.5;

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    }, 3700);

    return (cleanUp = () => {});
  }, []);

  return (
    <LinearGradientTelasIniciais>
      <LottieView
        source={SplashAnimation}
        autoPlay
        loop
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </LinearGradientTelasIniciais>
  );
};
export default SplashScreen;
