import { useColorScheme, LogBox } from "react-native";
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
import Routes from "./src/Routes/routes";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";

const App = () => {
  //retorna se o tema do dispositivo é dark ou light. Possíveis retornos do método: dark, light, null, undefined
  const deviceTheme = useColorScheme();

  const requestGaleriaPermissions = async () => {
    await MediaLibrary.requestPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  };

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

  // Desativar todos os warnings
  LogBox.ignoreAllLogs(true);

  return <Routes />;
};

export default App;
