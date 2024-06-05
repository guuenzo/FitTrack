import { View } from "react-native";
import { styled } from "styled-components";
import Theme from "../../../Styles/Theme";

export const MacrosBoxStyle = styled(View)`
  width: 100%;
  height: max-content;
  margin-top: 26px;
`;

export const MacroBoxIndividualStyle = styled(View)`
  width: 100%;
  height: max-content;
  /* background-color: green; */
  margin-bottom: 17px;
`;

export const MacroBoxIndividualLabel = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: max-content;
`;

export const ContainerMacroTotalStyle = styled(View)`
  width: 100%;
  height: 7px;
  border-radius: 10px;
  background-color: rgba(172, 171, 183, 0.851);
  margin-top: 10px;
  flex-direction: column-reverse;
`;

export const ContainerMacroValorStyle = styled(ContainerMacroTotalStyle)`
  height: 100%;
  width: ${(props) => (props.width ? `${props.width}%` : "0%")};

  background-color: ${(props) =>
    props.macro === "Proteínas"
      ? Theme.colors.green.v1
      : props.macro === "Carboidratos"
      ? Theme.colors.yellow.v1
      : Theme.colors.purple.v1};
`;
