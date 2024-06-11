import { useEffect, useState } from "react";
import { Portal } from "react-native-paper";
import Title from "../Title/Title";
import { ButtonComponent, ButtonComponentDefault, ButtonSecondary } from "../Button/Button";
import Theme from "../../Styles/Theme";
import { InputDefault } from "../Input/Input";
import { View } from "react-native";
import { ModalContent, ModalStyle } from "../Modal/style";
import { InputSelect } from "../InputSelect/InputSelect";


export const ModalObejetivo = ({
    exibeModal = false,
    setExibeModal,
}) => {
    const hideModal = () => setExibeModal(false);
    const [objetivoSelecionado, setObjetivoSelecionado] = useState("")
    return (
        <Portal>
            <ModalStyle visible={exibeModal} onDismiss={hideModal}>
                <ModalContent gap={"50px"} aligItems={"center"}>

                    <Title text="Selecione seu objetivo" />


                    <InputSelect
                        setObjetivoSelecionado={setObjetivoSelecionado}
                    />

                    <ButtonComponent
                        text="Salvar"
                        statusButton={true}
                        // onPress={}
                    />

                    <ButtonSecondary
                        colorText={Theme.colors.secondaryScale.V1}
                        textButton="Cancelar"
                        onPress={() => setExibeModal(false)}
                    />

                </ModalContent>
            </ModalStyle>
        </Portal>
    )
}