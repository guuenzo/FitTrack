import { useContext, useEffect, useState } from "react";
import { Portal } from "react-native-paper";
import Title from "../Title/Title";
import { ButtonComponent, ButtonComponentDefault, ButtonSecondary } from "../Button/Button";
import Theme from "../../Styles/Theme";
import { InputDefault } from "../Input/Input";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { ModalContent, ModalStyle } from "../Modal/style";
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from "../../Contexts/AuthContext";
import { api } from "../../Services/Service";


export const ModalObejetivo = ({
    exibeModal = false,
    setExibeModal,
    objetivoInicial
}) => {
    const hideModal = () => setExibeModal(false);
    const [objetivo, setObjetivo] = useState("")
    const { userGlobalData, setUserGlobalData } = useContext(AuthContext);

    const objetivos = [
        { label: "Bulking", value: "65b5c834-a90e-4abc-876e-9033d7193f7d" },
        { label: "Cutting", value: "d786dc80-eef0-4f81-bced-0df2e53080ff" },
        { label: "Manter", value: "11b0f4c1-a4d6-4793-8763-3368a0923dd4" },
    ];

    const updateObjetivo = async (objetivo) => {
        try {
            await api.patch(
                `/Usuario/AlterarDadosPerfil?idUsuario=${userGlobalData.id}`,
                {
                    idUsuarioObjetivo: objetivo
                },
                {
                    headers: {
                        'Content-Type': 'application/json-patch+json',
                        'Accept': '*/*'
                    }
                }
            );
            console.log('Objetivo atualizado com sucesso');
            setExibeModal(false); 
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        setObjetivo(objetivoInicial)
        console.log(objetivo);
    }, [exibeModal])
    return (
        <Portal>
            <ModalStyle fieldPadding={20} visible={exibeModal} onDismiss={hideModal}>
                <ModalContent gap={"20px"} aligItems={"center"}>

                    <Title text="Selecione seu objetivo" />

                    <View
                    />
                    <View style={styles.objectiveContainer}>
                        {objetivos.map((obj) => (
                            <TouchableOpacity
                                key={obj.value}
                                style={[
                                    styles.objectiveButton,
                                    objetivo === obj.value && styles.selectedObjectiveButton
                                ]}
                                onPress={() => setObjetivo(obj.value)}
                            >
                                <Text
                                    style={[
                                        styles.objectiveButtonText,
                                        objetivo === obj.value && styles.selectedObjectiveButtonText
                                    ]}
                                >
                                    {obj.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>



                    <ButtonComponent
                        text="Salvar"
                        statusButton={true}


                    onPress={()=> updateObjetivo(objetivo)}
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
    objectiveContainer: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    objectiveButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#2B3C64',
        borderRadius: 8,
        margin: 5,
    },
    selectedObjectiveButton: {
        backgroundColor: '#2B3C64',
    },
    objectiveButtonText: {
        color: '#2B3C64',
    },
    selectedObjectiveButtonText: {
        color: '#FFF',
    },
});