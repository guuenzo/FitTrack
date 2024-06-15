import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";
import Title from "../../Components/Title/Title";
import { ButtonComponentDefault } from "../../Components/Button/Button";
import { ContainerPesonalizeTreino } from "../PersonalizeSeusTreinosScreen/style";
import { ContainerExercicios, ContainerTextGrupo, TextGrupo } from "./style";
import {
  CardExercicio,
  CardGrupoTreino,
} from "../../Components/CardTreino/CardTreino";
import FlatListComponent from "../../Components/FlatList/FlatList";
import { api, exercicioResource } from "../../Services/Service";
import { ModalVideoExercicio } from "../../Components/Modal/Modal";

const SelecioneOsExerciciosScreen = ({ route }) => {
  const heightStatusBar = StatusBar.currentHeight;
  const [exeSelecionado, setExeSelecionado] = useState([
    { exe: "", selecionado: false },
  ]);

  const [exercicios, setExercicios] = useState([]);

  //Modais
  const [modalVideo, setModalVideo] = useState({
    nomeExe: "",
    video: "",
    modal: false,
  });
  const [modalCarga, setmodalCarga] = useState(false);
  const [grugruposMuscularespos, setGruposMusculares] = useState([]);

  const conjuntoUnico = new Set(exercicios.map((objeto) => objeto["grupo"]));

  // Converter o Set de volta para um array se necessário
  const arrayUnico = [...conjuntoUnico];

  const getExercicios = async () => {
    try {
      const { data, status } = await api.get(
        `${exercicioResource}?ids=${route.params.gruposSelecionados.id1}=${
          route.params.gruposSelecionados.id2
            ? route.params.gruposSelecionados.id2
            : ""
        }=${
          route.params.gruposSelecionados.id3
            ? route.params.gruposSelecionados.id3
            : ""
        }`
      );
      console.log(data);

      let exerciciosFormatados = data.map((element) => ({
        exercicio: element.nomeExercicio,
        grupo: element.grupoMuscular.nomeGrupoMuscular,
        video: element.midiaExercicio.videoExercicio,
      }));
      setExercicios(exerciciosFormatados);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExercicios();
  }, []);
  useEffect(() => {
    console.log(route.params.treino.gruposSelecionados);
  }, []);

  return (
    <ContainerPesonalizeTreino>
      <LeftArrowAOrXComponent
        isBlue
        fieldMargin={`${heightStatusBar + 20}px 0 0 15px`}
      />
      <Title text="Escolha seus exercicios" />
      <ContainerExercicios showsVerticalScrollIndicator={false}>
        <FlatListComponent
          data={arrayUnico}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <>
              <ContainerTextGrupo>
                <TextGrupo>{item}</TextGrupo>
              </ContainerTextGrupo>

              <FlatListComponent
                data={exercicioApi}
                keyExtractor={(itemEx) => itemEx.id}
                renderItem={(itemExercicio) =>
                  itemExercicio.item.grupo === item &&
                  exercicioApi && (
                    <CardExercicio
                      exercicio={itemExercicio.item}
                      setModalVideo={setModalVideo}
                      setExeSelecionado={setExeSelecionado}
                    />
                  )
                }
              />
            </>
          )}
        />
      </ContainerExercicios>

      <ButtonComponentDefault
        statusButton={true}
        marginBottom={"7%"}
        onPress={() => console.log(gruposMusculares)}
        text="Confirmar"
      />

      <ModalVideoExercicio
        visible={modalVideo.modal}
        setModalVideo={setModalVideo}
        modalVideo={modalVideo}
      />
    </ContainerPesonalizeTreino>
  );
};

export default SelecioneOsExerciciosScreen;
