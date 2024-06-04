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
import { StatusBar, View } from "react-native";
import { DropDownComponent } from "../../Components/Input/Input";
import InfoGlobalBoxComponent, {
  MacronutrientesRefeicaoBox,
} from "./InfoGlobal";
import { ButtonComponentDefault } from "../../Components/Button/Button";

const MonteSuaRefeiçãoScreen = () => {
  const heightStatusBar = StatusBar.currentHeight;

  const [refeicoes, setRefeicoes] = useState([
    {
      id: 1,
      nome: "Refeição 1",
    },
    {
      id: 2,
      nome: "Refeição 2",
    },
  ]);
  const navigation = useNavigation();

  return (
    <Container>
      <MainContentScroll>
        <GridLayout>
          <MainContent>
            <LeftArrowAOrXComponent
              isBlue
              fieldMargin={`${heightStatusBar + 20}px 0 0 0`}
            />
            <Title fieldMargin={"0 0 30px 0"} text={"Monte sua dieta"} />

            <DropDownComponent />

            <InfoGlobalBoxComponent />

            <MacronutrientesRefeicaoBox />

            <FlatListComponent
              data={refeicoes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CardRefeicao
                  onPressDeletar={() => {
                    setRefeicoes(refeicoes.filter((x) => x.id === item.id));
                    console.log(item.id);
                  }}
                  onPress={() => {}}
                />
              )}
            />

            <View style={{ marginBottom: 80, marginTop: 30, gap: 30 }}>
              <ButtonComponentDefault
                statusButton
                text="confirmar"
                onPress={() => {
                  navigation.replace("Main", { indice: 0 });
                }}
              />
              <ButtonComponentDefault
                statusButton
                text="adicionar"
                onPress={() => {
                  setRefeicoes([
                    ...refeicoes,
                    {
                      id: Math.random(),
                      nome: "refeicaio",
                    },
                  ]);
                }}
              />
            </View>
          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default MonteSuaRefeiçãoScreen;
