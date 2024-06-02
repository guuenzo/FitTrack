import { TouchableOpacity, View } from "react-native";
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
  padding: 12px;

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

export const InfoRefeicaoBoxMacros = styled(View)`
  width: 100%;
  height: 50%;
  flex-direction: row;
  justify-content: space-between;
`;
