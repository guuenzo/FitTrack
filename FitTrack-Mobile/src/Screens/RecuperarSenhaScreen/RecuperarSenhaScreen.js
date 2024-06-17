import { useState } from "react";
import { InputComponent } from "../../Components/Input/Input";
import {
  Container,
  GridLayout,
  LinearGradientTelasIniciais,
} from "../../Components/Container/style";
import ImageLogo from "../../Components/Image/Image";
import { ButtonComponentDefault } from "../../Components/Button/Button";
import { api, recuperarSenhaResource } from "../../Services/Service";
import { View } from "react-native";
import { TitleLogins } from "../../Components/Title/style";
import { TextQuickSandMedium } from "../../Components/Text/style";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";
import { CommonActions, useNavigation } from "@react-navigation/native";
import DialogComponent from "../../Components/Dialog/Dialog";

const RecuperarSenhaScreen = () => {
  const [email, setEmail] = useState("");

  const [dialog, setDialog] = useState({});

  const [showDialog, setShowDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const EnviarEmail = async () => {
    setLoading(true);
    if (email.trim() === "") {
      setDialog({
        status: "alerta",
        contentMessage: "Preencha os campos corretamente!",
      });
      setShowDialog(true);
      setLoading(false);
      return;
    }

    await api
      .post(`${recuperarSenhaResource}?email=${email}`)
      .then(() => {
        navigation.replace("VerificarCodigo", { emailRecuperacao: email });
      })
      .catch((error) => {
        setDialog({
          status: "erro",
          contentMessage: "Email não encontrado!",
        });
        setShowDialog(true);
        setLoading(false);
        return;
      });
    setLoading(false);
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
      <DialogComponent
        {...dialog}
        visible={showDialog}
        setVisible={setShowDialog}
        setDialog={setDialog}
      />
      <LinearGradientTelasIniciais>
        <GridLayout>
          <LeftArrowAOrXComponent onPress={navegarParaLogin} />
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
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={(txt) => setEmail(txt)}
          />

          <View style={{ marginTop: 72, alignItems: "center" }}>
            <ButtonComponentDefault
              disabled={loading}
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
