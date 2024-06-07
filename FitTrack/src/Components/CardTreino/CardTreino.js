import React from 'react';
import { Image, Text } from 'react-native';
import { CardAddTreinoStyle, CardTreinoStyle, CardTreinoUpdate, ContainerCardExercicio, ContainerCheckBox, ContainerTreino, ImgExe, ImgExercicio, StyledFontAwesome, TextExercicio } from './style';
import { TextMABold, TextQuickSandBold, TextTreinoBold } from '../Text/style';
import Theme from '../../Styles/Theme';
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const CardTreino = ({ onPress, text }) => {
    return (

        <CardTreinoStyle onPress={onPress}>
            <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V2} >{text.id}</TextMABold>
            <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1}>{text.grupo}</TextMABold>

        </CardTreinoStyle>

    );
};

export default CardTreino;

export const CardAddTreino = ({ onPress }) => {
    return (

        <CardAddTreinoStyle onPress={onPress}>
            <Ionicons name="add" size={35} color={Theme.colors.secondaryScale.V1} />
        </CardAddTreinoStyle>

    );
};
export const CardPersonalizeTreino = ({ onPress, selected, letra, grupo = "Vazio" }) => {
    return (

        <CardTreinoUpdate selected={selected} onPress={onPress}>
            <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1} >{letra}</TextMABold>
            <TextQuickSandBold fontSize={"16px"} color={Theme.colors.secondaryScale.V5} >{grupo}</TextQuickSandBold>
        </CardTreinoUpdate>

    );
};
export const CardGrupoTreino = ({ onPress, grupo }) => {
    return (

        <CardTreinoUpdate onPress={onPress}>
            <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1} >{grupo}</TextMABold>
        </CardTreinoUpdate>

    );
};
export const CardExercicio = ({ onPress, grupo, exercicio, img }) => {
    return (

        <ContainerCardExercicio onPress={onPress}>

            <ImgExercicio>
                <ImgExe source={{ uri: "https://blog.damamaefitness.com.br/wp-content/uploads/2020/07/Como-se-acostumar-a-ir-na-academia-frequentemente.jpg" }} />
                <StyledFontAwesome name="play" size={34} color="black" />
            </ImgExercicio>

            <TextExercicio>
                <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1} >{exercicio}</TextMABold>
            </TextExercicio>

            <ContainerCheckBox></ContainerCheckBox>
        </ContainerCardExercicio>

    );
};
