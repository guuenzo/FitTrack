import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  SharedTransition,
  withSpring,
} from "react-native-reanimated";

const DietaScreen = () => {
  const [activeButton, setActiveButton] = useState("login");
  const isActive = useSharedValue(activeButton === "login" ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      isActive.value,
      [0, 1],
      ["transparent", "#2B3C64"]
    );
    return { backgroundColor };
  });

  const CONFIG = {
    mass: 1,
    stiffness: 100,
    damping: 200,
  };

  const sharedElementTransition = SharedTransition.custom((values) => {
    "worklet";
    return {
      height: withSpring(values.currentHeight, CONFIG),
      width: withSpring(values.currentWidth, CONFIG),
      originX: withSpring(values.currentOriginX, CONFIG),
      originY: withSpring(values.currentOriginY, CONFIG),
    };
  });

  return (
    <View
      sharedTransitionTag="reanimatedTransition"
      sharedTransitionStyle={sharedElementTransition}
      style={styles.container}
    >
      {/* Envolve o TouchableOpacity com Animated.View */}
      <Animated.View style={[styles.button, animatedStyle]}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setActiveButton("login")}
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        {/* Envolve o TouchableOpacity com Animated.View */}

        <TouchableOpacity
          style={styles.btn}
          onPress={() => setActiveButton("signup")}
        >
          <Text style={styles.text}>Criar Conta</Text>
        </TouchableOpacity>
      </Animated.View>

      <Text style={{ color: "green", marginLeft: 20 }}>{activeButton}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    padding: 30,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    gap: 20,
    borderRadius: 5,
  },
  text: {
    color: "#fff",
  },
});

export default DietaScreen;
