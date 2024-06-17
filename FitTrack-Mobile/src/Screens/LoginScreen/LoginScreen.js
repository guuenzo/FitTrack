import React, { useContext, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { InputComponent, InputPassword } from "../../Components/Input/Input";
import {
  Container,
  GridLayout,
  MainContent,
  LinearGradientTelasIniciais,
  InputBox,
} from "../../Components/Container/style";
import ImageLogo from "../../Components/Image/Image";
import {
  ButtonLoginCriarContaBox,
  ButtonSecondary,
} from "../../Components/Button/Button";
import { api, loginResource, usuarioResource } from "../../Services/Service";
import { AuthContext } from "../../Contexts/AuthContext";
import { Alert } from "react-native";
import { userDecodeToken } from "../../utils/StringFunctions";
import { useNavigation } from "@react-navigation/native";
import DialogComponent from "../../Components/Dialog/Dialog";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [dialog, setDialog] = useState({});

  const [showDialog, setShowDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const { userGlobalData, setUserGlobalData } = useContext(AuthContext);

  const [user, setUser] = useState({
    nome: "",
    email: "fythoy@gmail.com",
    senha: "12345",
  });

  const [isLoginForm, setIsLoginForm] = useState(true);

  const logar = async (email, senha) => {
    setLoading(true);
    try {
      const { data, status } = await api.post(loginResource, { email, senha });

      const biometricExist = await LocalAuthentication.isEnrolledAsync();
      const isBiometricSupported = await LocalAuthentication.hasHardwareAsync();

      if (!biometricExist || (!isBiometricSupported && status === 200)) {
        setUserGlobalData(await userDecodeToken(data.token));
        navigation.replace("Main");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Por favor, autentique-se para acessar o aplicativo.",
        fallbackLabel: "Usar senha do dispositivo?",
        disableDeviceFallback: false, // Permite o fallback para a senha do dispositivo
      });

      if (result.success) {
        setUserGlobalData(await userDecodeToken(data.token));
        // setUserGlobalData({ token: response.data });
        navigation.replace("Main");
        return;
      } else {
        setDialog({
          status: "erro",
          contentMessage: "Erro",
        });
        setShowDialog(true);
        setLoading(false);
        return;
      }
    } catch (error) {
      setDialog({
        status: "erro",
        contentMessage: "Usuário ou senha incorretos!",
      });
      setShowDialog(true);
    }
    setLoading(false);
  };

  const criarConta = async () => {
    setLoading(true);
    try {
      if (
        user.nome.trim() === "" ||
        user.email.trim() === "" ||
        user.senha.trim() === ""
      ) {
        setDialog({
          status: "alerta",
          contentMessage: "Preencha os campos corretamente!",
        });
        setShowDialog(true);
        setLoading(false);
        return;
      }

      const { status } = await api.post(
        `${usuarioResource + "/CadastrarUsuario"}`,
        user
      );

      if (status === 201) {
        await logar(user.email, user.senha);
        return;
      }
      setDialog({
        status: "erro",
        contentMessage: "Não foi possível criar a conta!",
      });
      setShowDialog(true);
    } catch (error) {
      setDialog({
        status: "erro",
        contentMessage: "Já existe um usuário com esse email!",
      });
      setShowDialog(true);
    }
    setLoading(false);
  };

  const handleLogar = async () => {
    if (!isLoginForm) {
      setIsLoginForm(!isLoginForm);
      return;
    }

    await logar(user.email, user.senha);
  };

  const handleCriarConta = async () => {
    if (isLoginForm) {
      setIsLoginForm(!isLoginForm);
      return;
    }
    await criarConta();
  };

  return (
    <Container>
      <LinearGradientTelasIniciais>
        <GridLayout>
          <MainContent backGround={"transparent"}>
            <DialogComponent
              {...dialog}
              visible={showDialog}
              setVisible={setShowDialog}
              setDialog={setDialog}
            />
            <ImageLogo />

            <InputBox
              fieldHeight={"350px"}
              gap={"20px"}
              fieldJustifyContent={"center"}
            >
              {!isLoginForm && (
                <InputComponent
                  placeholder="Nome"
                  value={user.nome}
                  onChangeText={(txt) => setUser({ ...user, nome: txt })}
                />
              )}
              <InputComponent
                keyboardType="email-address"
                placeholder="E-mail"
                value={user.email}
                onChangeText={(txt) => setUser({ ...user, email: txt })}
              />
              <InputPassword
                value={user.senha}
                onChangeText={(txt) => setUser({ ...user, senha: txt })}
              />

              {isLoginForm && (
                <ButtonSecondary
                  onPress={() => navigation.navigate("RecuperarSenha")}
                />
              )}
            </InputBox>

            <ButtonLoginCriarContaBox
              loadingCriarConta={loading}
              loadingLogin={loading}
              statusButton={isLoginForm}
              handleCriarConta={handleCriarConta}
              handleLogar={handleLogar}
            />
          </MainContent>
        </GridLayout>
      </LinearGradientTelasIniciais>
    </Container>
  );
};

export default LoginScreen;
