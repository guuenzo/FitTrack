import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";
import Title from "../../Components/Title/Title";
import { CardPersonalizeTreino } from "../../Components/CardTreino/CardTreino";
import {
  ButtonComponent,
  ButtonComponentDefault,
  ButtonLoginCriarContaBox,
} from "../../Components/Button/Button";
import { ContainerCard, ContainerPesonalizeTreino } from "./style";
import { useNavigation } from "@react-navigation/native";
import FlatListComponent from "../../Components/FlatList/FlatList";

const PersonalizeSeusTreinosScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(false);
  const [treinos, setTreinos] = useState([
    { letra: "A", grupo: "" },
    { letra: "B", grupo: "" },
    { letra: "C", grupo: "" },
    { letra: "D", grupo: "" },
    { letra: "E", grupo: "" },
    { letra: "F", grupo: "" },
  ]);
  async function AddGrupo() {
    navigation.navigate("SelecioneOsGruposMusculares");
  }

  return (
    <ContainerPesonalizeTreino>
      <LeftArrowAOrXComponent fieldMargin={"50px 0 0 0"} />

      <Title text="Personalize seus treinos" />

      <ContainerCard marginbottom={"130px"} margintop={"150px"}>
        {/* <View style={styles.column} >
          <CardPersonalizeTreino letra={"A"} onPress={() => selected ? setSelected(false) : setSelected(true)} selected={selected} />
          <CardPersonalizeTreino letra={"C"} />
          <CardPersonalizeTreino letra={"E"} />
        </View>

        <View style={styles.column} >
          <CardPersonalizeTreino letra={"B"} />
          <CardPersonalizeTreino letra={"D"} />
          <CardPersonalizeTreino letra={"F"} />
        </View> */}
        <FlatListComponent
          data={treinos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            alignItems: "space-evenly",
            gap: 30,
            paddingBottom: 20,
            paddingTop: 20,
          }}
          numColumns={2}
          renderItem={({ item }) => (
            <CardPersonalizeTreino letra={item.letra} />
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
