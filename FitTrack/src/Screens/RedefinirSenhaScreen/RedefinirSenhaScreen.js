import React, { useContext, useEffect, useState } from "react";
import {
  InputComponent,
  InputData,
  InputPassword,
} from "../../Components/Input/Input";
import {
  Container,
  GridLayout,
  MainContent,
  LinearGradientTelasIniciais,
  InputBox,
} from "../../Components/Container/style";
import ImageLogo from "../../Components/Image/Image";
import {
  ButtonComponent,
  ButtonComponentDefault,
  ButtonLoginCriarContaBox,
  ButtonSecondary,
} from "../../Components/Button/Button";
import { api, loginResource, usuarioResource } from "../../Services/Service";
import { AuthContext } from "../../Contexts/AuthContext";
import { Alert, View } from "react-native";
import { userDecodeToken } from "../../utils/StringFunctions";
import { TitleLogins } from "../../Components/Title/style";
import { TextQuickSandMedium } from "../../Components/Text/style";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";

const RedefinirSenhaScreen = ({
  navigation
}) => {
  return (
    <Container>
      <LinearGradientTelasIniciais>
        <GridLayout>
          <LeftArrowAOrXComponent onPress={() => navigation.navigate("Login")} />
          <View style={{ alignItems: 'center' }}>
            <ImageLogo fieldMargin={"55px 0px 50px 0px"} />

            <TitleLogins>Redefinir senha</TitleLogins>
          </View>

          <View style={{ marginTop: 42, gap: 20 }} >
            <InputComponent
              placeholder="Senha"
            // value={user.email}
            // onChangeText={(txt) => setUser({ email: txt })}
            />
            <InputComponent
              placeholder="Confirmar senha"
            // value={user.email}
            // onChangeText={(txt) => setUser({ email: txt })}
            />

          </View>


          <View style={{ marginTop: 72, alignItems: 'center' }} >
            <ButtonComponentDefault
              text="Continuar"
              statusButton={true}
              onPress={() => navigation.navigate("Login")}
            />
          </View>



        </GridLayout>
      </LinearGradientTelasIniciais>
    </Container>
  )
}

export default RedefinirSenhaScreen