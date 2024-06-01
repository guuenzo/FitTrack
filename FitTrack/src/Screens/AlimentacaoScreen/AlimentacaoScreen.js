import { View, Text } from "react-native";
import React from "react";
import {
  Container,
  GridLayout,
  MainContent,
  MainContentScroll,
} from "../../Components/Container/style";

const AlimentacaoScreen = () => {
  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <GridLayout>
            <Text>Alimentacao</Text>
          </GridLayout>
        </MainContent>
      </MainContentScroll>
    </Container>
  );
};

export default AlimentacaoScreen;
