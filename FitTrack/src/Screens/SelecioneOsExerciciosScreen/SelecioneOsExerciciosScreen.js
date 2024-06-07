import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { LeftArrowAOrXComponent } from '../../Components/LeftArrowAOrX'
import Title from '../../Components/Title/Title'
import { ButtonComponentDefault } from '../../Components/Button/Button'
import { ContainerPesonalizeTreino } from '../PersonalizeSeusTreinosScreen/style'
import { ContainerExercicios, ContainerTextGrupo, TextGrupo } from './style'
import { CardExercicio, CardGrupoTreino } from '../../Components/CardTreino/CardTreino'
import FlatListComponent from '../../Components/FlatList/FlatList'

const SelecioneOsExerciciosScreen = () => {
  const [exercicios, setExercicios] = useState([
    { id: 0, exercicio: "supino", grupo: "Peito" },
    { id: 1, exercicio: "supino reto", grupo: "Peito" },
    { id: 2, exercicio: "supino inclinado", grupo: "Peito" },
    { id: 3, exercicio: "Triceps corda", grupo: "Triceps" },
    { id: 4, exercicio: "Triceps Francesa", grupo: "Triceps" },
    { id: 5, exercicio: "Triceps Testa", grupo: "Triceps" }])


  const conjuntoUnico = new Set(exercicios.map(objeto => objeto["grupo"]));

  // Converter o Set de volta para um array se necessário
  const arrayUnico = [...conjuntoUnico];

  return (
    <ContainerPesonalizeTreino>
      <LeftArrowAOrXComponent fieldMargin={"50px 0 0 0"} />

      <Title text='Escolha seus exercicios' />
      <ContainerExercicios showsVerticalScrollIndicator={false}>

        <FlatListComponent
          data={arrayUnico}
          keyExtractor={(item) => item}
          renderItem={({ item }) =>

          (<>
            <ContainerTextGrupo>
              <TextGrupo>{item}</TextGrupo>
            </ContainerTextGrupo>


            <FlatListComponent
              data={exercicios}
              keyExtractor={(itemEx) => itemEx.id}
              renderItem={(itemExercicio) =>
              (
                itemExercicio.item.grupo === item && <CardExercicio exercicio={itemExercicio.item.exercicio} />
              )
              }
            />
          </>
          )
          }
        />



      </ContainerExercicios>

      <ButtonComponentDefault
        statusButton={true}
        marginBottom={"7%"}
        text='Confirmar' />


    </ContainerPesonalizeTreino>
  )
}

export default SelecioneOsExerciciosScreen