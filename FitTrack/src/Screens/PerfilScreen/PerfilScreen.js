import { View, Text } from 'react-native'
import React from 'react'
import { Container, GridLayout, MainContent, MainContentScroll } from '../../Components/Container/style'
import Title from '../../Components/Title/Title'

const PerfilScreen = () => {
  return (
    <Container>
    <MainContentScroll>
      <GridLayout>
        <MainContent>

          <Title
            text={"Perfil"}
          />
        </MainContent>
      </GridLayout>
    </MainContentScroll>
  </Container>
  )
}

export default PerfilScreen