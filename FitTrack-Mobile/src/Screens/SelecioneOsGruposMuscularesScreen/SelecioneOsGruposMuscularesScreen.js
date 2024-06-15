import { StatusBar, Alert } from "react-native";
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

const SelecioneOsGruposMuscularesScreen = ({ route }) => {
  const heightStatusBar = StatusBar.currentHeight;

  const navigation = useNavigation();
  const [gruposMusculares, setGruposMusculares] = useState([]);
  const [idGrupo, setIdgrupo] = useState({ id1: "", id2: "", id3: "" });

  const [gruposMuscularesSelecionados, setGruposMuscularesSelecionados] =
    useState([]);

  const handleSelect = (itemId) => {
    setGruposMuscularesSelecionados((prevState) => {
      if (prevState.includes(itemId)) {
        const newSelectedIds = prevState.filter((id) => id !== itemId);
        updateIdGrupo(newSelectedIds);
        return newSelectedIds;
      } else if (prevState.length < 3) {
        const newSelectedIds = [...prevState, itemId];
        updateIdGrupo(newSelectedIds);
        return newSelectedIds;
      } else {
        // Caso tente selecionar mais de 3 itens, exibe um alerta
        Alert.alert(
          "Limite de seleção atingido",
          "Você só pode selecionar até 3 itens."
        );
        return prevState;
      }
    });
  };

  const updateIdGrupo = (selectedIds) => {
    setIdgrupo({
      idGrupo1: selectedIds[0] || null,
      idGrupo2: selectedIds[1] || null,
      idGrupo3: selectedIds[2] || null,
    });
  };

  async function AddExercicios() {
    idGrupo.idGrupo1
      ? navigation.navigate("SelecioneOsExercicios", {
          treino: { gruposSelecionados: idGrupo },
        })
      : Alert.alert("Selecione ao menos 1 treino");
  }

  const getGruposMusculares = async () => {
    try {
      const { data } = await api.get(grupoMuscularResource);
      setGruposMusculares(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGruposMusculares();
  }, []);
  return (
    <ContainerPesonalizeTreino>
      <LeftArrowAOrXComponent
        isBlue
        fieldMargin={`${heightStatusBar + 20}px 0 0 15px`}
      />

      <Title text="Grupos musculares" />

      <ContainerCard>
        <FlatListComponent
          data={gruposMusculares}
          keyExtractor={(item) => item.idGrupoMuscular}
          contentContainerStyle={{
            alignItems: "space-evenly",
            gap: 30,
            paddingBottom: 20,
            paddingTop: 20,
          }}
          numColumns={2}
          renderItem={({ item }) =>
            gruposMusculares && (
              <CardGrupoTreino
                selected={gruposMuscularesSelecionados.includes(
                  item.idGrupoMuscular
                )}
                onPress={() => {
                  {
                    handleSelect(item.idGrupoMuscular);
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
                grupo={item.nomeGrupoMuscular}
              />
            )
          }
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

export default SelecioneOsGruposMuscularesScreen;
