import styled from "styled-components";
import Theme from "../../Styles/Theme";
import { SafeAreaView, TouchableOpacity, View } from "react-native";



export const ContainerTreino = styled.SafeAreaView`
width: 100%;
border: 1px solid black;
justify-content: flex-end;
align-items: flex-end;
flex-direction: row;




`

export const CardTreinoStyle = styled(TouchableOpacity)`
  width: 35%;
  height: 69px;
  /* flex-direction: row; */
  align-items: center;
  justify-content: space-evenly;
  /* background-color: red; */
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