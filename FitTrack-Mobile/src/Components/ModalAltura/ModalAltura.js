import { useEffect, useState } from "react";
import { Portal } from "react-native-paper";
import Title from "../Title/Title";
import { ButtonComponent, ButtonComponentDefault, ButtonSecondary } from "../Button/Button";
import Theme from "../../Styles/Theme";
import { InputDefault } from "../Input/Input";
import { StyleSheet, TextInput, View } from "react-native";
import { ModalContent, ModalStyle } from "../Modal/style";
import { Picker } from '@react-native-picker/picker';


export const ModalAltura = ({
    exibeModal = false,
    setExibeModal,
    alturaInicial
}) => {
    const hideModal = () => setExibeModal(false);
    const [altura, setAltura] = useState('');

    const formatAltura = (text) => {
        // Remove non-numeric characters
        let cleaned = ('' + text).replace(/[^0-9]/g, '');

        // Format the number as X.XX
        if (cleaned.length <= 1) {
            return cleaned;
        } else if (cleaned.length <= 3) {
            return cleaned.slice(0, 1) + '.' + cleaned.slice(1);
        } else {
            return cleaned.slice(0, 1) + '.' + cleaned.slice(1, 3);
        }
    };

    const handleChange = (text) => {
        const formatted = formatAltura(text);
        setAltura(formatted);
    };

    useEffect(() => {
        setAltura(alturaInicial)
    }, [exibeModal]);
    return (
        <Portal>
            <ModalStyle visible={exibeModal} onDismiss={hideModal}>
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
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#2B3C64',
        borderRadius: 8,
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        width: '100%',
        textAlign: 'center',
        borderRadius: 8,
        color: '#2B3C64',
    },
  });
