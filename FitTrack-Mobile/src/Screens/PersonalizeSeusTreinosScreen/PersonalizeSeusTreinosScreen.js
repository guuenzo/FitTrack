import { StyleSheet, StatusBar } from "react-native";
import React, { useState } from "react";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";
import Title from "../../Components/Title/Title";
import { CardPersonalizeTreino } from "../../Components/CardTreino/CardTreino";
import { ButtonComponentDefault } from "../../Components/Button/Button";
import { ContainerCard, ContainerPesonalizeTreino } from "./style";
import { useNavigation } from "@react-navigation/native";
import FlatListComponent from "../../Components/FlatList/FlatList";

const PersonalizeSeusTreinosScreen = () => {
  const heightStatusBar = StatusBar.currentHeight;
  const navigation = useNavigation();
  const [letraTreinoSelecionada, setLetraTreinoSelecionada] = useState({});
  const [treinos, setTreinos] = useState([
    { letra: "A" },
    { letra: "B" },
    { letra: "C" },
    { letra: "D" },
    { letra: "E" },
    { letra: "F" },
  ]);
  async function AddGrupo() {
    navigation.navigate("SelecioneOsGruposMusculares");
  }

  return (
    <ContainerPesonalizeTreino>
      <LeftArrowAOrXComponent
        isBlue
        fieldMargin={`${heightStatusBar + 20}px 0 0 15px`}
      />

      <Title text="Personalize seus treinos" />

      <ContainerCard marginbottom={"130px"} margintop={"150px"}>
        <FlatListComponent
          data={treinos}
          keyExtractor={(item) => Math.random()}
          contentContainerStyle={{
            alignItems: "space-evenly",
            gap: 30,
            paddingBottom: 20,
            paddingTop: 20,
          }}
          numColumns={2}
          renderItem={({ item }) => (
            <CardPersonalizeTreino
              selected={item === letraTreinoSelecionada}
              onPress={() => setLetraTreinoSelecionada(item)}
              letra={item.letra}
            />
          )}
        />
      </ContainerCard>

      <ButtonComponentDefault
        statusButton={true}
        onPress={AddGrupo}
        text="Confirmar"
      />
    </ContainerPesonalizeTreino>
  );
};

const styles = StyleSheet.create({
  column: {
    alignItems: "center", // Centraliza o conteúdo de cada coluna horizontalmente
    gap: 30,
  },
});

export default PersonalizeSeusTreinosScreen;
