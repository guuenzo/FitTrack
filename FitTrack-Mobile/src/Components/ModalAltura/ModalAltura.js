import { useEffect, useState } from "react";
import { Portal } from "react-native-paper";
import Title from "../Title/Title";
import { ButtonComponent, ButtonComponentDefault, ButtonSecondary } from "../Button/Button";
import Theme from "../../Styles/Theme";
import { InputDefault } from "../Input/Input";
import { StyleSheet, View } from "react-native";
import { ModalContent, ModalStyle } from "../Modal/style";
import { Picker } from '@react-native-picker/picker';


export const ModalAltura = ({
    exibeModal = false,
    setExibeModal,
}) => {
    const hideModal = () => setExibeModal(false);
    const [alturaSelecionada, setAlturaSelecionada] = useState("0")
    const alturas = Array.from({ length: 121 }, (_, i) => (1.10 + i * 0.01).toFixed(2));
    return (
        <Portal>
            <ModalStyle visible={exibeModal} onDismiss={hideModal}>
                <ModalContent gap={"25px"} aligItems={"center"}>

                    <Title text="Indique sua altura" />

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={alturaSelecionada}
                            style={styles.picker}
                            onValueChange={(itemValue) => setAlturaSelecionada(itemValue)}
                        >
                            {alturas.map((altura) => (
                                <Picker.Item key={altura} label={`${altura} m`} value={altura} />
                            ))}
                        </Picker>
                    </View>



                    <ButtonComponent
                        text="Salvar"
                        statusButton={true}


                    // onPress={}
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
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
    },
    label: {
      fontSize: 18,
      color: '#2B3C64',
      marginBottom: 10,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#2B3C64',
      borderRadius: 8,
      overflow: 'hidden',
    },
    picker: {
      height: 50,
      width: 200,
      color: '#2B3C64',
    },
    selectedHeight: {
      marginTop: 20,
      fontSize: 18,
      color: '#2B3C64',
    },
  });
