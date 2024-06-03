import React from "react";
import {
  BotaoExcluir,
  CardStyle,
  ImageRefeicao,
  IndiceMacro,
  IndiceMacroBox,
  InfoELixeiraBox,
  InfoRefeicaoBoxMacros,
  InfoRefeicaoBoxNomeECalorias,
  MacroBox,
  MacroTextBox,
  NomeEcaloriasBox,
  NomeEcaloriasContent,
  NomeEcaloriasContentInfo,
  Point,
} from "./style";
import { Ionicons } from "@expo/vector-icons";
import Theme from "../../Styles/Theme";
import { TextMABold, TextQuickSandBold } from "../Text/style";
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";

export const CardAdicionarRefeicao = ({ onPress }) => {
  return (
    <CardStyle onPress={onPress} isLast>
      <Ionicons name="add" size={40} color={Theme.colors.secondaryScale.V1} />
    </CardStyle>
  );
};

const CardInfoRefeicao = ({
  nome = "Lasanha",
  pesoRefeicao = 100,
  kcal = 100,
  uriImageRefeicao = "https://abrasel.com.br/site/assets/files/11226/prato_feito.500x0-is.jpg",
  //valida caso o card seja usado para exibir uma refeição ou um alimento
  isRefeicao = false,
  onPressDeletar,
}) => {
  return (
    <InfoRefeicaoBoxNomeECalorias>
      <NomeEcaloriasBox>
        {isRefeicao && <ImageRefeicao source={{ uri: uriImageRefeicao }} />}

        <InfoELixeiraBox>
          <NomeEcaloriasContent>
            <TextMABold
              color={Theme.colors.secondaryScale.V1}
              fontSize={"16px"}
            >
              {nome}
            </TextMABold>

            <NomeEcaloriasContentInfo>
              <View style={{ alignSelf: "center", marginRight: 5 }}>
                <FontAwesome5
                  name="gripfire"
                  size={15}
                  color={Theme.colors.secondaryScale.V5}
                />
              </View>
              <TextQuickSandBold fontSize={"14px"}>
                {kcal} kcal
              </TextQuickSandBold>
              <Point />
              <TextQuickSandBold fontSize={"14px"}>
                {pesoRefeicao} G
              </TextQuickSandBold>
            </NomeEcaloriasContentInfo>
          </NomeEcaloriasContent>
          {!isRefeicao && (
            <BotaoExcluir onPress={onPressDeletar}>
              <FontAwesome5
                name="trash"
                size={16}
                color={Theme.colors.red.v1}
              />
            </BotaoExcluir>
          )}
        </InfoELixeiraBox>
      </NomeEcaloriasBox>
    </InfoRefeicaoBoxNomeECalorias>
  );
};

const CardMacros = ({
  quantidadeProteinas = 25,
  quantidadeCarboidratos = 25,
  quantidadeGorduras = 25,
}) => {
  return (
    <InfoRefeicaoBoxMacros>
      <MacroBox>
        <IndiceMacroBox>
          {/* fazer lógica para altura se equivalente a porcentagem do macronutriente dentro da refeição/alimento */}
          <IndiceMacro height={20} macro={"Proteina"} />
        </IndiceMacroBox>
        <MacroTextBox>
          <TextMABold fontSize={"14px"} color={Theme.colors.secondaryScale.V1}>
            {quantidadeProteinas} g
          </TextMABold>
          <TextQuickSandBold>Proteínas</TextQuickSandBold>
        </MacroTextBox>
      </MacroBox>
      <MacroBox>
        <IndiceMacroBox>
          <IndiceMacro height={80} macro={"Carboidrato"} />
        </IndiceMacroBox>
        <MacroTextBox>
          <TextMABold color={Theme.colors.secondaryScale.V1}>
            {quantidadeCarboidratos} g
          </TextMABold>
          <TextQuickSandBold>Carboidratos</TextQuickSandBold>
        </MacroTextBox>
      </MacroBox>
      <MacroBox>
        <IndiceMacroBox>
          <IndiceMacro height={7} macro={"Gordura"} />
        </IndiceMacroBox>
        <MacroTextBox>
          <TextMABold color={Theme.colors.secondaryScale.V1}>
            {quantidadeGorduras} g
          </TextMABold>
          <TextQuickSandBold>Gorduras</TextQuickSandBold>
        </MacroTextBox>
      </MacroBox>
    </InfoRefeicaoBoxMacros>
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
  onPressDeletar,
  isRefeicao = false,
}) => {
  return (
    //isLast: se for o último card de um flatList, aplica 50px de margin bottom, ao invés de 25px
    <CardStyle isLast={false} onPress={onPress}>
      <CardInfoRefeicao
        onPressDeletar={onPressDeletar}
        nome={nome}
        pesoRefeicao={pesoRefeicao}
        kcal={kcal}
        isRefeicao={isRefeicao}
      />
      <CardMacros
        quantidadeCarboidratos={quantidadeCarboidratos}
        quantidadeGorduras={quantidadeGorduras}
        quantidadeProteinas={quantidadeProteinas}
      />
    </CardStyle>
  );
};

export default CardRefeicao;
