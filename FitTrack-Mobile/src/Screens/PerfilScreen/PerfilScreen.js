import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import {
  Container,
  GridLayout,
  MainContent,
  MainContentScroll,
} from "../../Components/Container/style";
import Title from "../../Components/Title/Title";
import { ImageProfile, ImageProfileUser } from "../../Components/Image/Image";
import { AuthContext } from "../../Contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { TextMABold, TextQuickSandSemiBold } from "../../Components/Text/style";
import { CardPerfil } from "../../Components/CardPerfil/Style";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Theme from "../../Styles/Theme";
import { CommonActions, useNavigation } from "@react-navigation/native";

const PerfilScreen = ({
  uriImageProfile = "https://avatars.githubusercontent.com/u/125310170?s=400&u=e379fad687a58d753af1755743dc6d57db9d001b&v=4",
}) => {
  const navigation = useNavigation();
  const { userGlobalData, setUserGlobalData } = useContext(AuthContext);

  const logout = () => {
    //reseta a pilha de telas do navigation e manda pra login
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );

    //limpa os dados do usuario no state global
    setUserGlobalData({});
  };
  useEffect(() => {
    return (cleanUp = () => {});
  }, []);
  return (
    <Container>
      <GridLayout>
        <TouchableOpacity onPress={logout}>
          <Ionicons
            name="exit-outline"
            size={30}
            color={Theme.colors.red.v1}
            style={{ marginTop: 61, alignSelf: "flex-end" }}
          />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <ImageProfile
            isHeader={false}
            uriImageProfile={userGlobalData.foto || uriImageProfile}
          />

          <Title text={"Felipe Gois"} />
          <TextQuickSandSemiBold>email@email.com</TextQuickSandSemiBold>
        </View>

        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 20,
          }}
        >
          <CardPerfil>
            <MaterialCommunityIcons
              name="heart-pulse"
              size={24}
              color={Theme.colors.secondaryScale.V1}
            />
            <View>
              <TextMABold
                color={Theme.colors.secondaryScale.V1}
                fontSize="16px"
              >
                23.5
              </TextMABold>
              <TextQuickSandSemiBold color={Theme.colors.secondaryScale.V5}>
                IMC
              </TextQuickSandSemiBold>
            </View>
          </CardPerfil>

          <CardPerfil>
            <MaterialIcons name="scale" size={24} color={Theme.colors.secondaryScale.V1} />
            <View>
              <TextMABold
                color={Theme.colors.secondaryScale.V1}
                fontSize="16px"
              >
                60.0KG
              </TextMABold>
              <TextQuickSandSemiBold color={Theme.colors.secondaryScale.V5}>
                Peso
              </TextQuickSandSemiBold>
            </View>
          </CardPerfil>

          <CardPerfil>
            <FontAwesome name="line-chart" size={24} color={Theme.colors.secondaryScale.V1} />

            <View>
              <TextMABold
                color={Theme.colors.secondaryScale.V1}
                fontSize="16px"
              >
                Bulking
              </TextMABold>

              <TextQuickSandSemiBold color={Theme.colors.secondaryScale.V5}>
                Objetivo
              </TextQuickSandSemiBold>
            </View>
          </CardPerfil>
          <CardPerfil>
            <FontAwesome name="arrows-v" size={24} color={Theme.colors.secondaryScale.V1} />

            <View>
              <TextMABold
                color={Theme.colors.secondaryScale.V1}
                fontSize="16px"
              >
                1,7 m
              </TextMABold>
              <TextQuickSandSemiBold color={Theme.colors.secondaryScale.V5}>
                Altura
              </TextQuickSandSemiBold>
            </View>
          </CardPerfil>
        </View>
      </GridLayout>
    </Container>
  );
};

export default PerfilScreen;
