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
  const [exeSelecionado, setExeSelecionado] = useState([{ exe: "", selecionado: false }])
  const [exercicios, setExercicios] = useState([
    { id: 0, exercicio: "supino", grupo: "Peito" },
    { id: 1, exercicio: "supino reto", grupo: "Peito" },
    { id: 2, exercicio: "supino inclinado", grupo: "Peito" },
    { id: 3, exercicio: "Triceps corda", grupo: "Triceps" },
    { id: 4, exercicio: "Triceps Francesa", grupo: "Triceps" },
    { id: 5, exercicio: "Triceps Testa", grupo: "Triceps" },
  ]);

  //Modais
  const [modalVideo, setModalVideo] = useState({ nomeExe: "", video: "", modal: false })
  const [modalCarga, setmodalCarga] = useState(false)
  const [grupos, setGrupos] = useState()
  const [exercicioApi, setExercicioApi] = useState([])

  const conjuntoUnico = new Set(exercicioApi.map((objeto) => objeto["grupo"]));

  // Converter o Set de volta para um array se necessário
  const arrayUnico = [...conjuntoUnico];

  async function GetExercicios() {
    //Chamando o metodo da api
    await api.get(exercicioResource + `?ids=${route.params.gruposSelecionados.id1}${route.params.gruposSelecionados.id2 ? `&ids=${route.params.gruposSelecionados.id2}` : ''}${route.params.gruposSelecionados.id3 ? `&ids=${route.params.gruposSelecionados.id3}` : ''}`).then(async (response) => {
      const exercicioApi = response.data.map(exercicio => ({
        exercicio: exercicio.nomeExercicio,
        grupo: exercicio.grupoMuscular.nomeGrupoMuscular,
        video: exercicio.midiaExercicio.videoExercicio

      }));
      setExercicioApi(exercicioApi);
      // console.log(response.data)
      // console.log(exercicioApi);
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    GetExercicios();

  }, []);
  useEffect(() => {
    setGrupos(route.params.gruposSelecionados)
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
                  itemExercicio.item.grupo === item && (exercicioApi &&
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
        onPress={() => console.log(grupos)}
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
