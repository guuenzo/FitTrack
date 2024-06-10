import styled from "styled-components";
import Theme from "../../Styles/Theme";

export const ContainerExercicios = styled.ScrollView`
    width: 80%;
    height: 60.61%;
    margin-bottom: 7%;
    margin-top: 33px;
    /* border: 1px solid black; */
    /* align-items: center; */
`

export const ContainerTextGrupo = styled.View`
    width: 144px;
    height: 30px;
    border-bottom-width: 2px;
    border-bottom-color: ${Theme.colors.secondaryScale.V1};
    margin-bottom: 30px;
  
`
export const TextGrupo = styled.Text`
 font-family: ${Theme.fonts.montserratAlternates.MontserratAlternates_700Bold};
  color: ${Theme.colors.secondaryScale.V1};
  font-size: 17px;
`