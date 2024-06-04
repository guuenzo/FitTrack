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
import CardTreino, { CardAddTreino } from "../../Components/CardTreino/CardTreino";
import { ContainerTreino } from "./style";
import { ContainerCardTreino } from "../../Components/CardTreino/style";


const TreinosScreen = () => {
  const [treinos, setTreinos] = useState([
    { id: "A", grupo: "Peito, Triceps" }, { id: "B", grupo: "Costas" },
    { id: "C", grupo: "Peito, Triceps" }, { id: "D", grupo: "Costas" }
  ]);

  useEffect(() => {
    return (cleanUp = () => { });
  }, []);
  return (


    <ContainerTreino>


      <Header />

      <Title
        text={treinos.length !== 0 ? "Meus treinos" : "Monte seu treino"}
      />
      <ContainerCardTreino>

        <FlatListComponent
          data={treinos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          numColumns={2}
          renderItem={({ item }) =>


          (
            <CardTreino text={item} />
          )
          }
        />
        <CardAddTreino />



      </ContainerCardTreino>


    </ContainerTreino>


  );
};

export default TreinosScreen;
