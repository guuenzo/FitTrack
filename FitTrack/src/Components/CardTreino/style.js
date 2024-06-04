import styled from "styled-components";
import Theme from "../../Styles/Theme";
import { SafeAreaView, TouchableOpacity, View } from "react-native";



export const ContainerCardTreino = styled.SafeAreaView`
width: 90%;
height: 75%;
border: 1px solid black;
align-items: center;
`

export const CardTreinoStyle = styled(TouchableOpacity)`
  width: 143px;
  height: 69px;
  align-items: center;
  border-radius: 10px;
  background-color: ${Theme.colors.white.v1};
  align-self: center;
  margin: ${(props) => (props.isLast ? "25px 0 50px" : "25px 0")};
  padding: 15px;
  
  /* flex-direction: row; */
  /* justify-content: space-evenly; */
  /* background-color: red; */

  /* box-shadow para android */
  shadow-color: "black";
  shadow-opacity: 0.25;
  shadow-offset: 0px 4px;
  shadow-radius: 4px;
  elevation: 10;
`;