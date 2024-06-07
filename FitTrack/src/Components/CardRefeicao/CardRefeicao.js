import React, { useEffect } from "react";
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
import { TouchableOpacity, View } from "react-native";

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
  hasImage = false,
  onPressDeletar = () => {},
  isEditGramas = false,
  onPressEditar = () => {},
}) => {
  return (
    <InfoRefeicaoBoxNomeECalorias>
      <NomeEcaloriasBox>
        {hasImage && <ImageRefeicao source={{ uri: uriImageRefeicao }} />}

        <InfoELixeiraBox>
          <NomeEcaloriasContent>
            <TextMABold
              color={Theme.colors.secondaryScale.V1}
              fontSize={"16px"}
            >
              {nome}
            </TextMABold>

            <NomeEcaloriasContentInfo>
              <View
                style={{
                  alignSelf: "center",
                  marginRight: 5,
                }}
              >
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
              {isEditGramas && (
                <TouchableOpacity
                  onPress={onPressEditar}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 5,
                  }}
                >
                  <FontAwesome5
                    name="pen"
                    size={10}
                    color={Theme.colors.secondaryScale.V1}
                  />
                </TouchableOpacity>
              )}
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
  proteinas = 25,
  carboidratos = 25,
  gorduras = 25,
  heightProteina = 0,
  heightCarboidrato = 0,
  heightGordura = 0,
}) => {
  return (
    <InfoRefeicaoBoxMacros>
      <MacroBox>
        <IndiceMacroBox>
          {/* fazer lógica para altura se equivalente a porcentagem do macronutriente dentro da refeição/alimento */}
          <IndiceMacro height={heightProteina} macro={"Proteina"} />
        </IndiceMacroBox>
        <MacroTextBox>
          <TextMABold fontSize={"14px"} color={Theme.colors.secondaryScale.V1}>
            {proteinas} g
          </TextMABold>
          <TextQuickSandBold>Proteínas</TextQuickSandBold>
        </MacroTextBox>
      </MacroBox>
      <MacroBox>
        <IndiceMacroBox>
          <IndiceMacro height={heightCarboidrato} macro={"Carboidrato"} />
        </IndiceMacroBox>
        <MacroTextBox>
          <TextMABold color={Theme.colors.secondaryScale.V1}>
            {carboidratos} g
          </TextMABold>
          <TextQuickSandBold>Carboidratos</TextQuickSandBold>
        </MacroTextBox>
      </MacroBox>
      <MacroBox>
        <IndiceMacroBox>
          <IndiceMacro height={heightGordura} macro={"Gordura"} />
        </IndiceMacroBox>
        <MacroTextBox>
          <TextMABold color={Theme.colors.secondaryScale.V1}>
            {gorduras} g
          </TextMABold>
          <TextQuickSandBold>Gorduras</TextQuickSandBold>
        </MacroTextBox>
      </MacroBox>
    </InfoRefeicaoBoxMacros>
  );
};

const CardRefeicao = ({
  nome = "Default",
  pesoRefeicao = 100,
  kcal = 100,
  proteinas = 25,
  carboidratos = 25,
  gorduras = 25,
  onPress,
  onPressDeletar,
  isRefeicao = false,
  heightProteina = 0,
  heightCarboidrato = 0,
  heightGordura = 0,
  hasImage,
  isEditGramas,
  isClickable = false,
  onPressEditar = () => {},
}) => {
  return (
    //isLast: se for o último card de um flatList, aplica 50px de margin bottom, ao invés de 25px
    <CardStyle isClickable={isClickable} isLast={false} onPress={onPress}>
      <CardInfoRefeicao
        onPressEditar={onPressEditar}
        isEditGramas={isEditGramas}
        hasImage={hasImage}
        onPressDeletar={onPressDeletar}
        nome={nome}
        pesoRefeicao={pesoRefeicao}
        kcal={kcal}
        isRefeicao={isRefeicao}
      />
      <CardMacros
        heightProteina={heightProteina}
        heightCarboidrato={heightCarboidrato}
        heightGordura={heightGordura}
        carboidratos={carboidratos}
        gorduras={gorduras}
        proteinas={proteinas}
      />
    </CardStyle>
  );
};

export default CardRefeicao;
