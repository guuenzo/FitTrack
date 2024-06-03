import styled from "styled-components";
import Theme from "../../Styles/Theme";

export const LeftArrowAndXStyle = styled.View`
  width: 100%;
  height: 30px;
  border-radius: 30px;
  flex-direction: row;
  margin: ${(props) => props.fieldMargin || "0px"};
  align-items: center;
  justify-content: center;
  background-color: red;
`;

export const LeftArrowAndXStyleCamera = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  top: 0px;
  left: 0px;
  width: auto;
  height: auto;
  position: relative;
  background-color: ${Theme.colors.white.v1};
`;
