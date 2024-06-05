import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { LeftArrowAOrXComponent } from '../../Components/LeftArrowAOrX'
import Title from '../../Components/Title/Title'
import { CardGrupoTreino, CardPersonalizeTreino } from '../../Components/CardTreino/CardTreino'
import { ButtonComponent, ButtonComponentDefault, ButtonLoginCriarContaBox } from '../../Components/Button/Button'
import { ContainerCard, ContainerPesonalizeTreino } from "../PersonalizeSeusTreinosScreen/style"
import { useNavigation } from '@react-navigation/native'


const SelecioneOsGruposMuscularesScreen = () => {
  return (
    <ContainerPesonalizeTreino>
      <LeftArrowAOrXComponent fieldMargin={"50px 0 0 0"} />

      <Title text='Grupos musculares' />

      <ContainerCard>
        <View style={styles.column} >
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
        </View>

      </ContainerCard>

      <ButtonComponentDefault
        statusButton={true}
        text='Confirmar' />

    </ContainerPesonalizeTreino>
  )
}
const styles = StyleSheet.create({
  column: {
    alignItems: 'center', // Centraliza o conteúdo de cada coluna horizontalmente
    gap: 30,
    // borderWidth: 1,
  },
});

export default SelecioneOsGruposMuscularesScreen