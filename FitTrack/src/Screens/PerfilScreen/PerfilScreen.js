import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Container, GridLayout, MainContent, MainContentScroll } from '../../Components/Container/style'
import Title from '../../Components/Title/Title'
import { ImageProfile, ImageProfileUser } from '../../Components/Image/Image'
import { AuthContext } from '../../Contexts/AuthContext'
import { Ionicons } from '@expo/vector-icons';
import { TextMABold, TextQuickSandSemiBold } from '../../Components/Text/style'
import { CardPerfil } from '../../Components/CardPerfil/Style'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Theme from '../../Styles/Theme'



const PerfilScreen = ({
  uriImageProfile = "https://avatars.githubusercontent.com/u/125310170?s=400&u=e379fad687a58d753af1755743dc6d57db9d001b&v=4",
  navigation
}) => {
  const { userGlobalData } = useContext(AuthContext);
  return (
    <Container>

      <GridLayout>


        <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
        <Ionicons name="exit-outline" size={30} color="#C81D25" style={{ marginTop: 61, alignSelf: 'flex-end' }} />

        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>

          <ImageProfile
            isHeader={false}
            uriImageProfile={userGlobalData.foto || uriImageProfile}
          />




          <Title
            text={"Felipe Gois"}
          />
          <TextQuickSandSemiBold>email@email.com</TextQuickSandSemiBold>
        </View>

        <View style={{ justifyContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
          <CardPerfil>
          <MaterialCommunityIcons name="heart-pulse" size={24} color="#2B3C64" />

            <TextMABold color={Theme.colors.secondaryScale.V1} fontSize='16px'>23.5</TextMABold>
          </CardPerfil>



          <CardPerfil>
            <MaterialIcons name="scale" size={24} color="#2B3C64" />
            <View>
              <TextMABold color={Theme.colors.secondaryScale.V1} fontSize='16px'>60.0KG</TextMABold>
              <TextQuickSandSemiBold color={Theme.colors.secondaryScale.V5}>IMC</TextQuickSandSemiBold>
            </View>
          </CardPerfil>

          <CardPerfil>
            <FontAwesome name="line-chart" size={24} color="#2B3C64" />


            <View>
              <TextMABold color={Theme.colors.secondaryScale.V1} fontSize='16px'>Bulking</TextMABold>

              <TextQuickSandSemiBold color={Theme.colors.secondaryScale.V5}>Objetivo</TextQuickSandSemiBold>
            </View>


          </CardPerfil>
          <CardPerfil>
            <FontAwesome name="arrows-v" size={24} color="#2B3C64" />

            <TextMABold color={Theme.colors.secondaryScale.V1} fontSize='16px'>1,7 m</TextMABold>

          </CardPerfil>

        </View>

      </GridLayout>

    </Container>
  )
}

export default PerfilScreen