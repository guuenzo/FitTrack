import { FlatList } from "react-native";
import { styled } from "styled-components";

export const FlatListStyle = styled(FlatList).attrs({ scrollEnabled: false })`
  width: 100%;
  margin: ${(props) => props.fieldMargin || "0px"};
`;
