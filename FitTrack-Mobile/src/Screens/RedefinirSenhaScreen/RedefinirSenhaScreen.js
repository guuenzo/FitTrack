import { useState } from "react";
import { InputComponent } from "../../Components/Input/Input";
import {
  Container,
  GridLayout,
  LinearGradientTelasIniciais,
} from "../../Components/Container/style";
import ImageLogo from "../../Components/Image/Image";
import { ButtonComponentDefault } from "../../Components/Button/Button";
import { api } from "../../Services/Service";
import { View } from "react-native";
import { TitleLogins } from "../../Components/Title/style";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";
import DialogComponent from "../../Components/Dialog/Dialog";
import { CommonActions } from "@react-navigation/native";

const RedefinirSenhaScreen = ({ navigation, route }) => {
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const [dialog, setDialog] = useState({});

  const [showDialog, setShowDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const alterarSenha = async () => {
    setLoading(true);
    if (senha === confirmar) {
      await api
        .put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
          senhaNova: senha,
        })
        .then(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        })
        .catch((error) => {
          setDialog({
            status: "erro",
            contentMessage: "Erro ao alterar senha!",
          });
          setShowDialog(true);
          setLoading(false);
          return;
        });
    } else {
      setDialog({
        status: "alerta",
        contentMessage: "As senhas devem ser iguais!",
      });
      setShowDialog(true);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  return (
    <Container>
      <LinearGradientTelasIniciais>
        <GridLayout>
          <DialogComponent
            {...dialog}
            visible={showDialog}
            setVisible={setShowDialog}
            setDialog={setDialog}
          />
          <LeftArrowAOrXComponent
            onPress={() => navigation.navigate("Login")}
          />
          <View style={{ alignItems: "center" }}>
            <ImageLogo fieldMargin={"55px 0px 50px 0px"} />

            <TitleLogins>Redefinir senha</TitleLogins>
          </View>

          <View style={{ marginTop: 42, gap: 20 }}>
            <InputComponent
              placeholder="Senha"
              value={senha}
              onChangeText={(txt) => setSenha(txt)}
            />
            <InputComponent
              placeholder="Confirmar senha"
              value={confirmar}
              onChangeText={(txt) => setConfirmar(txt)}
            />
          </View>

          <View style={{ marginTop: 72, alignItems: "center" }}>
            <ButtonComponentDefault
              disabled={loading}
              text="Continuar"
              statusButton={true}
              onPress={() => alterarSenha()}
            />
          </View>
        </GridLayout>
      </LinearGradientTelasIniciais>
    </Container>
  );
};

export default RedefinirSenhaScreen;
