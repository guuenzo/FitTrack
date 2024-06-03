import { View } from "react-native";
import styled from "styled-components";

export const InfoGlobalBox = styled(View)`
  width: 100%;
  height: max-content;
  margin: 30px 0 0 0;
  gap: 5px;
`;

export const InfoGlobalBoxTop = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

export const InfoGlobalBoxBottom = styled(InfoGlobalBoxTop)`
  margin: 0;
`;
