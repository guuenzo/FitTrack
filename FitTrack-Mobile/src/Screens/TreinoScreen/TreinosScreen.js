import React, { useState, useEffect, useContext } from "react";
import Header from "../../Components/Header/Header";
import Title from "../../Components/Title/Title";
import {
  Container,
  GridLayout,
  MainContent,
  MainContentScroll,
} from "../../Components/Container/style";
import FlatListComponent from "../../Components/FlatList/FlatList";
import CardTreino, {
  CardAddTreino,
} from "../../Components/CardTreino/CardTreino";
import { ContainerTreino } from "./style";
import { ContainerCardTreino } from "../../Components/CardTreino/style";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Contexts/AuthContext";
import { api, treinosGetResource } from "../../Services/Service";

const TreinosScreen = () => {
  const navigation = useNavigation();
  const [treinosApi, setTreinosApi] = useState([])
  const [gruposApi, setGruposApi] = useState([])
  const [treinos, setTreinos] = useState([
    { letraTreino: "A", gruposMusculares: "Peito, Triceps" },
    { letraTreino: "B", gruposMusculares: "Costas" },
    { letraTreino: "C", gruposMusculares: "Peito, Triceps" },
    { letraTreino: "D", gruposMusculares: "Costas" },
  ]);

  const { userGlobalData, setUserGlobalData } = useContext(AuthContext);



  async function GetTreinos() {
    try {
      const { data } = await api.get(treinosGetResource + userGlobalData.id);

      let grupos = [];

      // Percorre os dados recebidos da API
      data.forEach(element => {
        element.exercicios.forEach(exercicio => {
          grupos.push({
            letraTreino: element.letraNomeTreino,
            grupoMuscular: exercicio.grupoMuscular.nomeGrupoMuscular
          });
        });
      });

      // Função para agrupar os grupos musculares por letraTreino
      function agruparGruposMusculares(array) {
        const gruposAgrupados = {};

        array.forEach(item => {
          const { letraTreino, grupoMuscular } = item;
          if (!gruposAgrupados[letraTreino]) {
            gruposAgrupados[letraTreino] = [];
          }
          if (!gruposAgrupados[letraTreino].includes(grupoMuscular)) {
            gruposAgrupados[letraTreino].push(grupoMuscular);
          }
        });

        // Formatar o resultado no formato desejado
        const resultadoFormatado = Object.keys(gruposAgrupados).map(letraTreino => {
          return {
            letraTreino,
            gruposMusculares: gruposAgrupados[letraTreino].join(', ')
          };
        });

        return resultadoFormatado;
      }

      // Agrupa os grupos musculares por letraTreino
      let gruposAgrupados = agruparGruposMusculares(grupos);
      setTreinosApi(gruposAgrupados);
      console.log(gruposAgrupados);

    } catch (error) {
      console.log(error);
    }
  }

  // async function GetTreinos() {
  //   try {
  //     const { data } = await api.get(treinosGetResource + userGlobalData.id);

  //     let grupos = [];

  //     // Percorre os dados recebidos da API
  //     data.forEach(element => {
  //       element.exercicios.forEach(exercicio => {
  //         grupos.push({
  //           letraTreino: element.letraNomeTreino,
  //           grupoMuscular: exercicio.grupoMuscular.nomeGrupoMuscular
  //         });
  //       });
  //     });

  //     // Função para filtrar objetos duplicados
  //     function filtrarObjetosUnicos(array, keyExtractor) {
  //       const seen = new Set();
  //       return array.filter(item => {
  //         const key = keyExtractor(item);
  //         if (seen.has(key)) {
  //           return false;
  //         }
  //         seen.add(key);
  //         return true;
  //       });
  //     }

  //     // Filtra objetos duplicados com base em letraTreino e grupoMuscular
  //     let gruposUnicos = filtrarObjetosUnicos(grupos, item => `${item.letraTreino}-${item.grupoMuscular}`);
  //     setTreinosApi(gruposUnicos)
  //     console.log(gruposUnicos);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  const AddTreino = async () => {
    navigation.navigate("PersonalizeSeusTreinos");
  };

  useEffect(() => {
    return (cleanUp = () => { });
  }, []);
  return (
    <ContainerTreino>
      <GridLayout height="100%" padding="0">
        <Header />

        <Title
          textAling="center"
          text={treinosApi.length !== 0 ? "Meus treinos" : "Monte seu treino"}
        />
        <ContainerCardTreino>
          <FlatListComponent
            data={treinosApi}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            numColumns={2}
            renderItem={({ item }) => <CardTreino onPress={() => navigation.navigate("VisualizarTreino", { treino: item })} text={item} />}
          />
          {treinos.length < 6 && <CardAddTreino onPress={GetTreinos} />}
        </ContainerCardTreino>
      </GridLayout>
    </ContainerTreino>
  );
};

export default TreinosScreen;
