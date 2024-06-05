import { Image, TouchableOpacity, View } from "react-native";
import { styled } from "styled-components";
import Theme from "../../Styles/Theme";

export const CardStyle = styled(TouchableOpacity)`
  width: 95%;
  height: 140px;
  align-items: center;
  justify-content: center;
  background-color: red;
  border-radius: 10px;
  background-color: ${Theme.colors.white.v1};
  align-self: center;
  margin: ${(props) => (props.isLast ? "25px 0 50px" : "25px 0")};
  padding: 15px;

  /* box-shadow para android */
  shadow-color: "black";
  shadow-opacity: 0.25;
  shadow-offset: 0px 4px;
  shadow-radius: 4px;
  elevation: 10;
`;

export const InfoRefeicaoBoxNomeECalorias = styled(View)`
  width: 100%;
  height: 50%;
  flex-direction: row;
`;

export const NomeEcaloriasBox = styled(View)`
  width: 100%;
  height: 100%;
  flex-direction: row;
`;

export const NomeEcaloriasContent = styled(View)`
  width: max-content;
  height: 100%;
`;

export const BotaoExcluir = styled(TouchableOpacity)`
  padding: 0 0 0 20px;
`;

export const InfoELixeiraBox = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const NomeEcaloriasContentInfo = styled(View)`
  width: max-content;
  height: max-content;
  flex-direction: row;
`;

export const Point = styled(View)`
  width: 5px;
  height: 5px;
  background-color: ${Theme.colors.secondaryScale.V1};
  border-radius: 100px;
  align-self: center;
  justify-self: center;
  margin: 0 10px;
`;

export const ImageRefeicao = styled(Image)`
  width: 67px;
  height: 60px;
  border-radius: 10px;
  margin-right: 10px;
`;

export const InfoRefeicaoBoxMacros = styled(View)`
  width: 100%;
  height: 50%;
  flex-direction: row;
  justify-content: space-between;
`;

export const MacroBox = styled(View)`
  height: 100%;
  width: max-content;
  flex-direction: row;
  gap: 7px;
  align-items: flex-end;
  justify-content: center;
`;

export const MacroTextBox = styled(View)``;

export const IndiceMacroBox = styled(View)`
  width: 6px;
  height: 65%;
  border-radius: 10px;
  background-color: rgba(172, 171, 183, 0.851);
  flex-direction: column-reverse;
`;

export const IndiceMacro = styled(View)`
  width: 100%;
  height: ${(props) => (props.height ? `${props.height}%` : "0%")};
  border-radius: 10px;
  background-color: ${(props) =>
    props.macro === "Proteina"
      ? Theme.colors.green.v1
      : props.macro === "Carboidrato"
      ? Theme.colors.yellow.v1
      : Theme.colors.purple.v1};
`;
