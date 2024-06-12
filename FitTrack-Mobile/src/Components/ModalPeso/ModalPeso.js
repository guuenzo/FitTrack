import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Title from '../Title/Title';
import { ButtonComponent, ButtonSecondary } from '../Button/Button';
import Theme from '../../Styles/Theme';
import { ModalContent, ModalStyle } from '../Modal/style';

export const ModalPeso = ({
    exibeModal = false,
    setExibeModal,
}) => {
    const hideModal = () => setExibeModal(false);
    const [pesoSelecionado, setPesoSelecionado] = useState(null);
    const [peso, setPeso] = useState([]);

    useEffect(() => {
        loadWeights();
    }, []);

    const loadWeights = () => {
        // Criar array de pesos de 30 a 200
        const pesoArray = Array.from({ length: 171 }, (_, i) => 30 + i);
        // Adicionar a opção "Selecione peso" no início do array
        const pesoArrayOpcoes = [{ label: "Selecione peso", value: null }, ...pesoArray.map(peso => ({ label: `${peso} kg`, value: peso.toString() }))];
        setPeso(pesoArrayOpcoes);
        setPesoSelecionado(null); // Reiniciar o valor selecionado quando os pesos são carregados
    };

    return (
        <Portal>
            <ModalStyle visible={exibeModal} onDismiss={hideModal}>
                <ModalContent gap={"25px"} aligItems={"center"}>
                    <Title text="Indique seu peso" />

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={pesoSelecionado}
                            style={styles.picker}
                            onValueChange={(itemValue) => setPesoSelecionado(itemValue)}
                        >
                            {peso.map((peso, index) => (
                                <Picker.Item key={index} label={peso.label} value={peso.value} />
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
