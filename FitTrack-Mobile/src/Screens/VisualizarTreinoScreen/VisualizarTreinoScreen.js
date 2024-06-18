import React, { useEffect, useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import {
  Container,
  GridLayout,
  MainContent,
  MainContentScroll,
} from "../../Components/Container/style";
import Title from "../../Components/Title/Title";
import FlatListComponent from "../../Components/FlatList/FlatList";
import { CardExercicio } from "../../Components/CardTreino/CardTreino";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";
import { StatusBar, View } from "react-native";
import {
  ContainerTextGrupo,
  TextGrupo,
} from "../SelecioneOsExerciciosScreen/style";
import { ButtonComponentDefault } from "../../Components/Button/Button";
import { api, treinoResource } from "../../Services/Service";
import {
  ModalDetalhesExercicio,
  ModalVideoExercicio,
} from "../../Components/Modal/Modal";
import DialogComponent from "../../Components/Dialog/Dialog";

const VisualizarTreinoScreen = ({ route }) => {
  const heightStatusBar = StatusBar.currentHeight;
  const navigation = useNavigation();

  const [dialog, setDialog] = useState({});

  const [showDialog, setShowDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const [modalVideo, setModalVideo] = useState({
    nomeExe: "",
    video: "",
    modal: false,
  });

  const [verModalDetalhesExercicio, setVerModalDetalhesExercicio] =
    useState(false);
  const [idExercicioAtual, setIdExercicioAtual] = useState("");
  const [treino, setTreino] = useState(
    route.params.treino.idTreino ? route.params.treino : {}
  );

  const [nomeExercicioSelecionado, setNomeExercicioSelecionado] = useState("");

  const excluirTreino = async () => {
    setLoading(true);
    try {
      await api.delete(
        `${treinoResource}/ExcluirTreino?id=${route.params.treino.idTreino}`
      );

      setDialog({
        status: "sucesso",
        contentMessage: "Excluído com sucesso!",
      });
      setShowDialog(true);
      setLoading(false);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Main", params: { indice: 1 } }],
        })
      );
    } catch (error) {
      setDialog({
        status: "erro",
        contentMessage: "Erro ao excluir exercício!",
      });
      setShowDialog(true);
      setLoading(false);
    }
  };

  let idsGruposMusculares = [];
  treino.listaGruposMusculares.map((element) => {
    idsGruposMusculares.push(element.idGrupoMuscular);
  });

  let idsExercicios = [];
  treino.exercicios.map((element) => {
    idsExercicios.push(element.idExercicio);
  });

  let exerciciosEGruposMusculares = [];
  treino.exercicios.map((element) => {
    {
      exerciciosEGruposMusculares.push(element.idExercicio);
    }
  });

  const atualizarTreino = async () => {
    try {
      // navigation.navigate("SelecioneOsGruposMusculares", {
      //   treinoAserAtualizado: {
      //     idTreino: treino.idTreino,
      //     letraNomeTreino: treino.letraNomeTreino,
      //     exercicios: [...idsExercicios],
      //     gruposMusculares: treino.listaGruposMusculares,
      //   },
      // });
      navigation.navigate("SelecioneOsGruposMusculares", {
        treinoAserAtualizado: {
          idTreino: treino.idTreino,
          letraNomeTreino: treino.letraNomeTreino,
          idsExercicios: [...idsExercicios],
          gruposMusculares: treino.listaGruposMusculares,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const verDetalhesDoExercicio = (idExercicio) => {
    setIdExercicioAtual(idExercicio);
    setVerModalDetalhesExercicio(true);
  };

  useEffect(() => {
    return (cleanUp = () => {});
  }, []);

  return (
    <Container>
      <MainContentScroll>
        <GridLayout height="100%" padding="0">
          <DialogComponent
            {...dialog}
            visible={showDialog}
            setVisible={setShowDialog}
            setDialog={setDialog}
          />
          <MainContent>
            <ModalVideoExercicio
              visible={modalVideo.modal}
              setModalVideo={setModalVideo}
              modalVideo={modalVideo}
            />

            {verModalDetalhesExercicio && (
              <ModalDetalhesExercicio
                nomeExercicio={nomeExercicioSelecionado}
                exibeModal={verModalDetalhesExercicio}
                setExibeModal={setVerModalDetalhesExercicio}
                idExercicio={idExercicioAtual}
              />
            )}
            <LeftArrowAOrXComponent
              isBlue
              fieldMargin={`${heightStatusBar + 20}px 0 0 0`}
            />
            <Title text={"Treino " + treino.letraNomeTreino} />

            <FlatListComponent
              data={treino.listaGruposMusculares}
              keyExtractor={(item) => item.idGrupoMuscular}
              renderItem={({ item }) => (
                <>
                  <ContainerTextGrupo>
                    <TextGrupo>{item.nomeGrupoMuscular}</TextGrupo>
                  </ContainerTextGrupo>

                  <FlatListComponent
                    data={treino.exercicios}
                    keyExtractor={(itemEx) => itemEx.idExercicio}
                    renderItem={(itemExercicio) =>
                      itemExercicio.item.grupoMuscular.nomeGrupoMuscular ===
                        item.nomeGrupoMuscular && (
                        <CardExercicio
                          isCheckCard={false}
                          exercicio={itemExercicio.item}
                          setModalVideo={setModalVideo}
                          onPress={() => {
                            setNomeExercicioSelecionado(
                              itemExercicio.item.nomeExercicio
                            );
                            verDetalhesDoExercicio(
                              itemExercicio.item.idExercicio
                            );
                          }}
                        />
                      )
                    }
                  />
                </>
              )}
            />

            <View style={{ marginBottom: 80, marginTop: 30, gap: 30 }}>
              <ButtonComponentDefault
                statusButton
                text={"Atualizar treino"}
                onPress={atualizarTreino}
                disabled={loading}
              />

              <ButtonComponentDefault
                isDeleteButton
                statusButton
                text="Excluir treino"
                onPress={excluirTreino}
                disabled={loading}
              />
            </View>
          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default VisualizarTreinoScreen;
