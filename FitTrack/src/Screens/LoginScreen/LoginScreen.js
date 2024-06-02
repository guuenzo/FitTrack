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

const LoginScreen = ({ navigation }) => {
  const { userGlobalData, setUserGlobalData } = useContext(AuthContext);

  const [user, setUser] = useState({
    nome: "",
    email: "",
    senha: "",
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
      setUserGlobalData({
        nome: "fefe",
        idade: 17,
        foto: "https://yt3.googleusercontent.com/ytc/AIdro_nTUT9kckaNnLii3NCep9r5_2ZbSWDE6E11wW0bmx1W5Y0=s160-c-k-c0x00ffffff-no-rj",
      });
      navigation.navigate("Main");
    }
  };
  const criarConta = async () => {
    try {
      const { data, status } = await api.post(usuarioResource, {
        ...user,
        dataNascimento,
      });

      if (status === 200) {
        await logar(user.email, user.senha);
        return;
      }
      Alert.alert("Erro", "Não foi possível criar a conta");
    } catch (error) {
      navigation.navigate("Main");
    }
  };

  const handleLogar = async () => {
    if (!isLoginForm) {
      setIsLoginForm(!isLoginForm);
      return;
    }
    await logar();
  };

  const handleCriarConta = async () => {
    if (isLoginForm) {
      setIsLoginForm(!isLoginForm);
      return;
    }
    await criarConta();
  };

  useEffect(() => {
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

              {!isLoginForm ? (
                <InputData setData={setDataNascimento} />
              ) : (
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
