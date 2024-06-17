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
import { ModalAltura } from "../../Components/ModalAltura/ModalAltura";
import { ModalPeso } from "../../Components/ModalPeso/ModalPeso";
import { api } from "../../Services/Service";
import { imcCalculator } from "../../utils/StringFunctions";
import { CameraModal } from "../../Components/CameraModal/CameraModal";

const PerfilScreen = () => {
  const navigation = useNavigation();
  const { userGlobalData, setUserGlobalData } = useContext(AuthContext);
  const [exibeModalObj, setExibeModalObj] = useState(false);
  const [exibeModalPeso, setExibeModalPeso] = useState(false);
  const [exibeModalAltura, setExibeModalAltura] = useState(false);
  const [exibeModalImc, setExibeModalImc] = useState(false);
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [showModalCamera, setShowModalCamera] = useState(false);

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

  async function getProfile() {
    const promise = await api.get(
      `/Usuario/BuscarPorId?id=${userGlobalData.id}`
    );
    console.log("Aqui esta");
    console.log(promise.data);
    setAltura(promise.data.altura);
    setPeso(promise.data.peso);
    setObjetivo(promise.data.usuarioObjetivo.objetivo);
  }

  //Funcao para os modais
  function MostrarModal(modal, valor) {
    if (modal == "peso") {
      setExibeModalPeso(true);
    } else if (modal == "altura") {
      setExibeModalAltura(true);
    } else if (modal == "objetivo") {
      setExibeModalObj(true);
    } else {
      setExibeModalImc(true);
    }
  }

  useEffect(() => {
    getProfile();
  }, [exibeModalAltura, exibeModalObj, exibeModalPeso]);
  return (
    <Container>
      <CameraModal
        visible={showModalCamera}
        setShowCameraModal={setShowModalCamera}
      />
      <GridLayout>
        <TouchableOpacity
          style={{ width: 30, height: 30, gap: 1, justifyContent: "center", alignItems: "center", flexDirection: 'row' , right: -315}}
          onPress={logout}
        >
          <Ionicons
            name="exit-outline"
            size={30}
            color={Theme.colors.red.v1}
            style={{
              marginTop: 61,
              alignSelf: "flex-end",
              width: "100%",
              height: "100%",
              // backgroundColor: "#fff",
            }}
          />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <ImageProfile
            setShowModalCamera={setShowModalCamera}
            isHeader={false}
            uriImageProfile={userGlobalData.foto}
          />

          <Title text={userGlobalData.nome} />
          <TextQuickSandSemiBold>{userGlobalData.email}</TextQuickSandSemiBold>
        </View>

        {/* replicar essa view nos cards de treino   */}
        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 20,
          }}
        >
          {/* Card de peso */}
          <CardPerfil onPress={() => MostrarModal("peso")}>
            <MaterialIcons
              name="scale"
              size={24}
              color={Theme.colors.secondaryScale.V1}
            />
            {peso !== null ? (
              <>
                <View>
                  <TextMABold
                    color={Theme.colors.secondaryScale.V1}
                    fontSize="16px"
                  >
                    {`${peso} Kg`}
                  </TextMABold>
                  <TextQuickSandSemiBold color={Theme.colors.secondaryScale.V5}>
                    Peso
                  </TextQuickSandSemiBold>
                </View>
              </>
            ) : (
              <>
                <TextMABold
                  color={Theme.colors.secondaryScale.V1}
                  fontSize="16px"
                >
                  Peso
                </TextMABold>
              </>
            )}
          </CardPerfil>

          {/* Card de altura */}
          <CardPerfil onPress={() => MostrarModal("altura")}>
            <FontAwesome
              name="arrows-v"
              size={24}
              color={Theme.colors.secondaryScale.V1}
            />
            {altura !== null ? (
              <>
                <View>
                  <TextMABold
                    color={Theme.colors.secondaryScale.V1}
                    fontSize="16px"
                  >
                    {`${altura} m`}
                  </TextMABold>
                  <TextQuickSandSemiBold color={Theme.colors.secondaryScale.V5}>
                    Altura
                  </TextQuickSandSemiBold>
                </View>
              </>
            ) : (
              <>
                <TextMABold
                  color={Theme.colors.secondaryScale.V1}
                  fontSize="16px"
                >
                  Altura
                </TextMABold>
              </>
            )}
          </CardPerfil>

          {/* Card de objetivo */}
          <CardPerfil onPress={() => MostrarModal("objetivo")}>
            <FontAwesome
              name="line-chart"
              size={24}
              color={Theme.colors.secondaryScale.V1}
            />
            {objetivo !== null ? (
              <>
                <View>
                  <TextMABold
                    color={Theme.colors.secondaryScale.V1}
                    fontSize="16px"
                  >
                    {objetivo}
                  </TextMABold>

                  <TextQuickSandSemiBold color={Theme.colors.secondaryScale.V5}>
                    Objetivo
                  </TextQuickSandSemiBold>
                </View>
              </>
            ) : (
              <>
                <TextMABold
                  color={Theme.colors.secondaryScale.V1}
                  fontSize="16px"
                >
                  Objetivo
                </TextMABold>
              </>
            )}
          </CardPerfil>

          {/* Card de IMC */}
          {peso !== null && altura !== null ? (
            <>
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
                    {imcCalculator(peso, altura)}
                  </TextMABold>
                  <TextQuickSandSemiBold color={Theme.colors.secondaryScale.V5}>
                    IMC
                  </TextQuickSandSemiBold>
                </View>
              </CardPerfil>
            </>
          ) : (
            <></>
          )}

          {objetivo !== null ? (
            <ModalObejetivo
              exibeModal={exibeModalObj}
              setExibeModal={setExibeModalObj}
              objetivoInicial={objetivo}
            />
          ) : (
            <ModalObejetivo
              exibeModal={exibeModalObj}
              setExibeModal={setExibeModalObj}
            />
          )}

          {altura != null ? (
            <ModalAltura
              exibeModal={exibeModalAltura}
              setExibeModal={setExibeModalAltura}
              alturaInicial={altura.toString()}
            />
          ) : (
            <ModalAltura
              exibeModal={exibeModalAltura}
              setExibeModal={setExibeModalAltura}
            />
          )}

          {peso != null ? (
            <ModalPeso
              exibeModal={exibeModalPeso}
              setExibeModal={setExibeModalPeso}
              pesoInicial={peso.toString()}
            />
          ) : (
            <ModalPeso
              exibeModal={exibeModalPeso}
              setExibeModal={setExibeModalPeso}
            />
          )}
        </View>
      </GridLayout>
    </Container>
  );
};

export default PerfilScreen;
