import { Text } from "react-native";
import { ModalContent, ModalStyle } from "./style";
import { useState } from "react";
import { Button, Portal } from "react-native-paper";
import Title from "../Title/Title";
import { ButtonComponentDefault, ButtonSecondary } from "../Button/Button";
import Theme from "../../Styles/Theme";

export const ModalAlimentacao = ({
  exibeModal = false,
  titulo = "Dê um nome para sua refeição:",
}) => {
  const [visible, setVisible] = useState(exibeModal);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  return (
    <Portal>
      <ModalStyle
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <ModalContent aligItems={"center"}>
          <Title textAling={"center"} text={titulo} />
          <ButtonComponentDefault statusButton text="Salvar" />
          <ButtonSecondary
            colorText={Theme.colors.secondaryScale.V1}
            textButton="Cancelar"
          />
        </ModalContent>
      </ModalStyle>
    </Portal>
  );
};
