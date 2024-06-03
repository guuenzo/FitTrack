import React from 'react';
import { Text } from 'react-native';
import { CardTreinoStyle } from './style';
import { TextMABold } from '../Text/style';

const CardTreino = ({ onPress, text }) => {
    return (

        <CardTreinoStyle>
            <TextMABold>{text.id}</TextMABold>
            <Text>{text.grupo}</Text>
        </CardTreinoStyle>


    );
};

export default CardTreino;