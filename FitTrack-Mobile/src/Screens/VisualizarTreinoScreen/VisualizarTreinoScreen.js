import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ContainerTreino } from "../TreinoScreen/style";
import {
  Container,
  GridLayout,
  MainContent,
  MainContentScroll,
} from "../../Components/Container/style";
import Title from "../../Components/Title/Title";
import { ContainerCardTreino } from "../../Components/CardTreino/style";
import FlatListComponent from "../../Components/FlatList/FlatList";
import CardTreino, {
  CardAddTreino,
} from "../../Components/CardTreino/CardTreino";
import Header from "../../Components/Header/Header";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";
import { StatusBar } from "react-native";
import { ContainerTextGrupo, TextGrupo } from "../SelecioneOsExerciciosScreen/style";

const VisualizarTreinoScreen = ({ route }) => {
  const heightStatusBar = StatusBar.currentHeight;
  const navigation = useNavigation();
  return (
    <Container>
      <MainContentScroll>
        <GridLayout height="100%" padding="0">
          <MainContent>

          <LeftArrowAOrXComponent
              isBlue
              fieldMargin={`${heightStatusBar + 20}px 0 0 0`}
            />
            <Title fieldMargin={"0 0 30px 0"} text={"Treino A"} />

            <ContainerTextGrupo>
                <TextGrupo>{"item"}</TextGrupo>
              </ContainerTextGrupo>

          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default VisualizarTreinoScreen;
