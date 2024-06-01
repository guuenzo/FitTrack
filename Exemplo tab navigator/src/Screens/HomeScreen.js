import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function HomeScreen() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const transition = useSharedValue(0);

  const handlePress = () => {
    setIsLoginForm((prev) => !prev);
    transition.value = withTiming(isLoginForm ? 1 : 0, { duration: 300 });
  };

  const loginButtonStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: transition.value === 0 ? "transparent" : "transparent",
    };
  });

  const signUpButtonStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: transition.value === 1 ? "transparent" : "transparent",
    };
  });

  const animadaStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: transition.value === 1 ? "transparent" : "transparent",
      transform: [{ translateX: "-100%" }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={{ width: "85%" }}>
        <Animated.View style={styles.btnBox}>
          <View style={[styles.button]}>
            <TouchableOpacity style={{}} onPress={handlePress}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.button]}>
            <TouchableOpacity style={{}} onPress={handlePress}>
              <Text style={styles.text}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View style={{ marginTop: 50 }}>
          <Text>{isLoginForm ? "Login" : "Criar conta"}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // flexDirection: "row",
    backgroundColor: "#0f12e041",
  },
  button: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "red",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  animada: {
    flexDirection: "row",
    top: 0,
    position: "absolute",
    left: "25%",
    width: "50%",
    backgroundColor: "red",
    borderRadius: 10,
  },
  btnBox: {
    flexDirection: "row",
    width: "85%",
    height: "max-content",
    justifyContent: "center",
    backgroundColor: "#0f12e041",
  },
});
