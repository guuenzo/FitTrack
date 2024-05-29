import * as React from "react";
import { View, StyleSheet } from "react-native";
import { BottomNavigation, Text } from "react-native-paper";
import { Provider } from "react-native-paper";
import SettingsScreen from "./src/Screens/SettingsScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import PerfilScreen from "./src/Screens/PerfilScreen";
import DietaScreen from "./src/Screens/DietaScreen";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Login from "./src/Screens/LoginScreen/Login";

const MyComponent = () => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    {
      key: "Dieta",
      // title: "Albums",
      focusedIcon: ({ color = "#FFF", size = 20 }) => (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={size}
            color={color}
          />
        </View>
      ),
      unfocusedIcon: ({ color = "#2B3C64", size = 20 }) => (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={size}
            color={"#2B3C64"}
          />
        </View>
      ),
    },
    {
      key: "Treino",
      focusedIcon: ({ color = "#FFF", size = 20 }) => (
        <MaterialCommunityIcons name="dumbbell" size={size} color={color} />
      ),
      unfocusedIcon: ({ color = "#2B3C64", size = 20 }) => (
        <MaterialCommunityIcons name="dumbbell" size={size} color={"#2B3C64"} />
      ),
    },
    {
      key: "Perfil",
      // Use a function to return the Ionicons component
      focusedIcon: ({ color = "#FFF", size = 20 }) => (
        <FontAwesome6 name="user-circle" size={size} color={color} />
      ),
      unfocusedIcon: ({ color = "#2B3C64", size = 20 }) => (
        <FontAwesome6 name="user-circle" size={size} color={"#2B3C64"} />
      ),
    },
    // {
    //   key: "Login",
    //   // Use a function to return the Ionicons component
    //   focusedIcon: ({ color = "#FFF", size = 20 }) => (
    //     <MaterialCommunityIcons name="login" size={24} color="#fff" />
    //   ),
    //   unfocusedIcon: ({ color = "#2B3C64", size = 20 }) => (
    //     <MaterialCommunityIcons name="login" size={24} color="#2B3C64" />
    //   ),
    // },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Treino: HomeScreen,
    Perfil: PerfilScreen,
    Dieta: DietaScreen,
    // Login: Login,
  });

  return (
    <Provider>
      <BottomNavigation
        shifting
        //"representa a cor que envolve o icone"
        activeIndicatorStyle={{
          backgroundColor: "#2B3C64",
          height: 45,
          width: 45,
        }}
        activeColor="white"
        //barra
        barStyle={{
          height: 65,
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowOffset: "0px 4px",
          shadowRadius: "10px",
          elevation: 10,
        }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </Provider>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
