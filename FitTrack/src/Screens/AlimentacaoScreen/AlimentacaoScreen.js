import React, { useState } from "react";
import {
  Container,
  GridLayout,
  MainContent,
  MainContentScroll,
} from "../../Components/Container/style";
import Header from "../../Components/Header/Header";
import Title from "../../Components/Title/Title";
import CardRefeicao, {
  CardAdicionarRefeicao,
} from "../../Components/CardRefeicao/CardRefeicao";
import { useNavigation } from "@react-navigation/native";
import FlatListComponent from "../../Components/FlatList/FlatList";

const AlimentacaoScreen = () => {
  const navigation = useNavigation();
  const [refeicoes, setRefeicoes] = useState([
    {
      id: 1,
      nome: "Refeição 1",
    },
    {
      id: 2,
      nome: "Refeição 2",
    },
    {
      id: 3,
      nome: "Refeição 3",
    },
    {
      id: 4,
      nome: "Refeição 4",
    },
    {
      id: 5,
      nome: "Refeição 5",
    },
    // {
    //   id: 6,
    //   nome: "Refeição 6",
    // },
  ]);
  return (
    <Container>
      <MainContentScroll>
        <GridLayout>
          <MainContent>
            <Header />

            <Title
              text={refeicoes.length !== 0 ? "Alimentação" : "Monte sua dieta"}
            />

            <FlatListComponent
              data={refeicoes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) =>
                refeicoes.length < 6 && (
                  <CardRefeicao
                    isRefeicao
                    onPress={() => navigation.navigate("MonteSuaRefeição")}
                  />
                )
              }
            />

            <CardAdicionarRefeicao
              onPress={() => navigation.navigate("MonteSuaRefeição")}
            />
          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default AlimentacaoScreen;
