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
import { useNavigation } from "@react-navigation/native";

const SelecioneOsExerciciosScreen = ({ route }) => {
  const heightStatusBar = StatusBar.currentHeight;
  const { userGlobalData } = useContext(AuthContext);
  const navigation = useNavigation();

  const [checado, setChecado] = useState({});
  const [exercicios, setExercicios] = useState([]);
  const [exerciciosSelecionados, setExerciciosSelecionados] = useState([]);
  const [modalVideo, setModalVideo] = useState({
    nomeExe: "",
    video: "",
    modal: false,
  });

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

  const cadastrarTreino = async () => {
    try {
      let idsExerciciosSelecionados = exerciciosSelecionados.map((element) => ({
        idExercicio: element,
      }));

      const { status } = await api.post(`${treinoResource}/CadastrarTreino`, {
        idUsuario: userGlobalData.id,
        listaIdExercicios: idsExerciciosSelecionados,
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

  useEffect(() => {
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
              onPress={cadastrarTreino}
              text="Cadastrar"
            />
          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default SelecioneOsExerciciosScreen;
