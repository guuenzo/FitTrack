import { View, Text, StyleSheet, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";
import Title from "../../Components/Title/Title";
import {
  CardGrupoTreino,
  CardPersonalizeTreino,
} from "../../Components/CardTreino/CardTreino";
import {
  ButtonComponent,
  ButtonComponentDefault,
  ButtonLoginCriarContaBox,
} from "../../Components/Button/Button";
import {
  ContainerCard,
  ContainerPesonalizeTreino,
} from "../PersonalizeSeusTreinosScreen/style";
import { useNavigation } from "@react-navigation/native";
import FlatListComponent from "../../Components/FlatList/FlatList";
import { api, grupoMuscularResource } from "../../Services/Service";

const SelecioneOsGruposMuscularesScreen = () => {
  const heightStatusBar = StatusBar.currentHeight;

  const navigation = useNavigation();
  const [grupoMuscAPI, setGrupoMuscApi] = useState([])
  const [gruposMusculares, setGruposMusculares] = useState([
    { id: 1, grupo: "Peito" },
    { grupo: "Biceps" },
    { grupo: "Triceps" },
    { grupo: "Glúteo" },
    { grupo: "Abdômen" },
    { grupo: "Costas" },
    { grupo: "Ombro" },
    { grupo: "Quadriceps" },
    { grupo: "Posterior de coxa" },
  ]);

  async function AddExercicios() {
    navigation.navigate("SelecioneOsExercicios");
  }

  async function GetGrupoMuscular() {
    //Chamando o metodo da api
    await api.get(grupoMuscularResource)
      .then(async (response) => {
        const grupoApi = response.data.map(x => ({
          id: x.idGrupoMuscular,
          grupo: x.nomeGrupoMuscular

        }));
        setGrupoMuscApi(grupoApi);
        // console.log(grupoMuscAPI);
      }).catch(error => {
        console.log(error)
      })

  }

  useEffect(() => {
    GetGrupoMuscular();
  }, []);
  return (
    <ContainerPesonalizeTreino>
      <LeftArrowAOrXComponent
        isBlue
        fieldMargin={`${heightStatusBar + 20}px 0 0 15px`}
      />

      <Title text="Grupos musculares" />

      <ContainerCard>
        {/* <View style={styles.column} >
          <CardGrupoTreino grupo={"Peito"} />
          <CardGrupoTreino grupo={"Biceps"} />
          <CardGrupoTreino grupo={"Triceps"} />
          <CardGrupoTreino grupo={"Glúteo"} />
          <CardGrupoTreino grupo={"Abdômen"} />
        </View>

        <View style={styles.column} >
          <CardGrupoTreino grupo={"Costas"} />
          <CardGrupoTreino grupo={"Ombro"} />
          <CardGrupoTreino grupo={"Quadriceps"} />
          <CardGrupoTreino grupo={"Posterior de coxa"} />
        </View> */}
        <FlatListComponent
          data={grupoMuscAPI}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            alignItems: "space-evenly",
            gap: 30,
            paddingBottom: 20,
            paddingTop: 20,
          }}
          numColumns={2}
          renderItem={({ item }) => grupoMuscAPI && <CardGrupoTreino grupo={item.grupo} />}
        />
      </ContainerCard>

      <ButtonComponentDefault
        statusButton={true}
        onPress={AddExercicios}
        text="Confirmar"
      />
    </ContainerPesonalizeTreino>
  );
};
// const styles = StyleSheet.create({
//   column: {
//     alignItems: 'center', // Centraliza o conteúdo de cada coluna horizontalmente
//     gap: 30,
//     // borderWidth: 1,
//   },
// });

export default SelecioneOsGruposMuscularesScreen;
