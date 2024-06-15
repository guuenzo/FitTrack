import React, { useState, useEffect, useContext } from "react";
import Header from "../../Components/Header/Header";
import Title from "../../Components/Title/Title";
import {
  Container,
  GridLayout,
  MainContent,
  MainContentScroll,
} from "../../Components/Container/style";
import FlatListComponent from "../../Components/FlatList/FlatList";
import CardTreino, {
  CardAddTreino,
} from "../../Components/CardTreino/CardTreino";
import { ContainerTreino } from "./style";
import { ContainerCardTreino } from "../../Components/CardTreino/style";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Contexts/AuthContext";
import { api, treinoResource } from "../../Services/Service";

const TreinosScreen = () => {
  const navigation = useNavigation();

  const [treinoSelecionado, setTreinoSelecionado] = useState({});

  const [treinos, setTreinos] = useState([]);

  const { userGlobalData, setUserGlobalData } = useContext(AuthContext);

  const AddTreino = async () => {
    // navigation.navigate("PersonalizeSeusTreinos");
    navigation.navigate("SelecioneOsGruposMusculares");
  };

  const visualizarTreino = (item) => {
    let exerciciosMapeados = item.exercicios.map((element) => ({
      idExercicio: element.idExercicio,
      nomeExercicio: element.nomeExercicio,
      descricao: element.descricao,
      videoExercicio: element.midiaExercicio.videoExercicio,
      grupoMuscular: element.grupoMuscular,
    }));

    let treinoAserVisualizado = {
      idTreino: item.idTreino,
      letraNomeTreino: item.letraNomeTreino,
      exercicios: exerciciosMapeados,
      listaGruposMusculares: item.listaGruposMusculares,
    };

    navigation.navigate("VisualizarTreino", { treino: treinoAserVisualizado });
  };

  const getTreinosUsuario = async () => {
    try {
      const { data, status } = await api.get(
        `${treinoResource}/ListarTodosOsTreinosDoUsuario?idUsuario=${userGlobalData.id}`
      );

      // Processar os dados recebidos para incluir o campo "textoGruposMusculares"
      const processedData = data.map((treino) => {
        const nomesGruposMusculares = treino.listaGruposMusculares.map(
          (grupo) => grupo.nomeGrupoMuscular
        );

        let textoGruposMusculares;
        if (nomesGruposMusculares.length > 1) {
          textoGruposMusculares =
            nomesGruposMusculares.slice(0, -1).join(", ") +
            " e " +
            nomesGruposMusculares.slice(-1);
        } else {
          textoGruposMusculares = nomesGruposMusculares[0];
        }

        return {
          ...treino,
          textoGruposMusculares,
        };
      });

      setTreinos(processedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTreinosUsuario();
    return (cleanUp = () => {});
  }, []);
  return (
    <ContainerTreino>
      <GridLayout height="100%" padding="0">
        <Header />

        <Title
          textAling="center"
          text={treinos.length !== 0 ? "Meus treinos" : "Monte seu treino"}
        />
        <ContainerCardTreino>
          <FlatListComponent
            data={treinos}
            keyExtractor={(item) => item.idTreino}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            numColumns={2}
            renderItem={({ item }) => (
              <CardTreino
                grupoMuscular={item.textoGruposMusculares}
                letraNomeTreino={item.letraNomeTreino}
                key={item.idTreino}
                onPress={() => visualizarTreino(item)}
              />
            )}
          />
          {treinos.length < 6 && <CardAddTreino onPress={AddTreino} />}
        </ContainerCardTreino>
      </GridLayout>
    </ContainerTreino>
  );
};

export default TreinosScreen;
