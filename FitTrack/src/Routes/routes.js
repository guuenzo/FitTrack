import { StatusBar } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/LoginScreen/LoginScreen";
import Main from "../Screens/Main/Main";
import PerfilScreen from "../Screens/PerfilScreen/PerfilScreen";
import RecuperarSenhaScreen from "../Screens/RecuperarSenhaScreen/RecuperarSenhaScreen";
import VerificarCodigoScreen from "../Screens/VerificarCodigoScreen/VerificarCodigoScreen";
import RedefinirSenhaScreen from "../Screens/RedefinirSenhaScreen/RedefinirSenhaScreen";
import PersonalizeSeusTreinosScreen from "../Screens/PersonalizeSeusTreinosScreen/PersonalizeSeusTreinosScreen";
import SelecioneOsGruposMuscularesScreen from "../Screens/SelecioneOsGruposMuscularesScreen/SelecioneOsGruposMuscularesScreen";
import SelecioneOsExerciciosScreen from "../Screens/SelecioneOsExerciciosScreen/SelecioneOsExerciciosScreen";
import VisualizarTreinoScreen from "../Screens/VisualizarTreinoScreen/VisualizarTreinoScreen";
import MonteSuaRefeiçãoScreen from "../Screens/MonteSuaRefeiçãoScreen/MonteSuaRefeiçãoScreen";
import Theme from "../Styles/Theme";
import AlimentacaoScreen from "../Screens/AlimentacaoScreen/AlimentacaoScreen";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import TreinosScreen from "../Screens/TreinoScreen/TreinosScreen";
import SplashScreen from "../Screens/SplashScreen";

const Routes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar
          backgroundColor={"transparent"}
          barStyle="dark-content"
          translucent
        />
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Splash"
        >
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ title: "Splash" }}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login" }}
          />

          <Stack.Screen
            name="RecuperarSenha"
            component={RecuperarSenhaScreen}
            options={{ title: "RecuperarSenha" }}
          />

          <Stack.Screen
            options={{ title: "Main" }}
            name="Main"
            component={Main}
          />

          <Stack.Screen
            options={{ title: "Perfil" }}
            name="Perfil"
            component={PerfilScreen}
          />

          <Stack.Screen
            options={{ title: "Alimentacao" }}
            name="Alimentacao"
            component={AlimentacaoScreen}
          />

          <Stack.Screen
            options={{ title: "VerificarCodigo" }}
            name="VerificarCodigo"
            component={VerificarCodigoScreen}
          />

          <Stack.Screen
            options={{ title: "RedefinirSenha" }}
            name="RedefinirSenha"
            component={RedefinirSenhaScreen}
          />

          <Stack.Screen
            options={{ title: "Treinos" }}
            name="Treinos"
            component={TreinosScreen}
          />

          <Stack.Screen
            options={{ title: "PersonalizeSeusTreinos" }}
            name="PersonalizeSeusTreinos"
            component={PersonalizeSeusTreinosScreen}
          />

          <Stack.Screen
            options={{ title: "SelecioneOsGruposMusculares" }}
            name="SelecioneOsGruposMusculares"
            component={SelecioneOsGruposMuscularesScreen}
          />

          <Stack.Screen
            options={{ title: "SelecioneOsExercicios" }}
            name="SelecioneOsExercicios"
            component={SelecioneOsExerciciosScreen}
          />

          <Stack.Screen
            options={{ title: "VisualizarTreino" }}
            name="VisualizarTreino"
            component={VisualizarTreinoScreen}
          />

          <Stack.Screen
            options={{ title: "MonteSuaRefeição" }}
            name="MonteSuaRefeição"
            component={MonteSuaRefeiçãoScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Routes;
