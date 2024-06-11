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
import {
  api,
  loginResource,
  recuperarSenhaResource,
  usuarioResource,
} from "../../Services/Service";
import { AuthContext } from "../../Contexts/AuthContext";
import { Alert, View } from "react-native";
import { userDecodeToken } from "../../utils/StringFunctions";
import { TitleLogins } from "../../Components/Title/style";
import { TextQuickSandMedium } from "../../Components/Text/style";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";
import { CommonActions, useNavigation } from "@react-navigation/native";

const RecuperarSenhaScreen = () => {
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const EnviarEmail = async () => {
    await api
      .post(`${recuperarSenhaResource}?email=${email}`)
      .then(() => {
        navigation.replace("VerificarCodigo", {emailRecuperacao : email})
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const navegarParaLogin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  return (
    <Container>
      <LinearGradientTelasIniciais>
        <GridLayout>
          <LeftArrowAOrXComponent
            onPress={navegarParaLogin}
          />
          <View style={{ alignItems: "center" }}>
            <ImageLogo fieldMargin={"55px 0px 50px 0px"} />

            <TitleLogins>Recuperar senha</TitleLogins>
            <View style={{ height: 18 }} />
            <TextQuickSandMedium style={{ width: "80%" }}>
              Insira seu e-mail de cadastro. Enviaremos um código de verificação
              para você.
            </TextQuickSandMedium>
          </View>

          <View style={{ height: 42 }} />
          <InputComponent
            placeholder="Email"
            value={email}
            onChangeText={(txt) => setEmail(txt)}
          />

          <View style={{ marginTop: 72, alignItems: "center" }}>
            <ButtonComponentDefault
              text="Continuar"
              statusButton={true}
              onPress={() => EnviarEmail()}
            />
          </View>
        </GridLayout>
      </LinearGradientTelasIniciais>
    </Container>
  );
};

export default RecuperarSenhaScreen;
