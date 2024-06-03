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
import CardTreino from "../../Components/CardTreino/CardTreino";
import { ContainerTreino } from "../../Components/CardTreino/style";


const TreinosScreen = () => {
  const [treinos, setTreinos] = useState([
    { id: "a", grupo: "Peito, Triceps" }, { id: "b", grupo: "Costas" }
  ]);

  useEffect(() => {
    return (cleanUp = () => { });
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
            <ContainerTreino>

              <FlatListComponent
                data={treinos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                (
                  <CardTreino text={item} />
                )
                }
              />
            </ContainerTreino>
          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default TreinosScreen;
