import React, { useState, useEffect, useContext } from "react";
import Header from "../../Components/Header/Header";
import Title from "../../Components/Title/Title";
import {
  Container,
  GridLayout,
  MainContentScroll,
} from "../../Components/Container/style";
import FlatListComponent from "../../Components/FlatList/FlatList";
import CardTreino, {
  CardAddTreino,
} from "../../Components/CardTreino/CardTreino";
import { ContainerCardTreino } from "../../Components/CardTreino/style";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Contexts/AuthContext";
import { api, treinoResource } from "../../Services/Service";
import TooltipComponent from "../../Components/Tooltip/Tooltip";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const TreinosScreen = () => {
  const navigation = useNavigation();

  const [treinoSelecionado, setTreinoSelecionado] = useState({});

  const [treinos, setTreinos] = useState([]);

  const { userGlobalData, setUserGlobalData } = useContext(AuthContext);

  const AddTreino = async () => {
    // navigation.navigate("PersonalizeSeusTreinos");
    navigation.navigate("SelecioneOsGruposMusculares", {
      treinoAserAtualizado: {},
    });
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
    <Container>
      <MainContentScroll>
        <GridLayout height="100%" padding="0">
          <Header />

          <Title
            textAling="center"
            text={treinos.length !== 0 ? "Meus treinos" : "Monte seu treino"}
          />
          <ContainerCardTreino>
            {/* <FlatListComponent
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
            /> */}

            <View style={styles.cardsContainer}>
              {treinos.map((item) => (
                <CardTreino
                  key={item.idTreino}
                  grupoMuscular={item.textoGruposMusculares}
                  letraNomeTreino={item.letraNomeTreino}
                  onPress={() => visualizarTreino(item)}
                />
              ))}
              {treinos.length < 6 && <CardAddTreino onPress={AddTreino} />}
            </View>
            {/* {treinos.length < 6 && <CardAddTreino onPress={AddTreino} />} */}
          </ContainerCardTreino>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default TreinosScreen;

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    // backgroundColor: "red",
  },
});
