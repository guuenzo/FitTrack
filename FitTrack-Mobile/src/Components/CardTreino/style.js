import styled from "styled-components";
import Theme from "../../Styles/Theme";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const ContainerCardTreino = styled.SafeAreaView`
  width: 100%;
  /* border: 1px solid black; */
  align-items: center;
  justify-content: center;
`;

export const CardTreinoStyle = styled(TouchableOpacity)`
  width: 143px;
  height: 69px;
  align-items: center;
  border-radius: 10px;
  background-color: ${Theme.colors.white.v1};
  align-self: center;
  margin: ${(props) => (props.isLast ? "25px 0 50px" : "25px 0")};
  padding: 15px;
  margin-left: 15px;

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

export const CardAddTreinoStyle = styled(CardTreinoStyle)`
  margin: 25px 0;
  justify-content: center;
  align-items: center;
`;

export const CardTreinoUpdate = styled(TouchableOpacity)`
  width: 143px;
  height: 69px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-left: 19px;
  background-color: ${Theme.colors.white.v1};
  ${(props) => (props.selected ? "border: 2px solid #2B3C64" : null)};

  shadow-color: "black";
  shadow-opacity: 0.25;
  shadow-offset: 0px 4px;
  shadow-radius: 4px;
  elevation: 10;
`;

export const ContainerCardExercicio = styled.TouchableOpacity`
  width: 95%;
  height: 69px;
  border-radius: 8px;
  margin-bottom: 20px;
  /* border: 1px solid black; */
  flex-direction: row;
  align-items: center;
  align-self: center;
  background-color: ${Theme.colors.white.v1};
  shadow-color: "black";
  shadow-opacity: 0.25;
  shadow-offset: 0px 4px;
  shadow-radius: 4px;
  elevation: 10;
`;

export const ImgExercicio = styled.TouchableOpacity`
  width: 83px;
  height: 69px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-right: 20px;
`;
export const ContainerCheckBox = styled.View`
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export const ImgExe = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  position: absolute;
  z-index: 1;
`;
export const StyledFontAwesome = styled(FontAwesome)`
  position: absolute;
  z-index: 100000000; /* ou qualquer outro valor que você deseja */
  opacity: 0.7;
`;
export const TextExercicio = styled.View`
  width: 110px;
  height: 46px;
  justify-content: center;
  margin-right: 27px;
  /* border: 1px solid green; */
`;
