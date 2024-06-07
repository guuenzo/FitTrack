import styled from "styled-components";
import Theme from "../../Styles/Theme";

export const ContainerPesonalizeTreino = styled.View`
flex: 1;
background-color: ${Theme.colors.white.v2};
align-items: center;
`
export const ContainerCard = styled.View`
width: 90%;
justify-content: space-evenly;
align-items: flex-start;
/* border: 1px solid black; */
flex-direction: row;
margin-top: ${(props) => (props.margintop ? `${props.margintop}` : "31px")};
margin-bottom:${(props) => (props.marginbottom ? `${props.marginbottom}` : "50px")};
`