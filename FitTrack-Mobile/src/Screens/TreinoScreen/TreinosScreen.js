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

  const [treinos, setTreinos] = useState([
    { id: "A", grupo: "Peito, Triceps" },
    { id: "B", grupo: "Costas" },
    { id: "C", grupo: "Peito, Triceps" },
    { id: "D", grupo: "Costas" },
  ]);

  const { userGlobalData, setUserGlobalData } = useContext(AuthContext);

  const AddTreino = async () => {
    navigation.navigate("PersonalizeSeusTreinos");
  };

  const visualizarTreino = () => {

    navigation.navigate("VisualizarTreino");
  };

  const getTreinosUsuario = async () => {
    try {
      const { data, status } = await api.get(
        `${treinoResource}/ListarTodosOsTreinosDoUsuario?idUsuario=${userGlobalData.id}`
      );
      console.log(data)
      setTreinos(data);
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
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            numColumns={2}
            renderItem={({ item }) => (
              <CardTreino text={item.letraNomeTreino} key={item.idTreino} onPress={visualizarTreino} />
            )}
          />
          {treinos.length < 6 && <CardAddTreino onPress={AddTreino} />}
        </ContainerCardTreino>
      </GridLayout>
    </ContainerTreino>
  );
};

export default TreinosScreen;
