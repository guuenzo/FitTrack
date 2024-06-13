import { View, Text, StyleSheet, StatusBar, Alert } from "react-native";
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
  const [idGrupo, setIdgrupo] = useState({ id1: "", id2: "", id3: "" })

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

  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelect = (itemId) => {
    setSelectedIds(prevState => {
      if (prevState.includes(itemId)) {
        const newSelectedIds = prevState.filter(id => id !== itemId);
        updateIdGrupo(newSelectedIds);
        return newSelectedIds;
      } else if (prevState.length < 3) {

        const newSelectedIds = [...prevState, itemId];
        updateIdGrupo(newSelectedIds);
        return newSelectedIds;
      } else {
        // Caso tente selecionar mais de 3 itens, exibe um alerta
        Alert.alert('Limite de seleção atingido', 'Você só pode selecionar até 3 itens.');
        return prevState;
      }
    })
  }

  const updateIdGrupo = (selectedIds) => {
    setIdgrupo({
      id1: selectedIds[0] || null,
      id2: selectedIds[1] || null,
      id3: selectedIds[2] || null,
    })
  }



  async function AddExercicios() {
    idGrupo.id1 ? navigation.navigate("SelecioneOsExercicios", { gruposSelecionados: idGrupo }) : Alert.alert('Selecione ao menos 1 treino');
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
          renderItem={({ item }) => grupoMuscAPI && <CardGrupoTreino
            selected={selectedIds.includes(item.id)}
            onPress={() => {
              {
                handleSelect(item.id)
                // setIdgrupo(prevState => {

                //   if (!idGrupo.id1) {
                //     return { ...prevState, id1: item.id }
                //   } else if (!idGrupo.id2) {
                //     return { ...prevState, id2: item.id }
                //   } else {
                //     return { ...prevState, id3: item.id }
                //   }
                // })
              }
            }}
            grupo={item.grupo} />}
        />
      </ContainerCard>

      <ButtonComponentDefault
        statusButton={true}
        onPress={AddExercicios}
        // onPress={() => console.log(idGrupo)}
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
