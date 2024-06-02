import React from "react";
import {
  CardStyle,
  InfoRefeicaoBoxMacros,
  InfoRefeicaoBoxNomeECalorias,
} from "./style";
import { Ionicons } from "@expo/vector-icons";
import Theme from "../../Styles/Theme";

export const CardAdicionarRefeicao = ({ onPress }) => {
  return (
    <CardStyle onPress={onPress} isLast>
      <Ionicons name="add" size={40} color={Theme.colors.secondaryScale.V1} />
    </CardStyle>
  );
};

const CardRefeicao = ({
  nome = "Lasanha",
  pesoRefeicao = 100,
  kcal = 100,
  quantidadeProteinas = 25,
  quantidadeCarboidratos = 25,
  quantidadeGorduras = 25,
  onPress,
}) => {
  return (
    <CardStyle isLast={false} onPress={onPress}>
      <InfoRefeicaoBoxNomeECalorias></InfoRefeicaoBoxNomeECalorias>
      <InfoRefeicaoBoxMacros></InfoRefeicaoBoxMacros>
    </CardStyle>
  );
};

export default CardRefeicao;
