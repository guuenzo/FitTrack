import { View } from "react-native";
import React, { useState } from "react";
import Theme from "../../Styles/Theme/index";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PerfilScreen from "../PerfilScreen/PerfilScreen";
import AlimentacaoScreen from "../AlimentacaoScreen/AlimentacaoScreen";
import { BottomNavigationStyle } from "./style";
import { BottomNavigation } from "react-native-paper";
import TreinosScreen from "../TreinoScreen/TreinosScreen";

const Main = () => {
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    {
      key: "Alimentacao",
      // title: "Alimentacao",
      focusedIcon: () => (
        <View>
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={25}
            color={Theme.colors.white.v1}
          />
        </View>
      ),
      unfocusedIcon: () => (
        <View>
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={25}
            color={Theme.colors.secondaryScale.V1}
          />
        </View>
      ),
    },
    {
      key: "Treino",
      focusedIcon: () => (
        <MaterialCommunityIcons
          name="dumbbell"
          size={25}
          color={Theme.colors.white.v1}
        />
      ),
      unfocusedIcon: () => (
        <MaterialCommunityIcons
          name="dumbbell"
          size={25}
          color={Theme.colors.secondaryScale.V1}
        />
      ),
    },
    {
      key: "Perfil",
      // Use a function to return the Ionicons component
      focusedIcon: () => (
        <FontAwesome6
          name="user-circle"
          size={25}
          color={Theme.colors.white.v1}
        />
      ),
      unfocusedIcon: () => (
        <FontAwesome6
          name="user-circle"
          size={25}
          color={Theme.colors.secondaryScale.V1}
        />
      ),
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Alimentacao: AlimentacaoScreen,
    Treino: TreinosScreen,
    Perfil: PerfilScreen,
  });

  return (
    <BottomNavigationStyle
      shifting
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Main;
