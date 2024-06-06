import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { LeftArrowAOrXComponent } from '../../Components/LeftArrowAOrX'
import Title from '../../Components/Title/Title'
import { ButtonComponentDefault } from '../../Components/Button/Button'
import { ContainerPesonalizeTreino } from '../PersonalizeSeusTreinosScreen/style'
import { ContainerExercicios } from './style'
import { CardExercicio, CardGrupoTreino } from '../../Components/CardTreino/CardTreino'
import FlatListComponent from '../../Components/FlatList/FlatList'

const SelecioneOsExerciciosScreen = () => {
  const [exercicios, setExercicios] = useState([
    { id: 0, exercicio: "supino", grupo: "peito" },
    { id: 1, exercicio: "supino reto", grupo: "peito" },
    { id: 2, exercicio: "supino inclinado", grupo: "peito" },
    { id: 3, exercicio: "Triceps corda", grupo: "Triceps" },
    { id: 4, exercicio: "Triceps Francesa", grupo: "Triceps" },
    { id: 5, exercicio: "Triceps Testa", grupo: "Triceps" }])
  const [grpMuscular, setGrpMuscular] = useState([
    { id: 0, gg: "peito" },
    { id: 1, gg: "Triceps" }])
  return (
    <ContainerPesonalizeTreino>
      <LeftArrowAOrXComponent fieldMargin={"50px 0 0 0"} />

      <Title text='Escolha seus exercicios' />
      <ContainerExercicios>

        <FlatListComponent
          data={grpMuscular}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>

          (<>
            <Title text={item.gg} />

            <FlatListComponent
              data={exercicios}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) =>

              (
                item.grupo === "peito" && <CardExercicio exercicio={item.exercicio} />
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
        text='Confirmar' />


    </ContainerPesonalizeTreino>
  )
}

export default SelecioneOsExerciciosScreen