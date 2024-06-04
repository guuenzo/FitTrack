import React from 'react';
import { Text } from 'react-native';
import { CardAddTreinoStyle, CardTreinoStyle, ContainerTreino } from './style';
import { TextMABold, TextTreinoBold } from '../Text/style';
import Theme from '../../Styles/Theme';
import { Ionicons } from "@expo/vector-icons";


const CardTreino = ({ onPress, text }) => {
    return (

        <CardTreinoStyle >
            <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V2} >{text.id}</TextMABold>
            <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1}>{text.grupo}</TextMABold>

        </CardTreinoStyle>

    );
};

export default CardTreino;

export const CardAddTreino = ({ onPress }) => {
    return (

        <CardAddTreinoStyle>
            <Ionicons name="add" size={35} color={Theme.colors.secondaryScale.V1} />
        </CardAddTreinoStyle>

    );
};
