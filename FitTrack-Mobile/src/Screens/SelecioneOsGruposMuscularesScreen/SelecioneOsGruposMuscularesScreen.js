import { StatusBar, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";
import Title from "../../Components/Title/Title";
import { CardGrupoTreino } from "../../Components/CardTreino/CardTreino";
import { ButtonComponentDefault } from "../../Components/Button/Button";
import {
  ContainerCard,
  ContainerPesonalizeTreino,
} from "../PersonalizeSeusTreinosScreen/style";
import { useNavigation } from "@react-navigation/native";
import FlatListComponent from "../../Components/FlatList/FlatList";
import { api, grupoMuscularResource } from "../../Services/Service";
import DialogComponent from "../../Components/Dialog/Dialog";

const SelecioneOsGruposMuscularesScreen = ({ route }) => {
  const heightStatusBar = StatusBar.currentHeight;

  const [dialog, setDialog] = useState({});

  const [showDialog, setShowDialog] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [gruposMusculares, setGruposMusculares] = useState([]);
  const [gruposMuscularesSelecionados, setGruposMuscularesSelecionados] =
    useState(
      route.params.treinoAserAtualizado.idTreino
        ? route.params.treinoAserAtualizado.gruposMusculares
        : []
    );

  const handleSelect = (item) => {
    console.log(item);
    const isSelected = includesObject(gruposMuscularesSelecionados, item);

    if (isSelected) {
      setGruposMuscularesSelecionados(
        gruposMuscularesSelecionados.filter((grupo) => !isEqual(grupo, item))
      );
    } else {
      if (gruposMuscularesSelecionados.length < 2) {
        setGruposMuscularesSelecionados([
          ...gruposMuscularesSelecionados,
          item,
        ]);
      } else {
        setDialog({
          status: "alerta",
          contentMessage: "Selecione até 2 grupos musculares!",
        });
        setShowDialog(true);
      }
    }
  };

  const addExercicios = () => {
    if (gruposMuscularesSelecionados.length === 0) {
      setDialog({
        status: "alerta",
        contentMessage: "Selecione 1 grupo muscular pelo menos!",
      });
      setShowDialog(true);
      return;
    }

    navigation.navigate("SelecioneOsExercicios", {
      treino: { gruposMuscularesSelecionados: gruposMuscularesSelecionados },
      treinoAserAtualizado: { ...route.params.treinoAserAtualizado },
    });

    // console.log(gruposMuscularesSelecionados);
  };

  const getGruposMusculares = async () => {
    try {
      const { data } = await api.get(grupoMuscularResource);
      setGruposMusculares(data);
    } catch (error) {
    }
  };

  // Função para verificar se dois objetos são iguais
  const isEqual = (obj1, obj2) =>
    obj1.id === obj2.id && obj1.nomeGrupoMuscular === obj2.nomeGrupoMuscular;

  // Função para verificar se um array de objetos inclui um objeto
  const includesObject = (arr, obj) =>
    arr.some((element) => isEqual(element, obj));

  useEffect(() => {
    console.log(route.params.treinoAserAtualizado);
    getGruposMusculares();
  }, [gruposMuscularesSelecionados]);

  return (
    <ContainerPesonalizeTreino>
      <DialogComponent
        {...dialog}
        visible={showDialog}
        setVisible={setShowDialog}
        setDialog={setDialog}
      />
      <LeftArrowAOrXComponent
        isBlue
        fieldMargin={`${heightStatusBar + 20}px 0 0 15px`}
      />
      <Title text="Grupos musculares" />
      <ContainerCard>
        <FlatListComponent
          data={gruposMusculares}
          keyExtractor={(item) => item.idGrupoMuscular.toString()}
          contentContainerStyle={{
            alignItems: "center",
            gap: 30,
            paddingBottom: 20,
            paddingTop: 20,
          }}
          numColumns={2}
          renderItem={({ item }) =>
            gruposMusculares && (
              <CardGrupoTreino
                selected={includesObject(gruposMuscularesSelecionados, item)}
                onPress={() => handleSelect(item)}
                grupo={item.nomeGrupoMuscular}
              />
            )
          }
        />
      </ContainerCard>
      <ButtonComponentDefault
        statusButton={true}
        onPress={addExercicios}
        text="Confirmar"
      />
    </ContainerPesonalizeTreino>
  );
};

export default SelecioneOsGruposMuscularesScreen;
