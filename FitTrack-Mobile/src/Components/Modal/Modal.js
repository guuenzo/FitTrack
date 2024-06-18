import {
  ContainerClose,
  ContainerVideo,
  ContentModalvideo,
  ImgVideo,
  ModalContent,
  ModalStyle,
} from "./style";
import { useContext, useEffect, useState } from "react";
import { Portal } from "react-native-paper";
import Title from "../Title/Title";
import { ButtonComponentDefault, ButtonSecondary } from "../Button/Button";
import Theme from "../../Styles/Theme";
import { InputDefault } from "../Input/Input";
import { ActivityIndicator, Image, Modal, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { api, detalhesExercicioResource } from "../../Services/Service";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  ContainerTextGrupo,
  TextGrupo,
} from "../../Screens/SelecioneOsExerciciosScreen/style";
import DialogComponent from "../Dialog/Dialog";

export const ModalAlimentacao = ({
  exibeModal = false,
  setExibeModal,
  titulo = "Dê um nome para sua refeição:",
  setTexto,
  texto,
  isEditName = true,
  peso,
  setPeso,
  valorOriginalMacro,
  alterarPesoAlimento = () => {},
}) => {
  const [pesoState, setPesoState] = useState(peso);
  const [textoState, setTextoState] = useState(texto);
  const hideModal = () => setExibeModal(false);

  useEffect(() => {
    if (exibeModal) {
      setPesoState(peso);
      setTextoState(texto);
    }
  }, [exibeModal, peso, texto]);

  return (
    <Portal>
      <ModalStyle fieldPadding={20} visible={exibeModal} onDismiss={hideModal}>
        <ModalContent gap={"50px"} aligItems={"center"}>
          <Title
            textAling={"center"}
            text={
              isEditName
                ? "Dê um nome para sua refeição:"
                : "Informe o peso em gramas"
            }
          />

          <InputDefault
            keyboardType={isEditName ? "default" : "numeric"}
            value={isEditName ? textoState : pesoState.toString()}
            placeholder={isEditName ? "Nome" : "Peso"}
            onChangeText={(txt) =>
              isEditName ? setTextoState(txt) : setPesoState(Number(txt))
            }
          />
          <View>
            <ButtonComponentDefault
              statusButton
              text="Salvar"
              onPress={() => {
                if (isEditName) {
                  setTexto(textoState);
                  setExibeModal(false);
                } else {
                  setPeso(pesoState);
                  alterarPesoAlimento(valorOriginalMacro, pesoState, peso);
                  setExibeModal(false);
                }
              }}
            />
            <ButtonSecondary
              colorText={Theme.colors.secondaryScale.V1}
              textButton="Cancelar"
              onPress={() => setExibeModal(false)}
            />
          </View>
        </ModalContent>
      </ModalStyle>
    </Portal>
  );
};

export const ModalVideoExercicio = ({ visible, setModalVideo, modalVideo }) => {
  const hideModal = () => setModalVideo({ modal: false });
  return (
    <Portal>
      <ModalStyle
        // fieldPadding={0}
        visible={visible}
        onDismiss={hideModal}
      >
        <ContentModalvideo>
          <ContainerClose>
            <AntDesign
              name="close"
              size={30}
              color="#2B3C64"
              onPress={hideModal}
            />
          </ContainerClose>

          <Title fieldMargin={"0px"} text={modalVideo.nomeExe} />
          {modalVideo.video ? (
            <ContainerVideo>
              <ImgVideo source={{ uri: modalVideo.video }} />
            </ContainerVideo>
          ) : (
            <ActivityIndicator size="large" color="#2B3C64" />
          )}
        </ContentModalvideo>
      </ModalStyle>
    </Portal>
  );
};

export const ModalDetalhesExercicio = ({
  exibeModal = false,
  setExibeModal,
  onPress = () => {},
  idExercicio = "",
  nomeExercicio = "Default",
}) => {
  const [dialog, setDialog] = useState({});

  const [showDialog, setShowDialog] = useState(false);

  const [loading, setLoading] = useState(false);
  const { userGlobalData } = useContext(AuthContext);
  const hideModal = () => setExibeModal(false);
  const [detalhesExercicio, setDetalhesExercicio] = useState({
    idDetalhesExercicio: "",
    series: 0,
    repeticoes: 0,
    carga: 0,
  });

  const getDetalhesExercicio = async () => {
    try {
      const { data, status } = await api.get(
        `${detalhesExercicioResource}/ListarDetalhesDeUmExercicio?idUsuario=${userGlobalData.id}&idExercicio=${idExercicio}`
      );

      if (status === 200) {
        setDetalhesExercicio(data);
      }
    } catch (error) {}
  };

  const atualizarDetalhesExercicio = async () => {
    setLoading(true);
    try {
      const { status } = await api.put(
        `${detalhesExercicioResource}/Atualizar`,
        detalhesExercicio
      );
      if (status === 204) {
        setDialog({
          status: "sucesso",
          contentMessage: "Atualizado com sucesso!",
        });
        setShowDialog(true);
        setLoading(false);

        // hideModal();
        return;
      }
    } catch (error) {
      setDialog({
        status: "erro",
        contentMessage: "Erro ao atualizar os detalhes do exercício!",
      });
      setShowDialog(true);
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    getDetalhesExercicio();
  }, []);

  return (
    <Portal>
      <ModalStyle fieldPadding={20} visible={exibeModal} onDismiss={hideModal}>
        <ModalContent gap={"0px"}>
          <DialogComponent
            {...dialog}
            visible={showDialog}
            setVisible={setShowDialog}
            setDialog={setDialog}
          />
          <ContainerClose>
            <AntDesign
              name="close"
              size={30}
              color="#2B3C64"
              onPress={hideModal}
            />
          </ContainerClose>

          <Title textAling={"center"} text={nomeExercicio} />

          <ContainerTextGrupo>
            <TextGrupo>Séries</TextGrupo>
          </ContainerTextGrupo>
          <InputDefault
            value={
              detalhesExercicio.series.toString()
                ? detalhesExercicio.series.toString()
                : 20
            }
            keyboardType="numeric"
            onChangeText={(txt) =>
              setDetalhesExercicio({ ...detalhesExercicio, series: txt })
            }
          />
          <ContainerTextGrupo>
            <TextGrupo>Repetições</TextGrupo>
          </ContainerTextGrupo>
          <InputDefault
            value={
              detalhesExercicio ? detalhesExercicio.repeticoes.toString() : 20
            }
            onChangeText={(txt) =>
              setDetalhesExercicio({ ...detalhesExercicio, repeticoes: txt })
            }
            keyboardType="numeric"
          />
          <ContainerTextGrupo>
            <TextGrupo>Peso</TextGrupo>
          </ContainerTextGrupo>
          <InputDefault
            value={
              detalhesExercicio.carga.toString()
                ? detalhesExercicio.carga.toString()
                : 0
            }
            onChangeText={(txt) =>
              setDetalhesExercicio({ ...detalhesExercicio, carga: txt })
            }
            keyboardType="numeric"
          />
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <ButtonComponentDefault
              disabled={loading}
              statusButton
              text="Confirmar"
              onPress={atualizarDetalhesExercicio}
            />
          </View>
        </ModalContent>
      </ModalStyle>
    </Portal>
  );
};
