import { View } from "react-native";
import { Modal } from "react-native-paper";
import { styled } from "styled-components";

export const ModalStyle = styled(Modal).attrs({
  contentContainerStyle: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
})`
  padding: 5%;
`;

export const ModalContent = styled(View)`
  align-items: ${(props) => props.aligItems || "stretch"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  gap: ${(props) => props.gap || "0px"};
  width: ${(props) => props.width || "max-content"};
  height: ${(props) => props.height || "max-content"};
  border-radius: 10px;
`;
