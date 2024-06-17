import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Portal } from 'react-native-paper';
import Title from '../Title/Title';
import { ButtonComponent, ButtonSecondary } from '../Button/Button';
import Theme from '../../Styles/Theme';
import { ModalContent, ModalStyle } from '../Modal/style';
import { api } from '../../Services/Service';
import { AuthContext } from '../../Contexts/AuthContext';

export const ModalPeso = ({
    exibeModal = false,
    setExibeModal,
    pesoInicial = 0
}) => {
    const [peso, setPeso] = useState("");
    const hideModal = () => setExibeModal(false);
    const { userGlobalData, setUserGlobalData } = useContext(AuthContext);

    const formatPeso = (text) => {
        let cleaned = ('' + text).replace(/[^0-9]/g, '');
        if (cleaned.length <= 2) {
            return cleaned;
        } else if (cleaned.length <= 4) {
            return cleaned.slice(0, 2) + '.' + cleaned.slice(2);
        } else {
            return cleaned.slice(0, 2) + '.' + cleaned.slice(2, 4);
        }
    };

    const handleChange = (text) => {
        const formatted = formatPeso(text);
        setPeso(formatted);
    };

    async function updatePeso(novoPeso) {
        try {
            const response = await api.patch(
                `/Usuario/AlterarDadosPerfil?idUsuario=${userGlobalData.id}`, {
                peso : novoPeso
            },
                {
                    headers: {
                        'Content-Type': 'application/json-patch+json',
                        'Accept': '*/*'
                    }
                }
            )
            
            setExibeModal(false)
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        setPeso(pesoInicial)
    }, [exibeModal])

    return (
        <Portal>

            <ModalStyle visible={exibeModal} onDismiss={hideModal}>
                <ModalContent gap={"25px"} aligItems={"center"}>
                    <Title text="Indique seu peso" />

                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu peso"
                            value={peso}
                            placeholderTextColor="#2B3C64"
                            onChangeText={handleChange}
                            keyboardType="numeric"
                        />
                    </View>

                    <ButtonComponent
                        text="Salvar"
                        statusButton={true}
                        onPress={()=> updatePeso(peso)}
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
