import { StyleSheet, Text, View } from "react-native";
import { i18n } from "./src/lib/i18n";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>i18N</Text>
      <Text>{i18n.t("food", { name: "Toy" })}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
