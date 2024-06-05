import { View } from "react-native";
import { Modal } from "react-native-paper";
import { styled } from "styled-components";

export const ModalStyle = styled(Modal)`
  padding: 5%;
  border-radius: 10px;
`;

export const ModalContent = styled(View)`
  align-items: ${(props) => props.aligItems || "stretch"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  gap: ${(props) => props.gap || "0px"};
  width: ${(props) => props.width || "max-content"};
  height: ${(props) => props.height || "max-content"};
  border-radius: 10px;
`;
