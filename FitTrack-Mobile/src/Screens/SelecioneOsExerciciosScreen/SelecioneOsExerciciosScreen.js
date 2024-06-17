import { Alert, StatusBar } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";
import Title from "../../Components/Title/Title";
import { ButtonComponentDefault } from "../../Components/Button/Button";
import { ContainerTextGrupo, TextGrupo } from "./style";
import { CardExercicio } from "../../Components/CardTreino/CardTreino";
import FlatListComponent from "../../Components/FlatList/FlatList";
import { api, exercicioResource, treinoResource } from "../../Services/Service";
import { ModalVideoExercicio } from "../../Components/Modal/Modal";
import {
  Container,
  GridLayout,
  MainContent,
  MainContentScroll,
} from "../../Components/Container/style";
import { AuthContext } from "../../Contexts/AuthContext";
import { CommonActions, useNavigation } from "@react-navigation/native";

const SelecioneOsExerciciosScreen = ({ route }) => {
  const heightStatusBar = StatusBar.currentHeight;
  const { userGlobalData } = useContext(AuthContext);
  const navigation = useNavigation();

  const [checado, setChecado] = useState({});
  const [exercicios, setExercicios] = useState([]);
  const [exerciciosSelecionados, setExerciciosSelecionados] = useState(
    route.params.treinoAserAtualizado.idTreino
      ? route.params.treinoAserAtualizado.idsExercicios
      : []
  );
  const [modalVideo, setModalVideo] = useState({
    nomeExe: "",
    video: "",
    modal: false,
  });

  useEffect(() => {
    // Inicializa o estado 'checado' com base nos exercícios selecionados vindos do route.params
    const inicializarChecado = () => {
      const checadoInicial = {};
      exerciciosSelecionados.forEach((idExercicio) => {
        checadoInicial[idExercicio] = true;
      });
      setChecado(checadoInicial);
    };

    inicializarChecado();
  }, [exerciciosSelecionados]);

  const handleSelect = (item) => {
    const isSelected = exerciciosSelecionados.includes(item.idExercicio);

    if (isSelected) {
      setExerciciosSelecionados(
        exerciciosSelecionados.filter((id) => id !== item.idExercicio)
      );
      setChecado({ ...checado, [item.idExercicio]: false });
    } else {
      setExerciciosSelecionados([...exerciciosSelecionados, item.idExercicio]);
      setChecado({ ...checado, [item.idExercicio]: true });
    }
  };

  const extrairIdDosExercicios = (array = []) =>
    array.map((element) => ({
      idExercicio: element,
    }));

  const cadastrarTreino = async () => {
    try {
      const { status } = await api.post(`${treinoResource}/CadastrarTreino`, {
        idUsuario: userGlobalData.id,
        listaIdExercicios: extrairIdDosExercicios(exerciciosSelecionados),
      });

      if (status === 201) {
        Alert.alert("Sucesso!");
        navigation.replace("Main", { indice: 1 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getExercicios = async () => {
    try {
      const { data } = await api.get(
        `${exercicioResource}/ListarPorGrupoMuscular?ids=${
          route.params.treino.gruposMuscularesSelecionados.length === 2
            ? route.params.treino.gruposMuscularesSelecionados[0]
                .idGrupoMuscular +
              "&ids=" +
              route.params.treino.gruposMuscularesSelecionados[1]
                .idGrupoMuscular
            : route.params.treino.gruposMuscularesSelecionados[0]
                .idGrupoMuscular
        }`
      );
      let exerciciosFormatados = data.map((element) => ({
        idExercicio: element.idExercicio,
        nomeExercicio: element.nomeExercicio,
        grupo: element.grupoMuscular.nomeGrupoMuscular,
        videoExercicio: element.midiaExercicio.videoExercicio,
      }));
      setExercicios(exerciciosFormatados);
    } catch (error) {
      console.log(error);
    }
  };

  const atualizarTreino = async () => {
    try {
      const { status } = await api.put(
        `${treinoResource}/AtulizarTreino?idTreino=${route.params.treinoAserAtualizado.idTreino}`,
        {
          listaExercicios: extrairIdDosExercicios(exerciciosSelecionados),
        }
      );

      if (status === 204) {
        Alert.alert("Atualizado!");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Main", params: { indice: 1 } }],
          })
        );
      }
      console.log("...extrairIdDosExercicios(exerciciosSelecionados)");
      console.log(route.params.treinoAserAtualizado.idTreino);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("route.params.treinoAserAtualizado");
    // console.log(route.params.treinoAserAtualizado);
    // console.log("route.params.treino");
    // console.log(route.params.treino);

    // console.log("exerciciosSelecionados");
    // console.log(exerciciosSelecionados);
    getExercicios();
  }, []);

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
            <Title
              fieldMargin={"20px 0 0px 0"}
              text="Escolha seus exercícios"
            />
            <FlatListComponent
              data={route.params.treino.gruposMuscularesSelecionados}
              keyExtractor={(item) => item.idGrupoMuscular}
              renderItem={({ item }) => (
                <>
                  <ContainerTextGrupo>
                    <TextGrupo>{item.nomeGrupoMuscular}</TextGrupo>
                  </ContainerTextGrupo>
                  <FlatListComponent
                    data={exercicios}
                    keyExtractor={(itemEx) => itemEx.idExercicio}
                    renderItem={(itemEx) =>
                      itemEx.item.grupo === item.nomeGrupoMuscular && (
                        <CardExercicio
                          onPress={() => handleSelect(itemEx.item)}
                          selected={checado[itemEx.item.idExercicio] || false}
                          exercicio={itemEx.item}
                          setModalVideo={setModalVideo}
                        />
                      )
                    }
                  />
                </>
              )}
            />
            <ButtonComponentDefault
              statusButton={true}
              fieldMargin={"15px 0"}
              marginBottom={"60px"}
              onPress={
                route.params.treinoAserAtualizado.idTreino
                  ? atualizarTreino
                  : cadastrarTreino
              }
              text={
                route.params.treinoAserAtualizado.idTreino
                  ? "Atualizar treino"
                  : "Cadastrar treino"
              }
            />
          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default SelecioneOsExerciciosScreen;
