import { ModalContent, ModalStyle } from "./style";
import { useEffect, useState } from "react";
import { Portal } from "react-native-paper";
import Title from "../Title/Title";
import { ButtonComponentDefault, ButtonSecondary } from "../Button/Button";
import Theme from "../../Styles/Theme";
import { InputDefault } from "../Input/Input";
import { View } from "react-native";

export const ModalAlimentacao = ({
  exibeModal = false,
  setExibeModal,
  titulo = "Dê um nome para sua refeição:",
  setTexto,
  texto,
  isEditName = true,
  peso,
  setPeso,
  valorOriginalMacro,
  alterarPesoAlimento = () => {},
}) => {
  const [pesoState, setPesoState] = useState(peso);
  const [textoState, setTextoState] = useState(texto);
  const hideModal = () => setExibeModal(false);

  useEffect(() => {
    if (exibeModal) {
      setPesoState(peso);
      setTextoState(texto);
    }
  }, [exibeModal, peso, texto]);

  return (
    <Portal>
      <ModalStyle visible={exibeModal} onDismiss={hideModal}>
        <ModalContent gap={"50px"} aligItems={"center"}>
          <Title
            textAling={"center"}
            text={
              isEditName
                ? "Dê um nome para sua refeição:"
                : "Informe o peso em gramas"
            }
          />

          <InputDefault
            keyboardType={isEditName ? "default" : "numeric"}
            value={isEditName ? textoState : pesoState.toString()}
            placeholder={isEditName ? "Nome" : "Peso"}
            onChangeText={(txt) =>
              isEditName ? setTextoState(txt) : setPesoState(Number(txt))
            }
          />
          <View>
            <ButtonComponentDefault
              statusButton
              text="Salvar"
              onPress={() => {
                if (isEditName) {
                  setTexto(textoState);
                  setExibeModal(false);
                } else {
                  setPeso(pesoState);
                  alterarPesoAlimento(valorOriginalMacro, pesoState, peso);
                  setExibeModal(false);
                }
              }}
            />
            <ButtonSecondary
              colorText={Theme.colors.secondaryScale.V1}
              textButton="Cancelar"
              onPress={() => setExibeModal(false)}
            />
          </View>
        </ModalContent>
      </ModalStyle>
    </Portal>
  );
};
