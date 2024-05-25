import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import Theme from "./src/Styles/Theme";
import { useEffect } from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { apiAlimentos } from "./src/Services/Service";

const App = () => {
  //retorna se o tema do dispositivo é dark ou light. Possíveis retornos do método: dark, light, null, undefined
  const deviceTheme = useColorScheme();

  //caso venha como nulo, usa o tema light
  //o "deviceTheme"(tem o mesmo valor de dark ou light) é como se fosse o parametro de busca no "Theme"
  // const theme = Theme[deviceTheme] || Theme.light;
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
