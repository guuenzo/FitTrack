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

const SelecioneOsGruposMuscularesScreen = ({ route }) => {
  const heightStatusBar = StatusBar.currentHeight;
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
        Alert.alert("Ops", "Selecione até 2 grupos!");
      }
    }
  };

  const addExercicios = () => {
    if (gruposMuscularesSelecionados.length === 0) {
      Alert.alert("Selecione 1 grupo pelo menos");
      return;
    }

    navigation.navigate("SelecioneOsExercicios", {
      treino: { gruposMuscularesSelecionados: gruposMuscularesSelecionados },
      treinoAserAtualizado: { ...route.params.treinoAserAtualizado },
    });
  };

  const getGruposMusculares = async () => {
    try {
      const { data } = await api.get(grupoMuscularResource);
      setGruposMusculares(data);
    } catch (error) {
      console.log(error);
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

// const SelecioneOsGruposMuscularesScreen = ({ route }) => {
//   const heightStatusBar = StatusBar.currentHeight;

//   const navigation = useNavigation();
//   const [gruposMusculares, setGruposMusculares] = useState([]);
//   const [idGrupo, setIdgrupo] = useState({ id1: "", id2: "", id3: "" });

//   const [gruposMuscularesSelecionados, setGruposMuscularesSelecionados] =
//     useState([]);

//   const handleSelect = (itemId) => {
//     setGruposMuscularesSelecionados((prevState) => {
//       if (prevState.includes(itemId)) {
//         const newSelectedIds = prevState.filter((id) => id !== itemId);
//         updateIdGrupo(newSelectedIds);
//         return newSelectedIds;
//       } else if (prevState.length < 3) {
//         const newSelectedIds = [...prevState, itemId];
//         updateIdGrupo(newSelectedIds);
//         return newSelectedIds;
//       } else {
//         // Caso tente selecionar mais de 3 itens, exibe um alerta
//         Alert.alert(
//           "Limite de seleção atingido",
//           "Você só pode selecionar até 3 itens."
//         );
//         return prevState;
//       }
//     });
//   };

//   const updateIdGrupo = (selectedIds) => {
//     setIdgrupo({
//       idGrupo1: selectedIds[0] || null,
//       idGrupo2: selectedIds[1] || null,
//       idGrupo3: selectedIds[2] || null,
//     });
//   };

//   async function AddExercicios() {
//     idGrupo.idGrupo1
//       ? navigation.navigate("SelecioneOsExercicios", {
//           treino: { gruposSelecionados: idGrupo },
//         })
//       : Alert.alert("Selecione ao menos 1 treino");
//   }

//   const getGruposMusculares = async () => {
//     try {
//       const { data } = await api.get(grupoMuscularResource);
//       setGruposMusculares(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getGruposMusculares();
//   }, []);
//   return (
//     <ContainerPesonalizeTreino>
//       <LeftArrowAOrXComponent
//         isBlue
//         fieldMargin={`${heightStatusBar + 20}px 0 0 15px`}
//       />

//       <Title text="Grupos musculares" />

//       <ContainerCard>
//         <FlatListComponent
//           data={gruposMusculares}
//           keyExtractor={(item) => item.idGrupoMuscular}
//           contentContainerStyle={{
//             alignItems: "space-evenly",
//             gap: 30,
//             paddingBottom: 20,
//             paddingTop: 20,
//           }}
//           numColumns={2}
//           renderItem={({ item }) =>
//             gruposMusculares && (
//               <CardGrupoTreino
//                 selected={gruposMuscularesSelecionados.includes(
//                   item.idGrupoMuscular
//                 )}
//                 onPress={() => {
//                   {
//                     handleSelect(item.idGrupoMuscular);
//                     // setIdgrupo(prevState => {

//                     //   if (!idGrupo.id1) {
//                     //     return { ...prevState, id1: item.id }
//                     //   } else if (!idGrupo.id2) {
//                     //     return { ...prevState, id2: item.id }
//                     //   } else {
//                     //     return { ...prevState, id3: item.id }
//                     //   }
//                     // })
//                   }
//                 }}
//                 grupo={item.nomeGrupoMuscular}
//               />
//             )
//           }
//         />
//       </ContainerCard>

//       <ButtonComponentDefault
//         statusButton={true}
//         onPress={AddExercicios}
//         // onPress={() => console.log(idGrupo)}
//         text="Confirmar"
//       />
//     </ContainerPesonalizeTreino>
//   );
// };

export default SelecioneOsGruposMuscularesScreen;
