import { useContext, useEffect, useState } from "react";
import { Portal } from "react-native-paper";
import Title from "../Title/Title";
import {
  ButtonComponent,
  ButtonComponentDefault,
  ButtonSecondary,
} from "../Button/Button";
import Theme from "../../Styles/Theme";
import { InputDefault } from "../Input/Input";
import { StyleSheet, TextInput, View } from "react-native";
import { ModalContent, ModalStyle } from "../Modal/style";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../Contexts/AuthContext";
import { api } from "../../Services/Service";
import DialogComponent from "../Dialog/Dialog";

export const ModalAltura = ({
  exibeModal = false,
  setExibeModal,
  alturaInicial,
}) => {
  const hideModal = () => setExibeModal(false);
  const [altura, setAltura] = useState("");
  const { userGlobalData, setUserGlobalData } = useContext(AuthContext);
  const [dialog, setDialog] = useState({});

  const [showDialog, setShowDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const formatAltura = (text) => {
    // Remove non-numeric characters
    let cleaned = ("" + text).replace(/[^0-9]/g, "");

    // Format the number as X.XX
    if (cleaned.length <= 1) {
      return cleaned;
    } else if (cleaned.length <= 3) {
      return cleaned.slice(0, 1) + "." + cleaned.slice(1);
    } else {
      return cleaned.slice(0, 1) + "." + cleaned.slice(1, 3);
    }
  };

  const handleChange = (text) => {
    const formatted = formatAltura(text);
    setAltura(formatted);
  };

  async function updateAltura(novaAltura) {
    try {
      const response = await api.patch(
        `/Usuario/AlterarDadosPerfil?idUsuario=${userGlobalData.id}`,
        {
          altura: novaAltura,
        },
        {
          headers: {
            "Content-Type": "application/json-patch+json",
            Accept: "*/*",
          },
        }
      );
      setExibeModal(false);
    } catch (error) {
      setDialog({
        status: "erro",
        contentMessage: "Não foi possível atualizar a altura!",
      });
      setShowDialog(true);

      setLoading(false);
    }
  }

  useEffect(() => {
    setAltura(alturaInicial);
  }, [exibeModal]);
  return (
    <Portal>
      <DialogComponent
        {...dialog}
        visible={showDialog}
        setVisible={setShowDialog}
        setDialog={setDialog}
      />
      <ModalStyle fieldPadding={20} visible={exibeModal} onDismiss={hideModal}>
        <ModalContent gap={"25px"} aligItems={"center"}>
          <Title text="Indique sua altura" />

          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Digite a altura"
              placeholderTextColor="#2B3C64"
              value={altura}
              onChangeText={handleChange}
              keyboardType="numeric"
            />
          </View>

          <ButtonComponent
            text="Salvar"
            statusButton={true}
            onPress={() => updateAltura(altura)}
          />

          <ButtonSecondary
            colorText={Theme.colors.secondaryScale.V1}
            textButton="Cancelar"
            onPress={() => setExibeModal(false)}
            fieldMargin="0px"
          />
        </ModalContent>
      </ModalStyle>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#2B3C64",
    borderRadius: 8,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    width: "100%",
    textAlign: "center",
    borderRadius: 8,
    color: "#2B3C64",
  },
});
