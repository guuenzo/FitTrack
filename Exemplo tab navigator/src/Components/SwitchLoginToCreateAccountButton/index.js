import { View, Text } from "react-native";
import React, { useState } from "react";
import ButtonComponent from "../Button";

const SwitchLoginToCreateAccountButton = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const logar = () => {
    alert("Logou");
  };
  const criarConta = () => {
    alert("Criou");
  };

  const handleLogar = () => {
    if (!isLoginForm) {
      setIsLoginForm(!isLoginForm);
      return;
    }
    logar();
  };

  const handleCriarConta = () => {
    if (isLoginForm) {
      setIsLoginForm(!isLoginForm);
      return;
    }
    criarConta();
  };

  return (
    <View style={{ gap: 20 }}>
      <Text style={{ textAlign: "center", color: "#fff" }}>
        {isLoginForm ? "Logar" : "Criar conta"}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <ButtonComponent
          text="Login "
          statusButton={isLoginForm}
          onPress={handleLogar}
        />
        <ButtonComponent
          text="Criar"
          statusButton={!isLoginForm}
          onPress={handleCriarConta}
        />
      </View>
    </View>
  );
};

export default SwitchLoginToCreateAccountButton;
