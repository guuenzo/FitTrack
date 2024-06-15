import styled from "styled-components";
import Theme from "../../Styles/Theme";

export const ContainerExercicios = styled.View`
  width: ${(props) => props.fieldWidth || "80%"};
  height: max-content;
  margin-bottom: 7%;
  margin-top: 33px;
  align-items: center;
  /* border: 1px solid black; */
`;

export const ContainerTextGrupo = styled.View`
  width: 45%;
  height: 30px;
  border-bottom-width: 2px;
  border-bottom-color: ${Theme.colors.secondaryScale.V1};
  margin-bottom: 30px;
  margin-left: 2.5%;
  margin-top: 30px;
`;
export const TextGrupo = styled.Text`
  font-family: ${Theme.fonts.montserratAlternates.MontserratAlternates_700Bold};
  color: ${Theme.colors.secondaryScale.V1};
  font-size: 17px;
`;
