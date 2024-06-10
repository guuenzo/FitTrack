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
import { TextMarcado, TextQuickSandMedium } from "../../Components/Text/style";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";
import { BlurViewComponent, InputCode, LinearGradientInputView } from "../../Components/Input/style";

const VerificarCodigoScreen = ({
  navigation
}) => {
  const [email, setEmail] = useState("fulano@gmail.com")
  return (
    <Container>
      <LinearGradientTelasIniciais>
        <GridLayout>
          <LeftArrowAOrXComponent />
          <View style={{ alignItems: 'center' }}>
            <ImageLogo fieldMargin={"55px 0px 50px 0px"} />

            <TitleLogins>Verificar código</TitleLogins>
            <View style={{ height: 18 }} />
            <TextQuickSandMedium style={{ width: '80%' }}>Enviamos um email para <TextMarcado>{email}</TextMarcado> com um código de 4 dígitos válidos, digite os abaixo:
            </TextQuickSandMedium>
          </View>


          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 19,
            alignItems: 'center',
            marginTop: 20
          }} >
            {[0, 1, 2, 3].map((index) => (


              
              <BlurViewComponent>
                <LinearGradientInputView>
                  <InputCode
                    key={index}
                    keyboardType="numeric"
                    placeholder="0"
                    maxLength={1}
                    caretHidden={true}
                  />
                </LinearGradientInputView>
              </BlurViewComponent>

            ))}

          </View>


          <View style={{ marginTop: 72, alignItems: 'center' }} >
            <ButtonComponentDefault
              text="Continuar"
              statusButton={true}
              onPress={() => navigation.navigate("RedefinirSenha")}
            />
          </View>



        </GridLayout>
      </LinearGradientTelasIniciais>
    </Container>
  )
}

export default VerificarCodigoScreen