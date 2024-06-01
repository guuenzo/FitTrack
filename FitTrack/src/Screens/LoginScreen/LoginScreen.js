import React, { useEffect, useState } from "react";
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
import { api, loginResource, userResource } from "../../Services/Service";

const LoginScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [dataNascimento, setDataNascimento] = useState(new Date());

  const [isLoginForm, setIsLoginForm] = useState(true);

  const logar = async () => {
    try {
      const { token } = await api.post(loginResource, user);

      navigation.navigate("Main");
    } catch (error) {
      navigation.navigate("Main");
    }
  };
  const criarConta = async () => {
    try {
      const response = await api.post(userResource, {
        ...user,
        dataNascimento,
      });
      navigation.navigate("Main");
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
