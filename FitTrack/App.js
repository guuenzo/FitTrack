import { StyleSheet, Text, View, useColorScheme } from "react-native";
import {
  useFonts,
  MontserratAlternates_500Medium,
  MontserratAlternates_600SemiBold,
  MontserratAlternates_700Bold,
} from "@expo-google-fonts/montserrat-alternates";
import {
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import { Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import Routes from "./src/Routes/Routes"

const App = () => {
  //retorna se o tema do dispositivo é dark ou light. Possíveis retornos do método: dark, light, null, undefined
  const deviceTheme = useColorScheme();

  //caso venha como nulo, usa o tema light
  //o "deviceTheme"(tem o mesmo valor de dark ou light) é como se fosse o parametro de busca no "Theme"
  // const theme = Theme[deviceTheme] || Theme.light;

  let [fontsLoaded, fontError] = useFonts({
    MontserratAlternates_500Medium,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_700Bold,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <Routes/>;
};

export default App;
