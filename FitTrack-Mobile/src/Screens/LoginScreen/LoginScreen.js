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
  ButtonLoginCriarContaBox,
  ButtonSecondary,
} from "../../Components/Button/Button";
import { api, loginResource, usuarioResource } from "../../Services/Service";
import { AuthContext } from "../../Contexts/AuthContext";
import { Alert } from "react-native";
import { userDecodeToken } from "../../utils/StringFunctions";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const LoginScreen = () => {
  const navigation = useNavigation();

  const { userGlobalData, setUserGlobalData } = useContext(AuthContext);

  const [user, setUser] = useState({
    nome: "",
    email: "f@f.com",
    senha: "12345",
  });

  const [dataNascimento, setDataNascimento] = useState(new Date());

  const [isLoginForm, setIsLoginForm] = useState(true);

  const logar = async (email, senha) => {
    try {
      const { data, status } = await api.post(loginResource, { email, senha });

      if (status === 200) {
        setUserGlobalData(await userDecodeToken(data.token));
        navigation.replace("Main");
        return;
      }
      Alert.alert("Erro", "Não foi possível realizar o login!");
    } catch (error) {
      console.log(error);
      // navigation.navigate("Main");
    }
  };

  const criarConta = async () => {
    try {
      const { data, status } = await api.post(
        `${usuarioResource + "/CadastrarUsuario"}`,
        user
      );

      if (status === 201) {
        await logar(user.email, user.senha);
        return;
      }
      Alert.alert("Erro", "Não foi possível criar a conta");
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    console.log("userGlobalData", userGlobalData);
    return (cleanUp = () => {});
  }, []);

  return (
    <Container>
      <LinearGradientTelasIniciais>
        <GridLayout>
          <MainContent backGround={"transparent"}>
            {/* tlvz precise de mais uma view aqui nop lugar desse texto */}
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
