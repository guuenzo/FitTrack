import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { InfoGlobalBox, InfoGlobalBoxBottom, InfoGlobalBoxTop } from "../style";
import { TextMABold, TextQuickSandBold } from "../../../Components/Text/style";
import Theme from "../../../Styles/Theme";
import { TouchableOpacity, View } from "react-native";
import {
  ContainerMacroTotalStyle,
  ContainerMacroValorStyle,
  MacroBoxIndividualLabel,
  MacroBoxIndividualStyle,
  MacrosBoxStyle,
} from "./style";

const InfoGlobalBoxComponent = ({
  nomeRefeicao = "Lasanha",
  pesoRefeicao = 700,
  caloriasRefeicao = 1500,
  onPressAtualizarNome = () => {},
}) => {
  return (
    <InfoGlobalBox>
      <InfoGlobalBoxTop>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={onPressAtualizarNome}
            style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
          >
            <TextMABold
              fontSize={"16px"}
              color={Theme.colors.secondaryScale.V1}
            >
              {nomeRefeicao}
            </TextMABold>
            <FontAwesome5
              name="pen"
              size={10}
              color={Theme.colors.secondaryScale.V1}
            />
          </TouchableOpacity>
        </View>
        <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1}>
          {pesoRefeicao} G
        </TextMABold>
      </InfoGlobalBoxTop>
      <InfoGlobalBoxBottom>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TextQuickSandBold
            fontSize={"14px"}
            color={Theme.colors.secondaryScale.V5}
          >
            Valores nutricionais:
          </TextQuickSandBold>
        </View>
        <TextQuickSandBold
          fontSize={"14px"}
          color={Theme.colors.secondaryScale.V5}
        >
          {caloriasRefeicao} Kcal
        </TextQuickSandBold>
      </InfoGlobalBoxBottom>
    </InfoGlobalBox>
  );
};

export const MacronutrientesRefeicaoBox = ({
  quantidadeProteinas = 50,
  quantidadeCarboidratos = 25,
  quantidadeGorduras = 25,
  widthProteinas = 0,
  widthCarboidratos = 0,
  widthGorduras = 0,
}) => {
  return (
    <MacrosBoxStyle>
      <MacroBoxIndividual
        quantidadeMacro={quantidadeProteinas}
        macro="Proteínas"
        width={widthProteinas}
      />
      <MacroBoxIndividual
        quantidadeMacro={quantidadeCarboidratos}
        macro="Carboidratos"
        width={widthCarboidratos}
      />
      <MacroBoxIndividual
        quantidadeMacro={quantidadeGorduras}
        macro="Gorduras"
        width={widthGorduras}
      />
    </MacrosBoxStyle>
  );
};

const MacroBoxIndividual = ({ quantidadeMacro = 25, width = 0, macro }) => {
  return (
    <MacroBoxIndividualStyle>
      <MacroBoxIndividualLabel>
        <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1}>
          {macro}
        </TextMABold>

        <TextQuickSandBold
          fontSize={"14px"}
          color={Theme.colors.secondaryScale.V5}
        >
          {quantidadeMacro} G
        </TextQuickSandBold>
      </MacroBoxIndividualLabel>
      <ContainerMacroTotal width={width} macro={macro} />
    </MacroBoxIndividualStyle>
  );
};

const ContainerMacroTotal = ({ width = 0, macro = "Proteina" }) => {
  return (
    <ContainerMacroTotalStyle>
      <ContainerMacroValorStyle width={width} macro={macro} />
    </ContainerMacroTotalStyle>
  );
};

export default InfoGlobalBoxComponent;
