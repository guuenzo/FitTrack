import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
import { ModalObejetivo } from "../../Components/ModalObjetivo/ModalObjetivo";

const PerfilScreen = () => {
  const navigation = useNavigation();
  const { userGlobalData, setUserGlobalData } = useContext(AuthContext);
  const [dados, setDados] = useState(false)
  const [exibeModalObj, setExibeModalObj] = useState(false)

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
    return (cleanUp = () => { });
  }, []);
  return (
    <Container>
      <GridLayout>
        <TouchableOpacity style={{ width: "max-content", height: "max-content" }} onPress={logout}>
          <Ionicons
            name="exit-outline"
            size={30}
            color={Theme.colors.red.v1}
            style={{ marginTop: 61, alignSelf: "flex-end", width: "max-content" }}
          />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <ImageProfile
            isHeader={false}
            uriImageProfile={userGlobalData.foto}
          />

          <Title text={userGlobalData.nome} />
          <TextQuickSandSemiBold>{userGlobalData.email}</TextQuickSandSemiBold>
        </View>

        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 20,
          }}
        >


          {
            dados == false ?
              <>
                {/* Card de peso */}
                <CardPerfil>
                  <MaterialIcons
                    name="scale"
                    size={24}
                    color={Theme.colors.secondaryScale.V1}
                  />

                  <TextMABold
                    color={Theme.colors.secondaryScale.V1}
                    fontSize="16px"
                  >
                    Peso
                  </TextMABold>

                </CardPerfil>


                {/* Card de altura */}
                <CardPerfil>
                  <FontAwesome
                    name="arrows-v"
                    size={24}
                    color={Theme.colors.secondaryScale.V1}
                  />
                  <TextMABold
                    color={Theme.colors.secondaryScale.V1}
                    fontSize="16px"
                  >
                    Altura
                  </TextMABold>

                </CardPerfil>


                {/* Card de objetivo */}
                <CardPerfil onPress={()=> setExibeModalObj(true)}>
                  <FontAwesome
                    name="line-chart"
                    size={24}
                    color={Theme.colors.secondaryScale.V1}
                  />

                  <TextMABold
                    color={Theme.colors.secondaryScale.V1}
                    fontSize="16px"
                  >
                    Objetivo
                  </TextMABold>


                </CardPerfil>
              </>

              :

              <>

                {/* Cards caso tenha todos os dados necessarios */}

                {/* Card de peso */}
                <CardPerfil>
                  <MaterialIcons
                    name="scale"
                    size={24}
                    color={Theme.colors.secondaryScale.V1}
                  />
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


                {/* Card de altura */}
                <CardPerfil>
                  <FontAwesome
                    name="arrows-v"
                    size={24}
                    color={Theme.colors.secondaryScale.V1}
                  />

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


                {/* Card de objetivo */}
                <CardPerfil>
                  <FontAwesome
                    name="line-chart"
                    size={24}
                    color={Theme.colors.secondaryScale.V1}
                  />
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


                {/* Card de IMC */}
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
              </>

          }

          <ModalObejetivo
          exibeModal={exibeModalObj}
          setExibeModal={setExibeModalObj}

          />

        </View>
      </GridLayout>
    </Container>
  );
};

export default PerfilScreen;
