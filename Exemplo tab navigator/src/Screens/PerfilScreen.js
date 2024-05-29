import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import SwitchLoginToCreateAccountButton from "../Components/SwitchLoginToCreateAccountButton";
import { LinearGradient } from "expo-linear-gradient";

const PerfilScreen = () => (
  <LinearGradient
    start={{ x: 0, y: 1 }}
    end={{ x: 1, y: 0 }}
    colors={["#8EC8EC", "#1E91DB"]}
    style={styles.background}
  >
    <SwitchLoginToCreateAccountButton />
  </LinearGradient>
);

export default PerfilScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
