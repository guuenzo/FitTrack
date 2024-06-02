import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Title from "../../Components/Title/Title";
import {
  Container,
  GridLayout,
  MainContent,
  MainContentScroll,
} from "../../Components/Container/style";
import FlatListComponent from "../../Components/FlatList/FlatList";

const TreinosScreen = () => {
  const [treinos, setTreinos] = useState([]);
  useEffect(() => {
    return (cleanUp = () => {});
  }, []);
  return (
    <Container>
      <MainContentScroll>
        <GridLayout>
          <MainContent>
            <Header />

            <Title
              text={treinos.length !== 0 ? "Meus treinos" : "Monte seu treino"}
            />

            <FlatListComponent
              data={treinos}
              // keyExtractor={(item) => item.id}
              // renderItem={({ item }) =>
              //   refeicoes.length < 6 && (
              //     <CardRefeicao
              //       onPress={() => navigation.navigate("MonteSuaRefeição")}
              //     />
              //   )
              // }
            />
          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default TreinosScreen;
