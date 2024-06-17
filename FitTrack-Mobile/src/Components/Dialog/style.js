import { Dialog } from "react-native-paper";
import styled from "styled-components";
import Theme from "../../Styles/Theme";
import { TextQuickSandBold } from "../Text/style";

export const DialogStyle = styled(Dialog)`
  background-color: ${(props) =>
    props.status === "erro" ? Theme.colors.white.v2 : "#fff"};
  z-index: 100;
`;

export const DialogTitle = styled(Dialog.Title)`
  text-align: center;
  font-family: "MontserratAlternates_500Medium";
  color: ${(props) =>
    props.status === "erro"
      ? Theme.colors.red.v1
      : props.status === "sucesso"
      ? Theme.colors.secondaryScale.V1
      : "#F8AE3F"};
`;

export const DialogIcon = styled(Dialog.Icon)`
  color: ${(props) =>
    props.status === "erro"
      ? Theme.colors.red.v1
      : props.status === "sucesso"
      ? Theme.colors.secondaryScale.V1
      : "#F8AE3F"};
`;

export const DialogContent = styled(Dialog.Content)``;

export const DialogContentText = styled(TextQuickSandBold)`
  text-align: center;
`;
