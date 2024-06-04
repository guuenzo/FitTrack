import React from 'react';
import { Text } from 'react-native';
import { CardTreinoStyle, ContainerTreino } from './style';
import { TextMABold, TextTreinoBold } from '../Text/style';
import Theme from '../../Styles/Theme';

const CardTreino = ({ onPress, text }) => {
    return (

        <CardTreinoStyle>
            <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V2} >{text.id}</TextMABold>
            <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1}>{text.grupo}</TextMABold>

        </CardTreinoStyle>

    );
};

export default CardTreino;