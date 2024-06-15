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
import { ModalVideoExercicio } from "../../Components/Modal/Modal";

const VisualizarTreinoScreen = ({ route }) => {
  const heightStatusBar = StatusBar.currentHeight;
  const navigation = useNavigation();
  const [modalVideo, setModalVideo] = useState({
    nomeExe: "",
    video: "",
    modal: false,
  });
  const [exeSelecionado, setExeSelecionado] = useState([
    { exe: "", selecionado: false },
  ]);
  const [modalCarga, setmodalCarga] = useState(false);

  const [treino, setTreino] = useState(
    route.params.treino.idTreino
      ? route.params.treino
      : {
          // idTreino: "fc35bb4b-4eb9-4048-a819-5cf7648b1529",
          // letraNomeTreino: "C",
          // idUsuario: "c6749ab0-b410-40fe-b4c1-1d3b0166160e",
          // exercicios: [
          //   {
          //     idExercicio: "2cb9222f-5f0c-4db6-950e-075f48798689",
          //     nomeExercicio: "Tríceps Corda",
          //     descricao:
          //       "Exercício de tríceps na corda para fortalecer os tríceps.",
          //     grupoMuscular: {
          //       idGrupoMuscular: "0e5430fb-d265-4be3-97fe-487a939e1f40",
          //       nomeGrupoMuscular: "Tríceps",
          //     },
          //     midiaExercicio: {
          //       idMidiaExercicio: "bdc5f542-33a6-4dd3-acd6-bd5ce767d614",
          //       videoExercicio:
          //         "https://blobvitalhubg16enzo.blob.core.windows.net/containerfittrack/triceps-corda.webp",
          //     },
          //   },
          //   {
          //     idExercicio: "74bf86ee-f4da-4d3e-8c8b-dab29e7dad10",
          //     nomeExercicio: "Puxada Alta",
          //     descricao: "Exercício de puxada alta para fortalecer as costas.",
          //     grupoMuscular: {
          //       idGrupoMuscular: "5b8fbce6-ddf3-473b-9297-2bf9c6eac112",
          //       nomeGrupoMuscular: "Costas",
          //     },
          //     midiaExercicio: {
          //       idMidiaExercicio: "7fa44630-b203-48b3-82f9-5e1797bdb8e1",
          //       videoExercicio:
          //         "https://blobvitalhubg16enzo.blob.core.windows.net/containerfittrack/costas-puxada-alta.gif",
          //     },
          //   },
          //   {
          //     idExercicio: "52c4d778-58f8-43d0-a8d0-63c23700c972",
          //     nomeExercicio: "Remada Curvada",
          //     descricao:
          //       "Exercício de remada curvada para fortalecer as costas.",
          //     grupoMuscular: {
          //       idGrupoMuscular: "5b8fbce6-ddf3-473b-9297-2bf9c6eac112",
          //       nomeGrupoMuscular: "Costas",
          //     },
          //     midiaExercicio: {
          //       idMidiaExercicio: "1e0ddaf1-a29e-4d43-a547-61911f9460ca",
          //       videoExercicio:
          //         "https://blobvitalhubg16enzo.blob.core.windows.net/containerfittrack/costas-remada-curvada.webp",
          //     },
          //   },
          // ],
          // listaGruposMusculares: [
          //   {
          //     idGrupoMuscular: "0e5430fb-d265-4be3-97fe-487a939e1f40",
          //     nomeGrupoMuscular: "Tríceps",
          //   },
          //   {
          //     idGrupoMuscular: "5b8fbce6-ddf3-473b-9297-2bf9c6eac112",
          //     nomeGrupoMuscular: "Costas",
          //   },
          // ],
        }
  );

  const excluirTreino = async () => {
    try {
      await api.delete(
        `${treinoResource}/ExcluirTreino?id=${route.params.treino.idTreino}`
      );

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Main", params: { indice: 1 } }],
        })
      );
    } catch (error) {
      console.log(error);
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

  const atualizarTreino = async () => {
    try {
      navigation.navigate("SelecioneOsGruposMusculares", {
        treinoAserAtualizado: {
          idTreino: treino.idTreino,
          letraNomeTreino: treino.letraNomeTreino,
          idUsuario: treino.idUsuario,
          idsExercicios: [...idsExercicios],
          idsGruposMusculares: [...idsGruposMusculares],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <MainContentScroll>
        <GridLayout height="100%" padding="0">
          <MainContent>
            <ModalVideoExercicio
              visible={modalVideo.modal}
              setModalVideo={setModalVideo}
              modalVideo={modalVideo}
            />
            <LeftArrowAOrXComponent
              isBlue
              fieldMargin={`${heightStatusBar + 20}px 0 0 0`}
            />
            <Title text={"Treino " + treino.letraNomeTreino} />

            {/* <ContainerExercicios
              fieldWidth={"100%"}
              showsVerticalScrollIndicator={false}
            > */}
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
                        // exercicioApi &&
                        <CardExercicio
                          isCheckCard={false}
                          exercicio={itemExercicio.item}
                          setModalVideo={setModalVideo}
                          onPress={() => console.log("first")}
                        />
                      )
                    }
                  />
                </>
              )}
            />
            {/* </ContainerExercicios> */}

            <View style={{ marginBottom: 80, marginTop: 30, gap: 30 }}>
              <ButtonComponentDefault
                statusButton
                text={"Atualizar"}
                onPress={atualizarTreino}
              />

              <ButtonComponentDefault
                isDeleteButton
                statusButton
                text="Excluir treino"
                onPress={excluirTreino}
              />
            </View>
          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default VisualizarTreinoScreen;
