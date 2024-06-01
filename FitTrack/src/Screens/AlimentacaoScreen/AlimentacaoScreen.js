import { View, Text } from "react-native";
import React from "react";
import {
  Container,
  GridLayout,
  MainContent,
  MainContentScroll,
} from "../../Components/Container/style";
import Header from "../../Components/Header/Header";

const AlimentacaoScreen = () => {
  return (
    <Container>
      <MainContentScroll>
        <GridLayout>
          <MainContent>
            <Header />
          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default AlimentacaoScreen;
