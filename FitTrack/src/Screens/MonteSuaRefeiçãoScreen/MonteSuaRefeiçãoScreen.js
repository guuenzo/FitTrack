import React, { useState } from "react";
import {
  Container,
  GridLayout,
  MainContent,
  MainContentScroll,
} from "../../Components/Container/style";
import FlatListComponent from "../../Components/FlatList/FlatList";
import CardRefeicao from "../../Components/CardRefeicao/CardRefeicao";
import { useNavigation } from "@react-navigation/native";
import Title from "../../Components/Title/Title";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";

const MonteSuaRefeiçãoScreen = () => {
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
  const navigation = useNavigation();

  return (
    <Container>
      <MainContentScroll>
        <GridLayout>
          <MainContent>
            <LeftArrowAOrXComponent fieldMargin={"50px 0 0 0"} />
            <Title text={"Monte sua dieta"} />

            {/* <FlatListComponent
              data={refeicoes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CardRefeicao onPress={() => {}} />}
            /> */}
          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default MonteSuaRefeiçãoScreen;
