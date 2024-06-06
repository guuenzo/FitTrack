import styled from "styled-components";
import Theme from "../../Styles/Theme";
import { TouchableOpacity } from "react-native";

export const LeftArrowAndXStyle = styled(TouchableOpacity)`
  width: max-content;
  height: 30px;
  border-radius: 30px;
  margin: ${(props) => props.fieldMargin || "0px"};
  align-self: flex-start;
  
`;

