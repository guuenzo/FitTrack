import { Dialog, Portal } from "react-native-paper";
import {
  DialogContent,
  DialogContentText,
  DialogStyle,
  DialogTitle,
} from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MainContentScroll } from "../Container/style";
import Theme from "../../Styles/Theme";

const DialogComponent = ({
  visible,
  setVisible,
  status = "erro",
  title = status === "erro"
    ? "Erro"
    : status === "sucesso"
    ? "Sucesso"
    : "Alerta",
  contentMessage = "This is simple dialog",
  setDialog,
  onClose = () => {},
}) => {
  const hideDialog = () => {
    setVisible(false);

    if (onClose) {
      onClose();
    }
  };

  return (
    <Portal>
      <DialogStyle status={status} visible={visible} onDismiss={hideDialog}>
        {status === "erro" ? (
          <MaterialIcons
            name="disabled-by-default"
            size={70}
            color={Theme.colors.red.v1}
            style={{ alignSelf: "center" }}
          />
        ) : status === "sucesso" ? (
          <AntDesign
            name="checksquare"
            size={60}
            color={Theme.colors.secondaryScale.V1}
            style={{ alignSelf: "center" }}
          />
        ) : (
          <FontAwesome5
            name="exclamation-triangle"
            size={60}
            color={"#F8AE3F"}
            style={{ alignSelf: "center" }}
          />
        )}

        {/* <DialogIcon
          size={26}
          status={status}
          icon={
            status === "erro"
              ? "alert"
              : status === "alerta"
              ? "alert"
              : "check"
          }
          color={
            status === "erro"
              ? Theme.colors.redColor
              : status === "sucesso"
              ? Theme.colors.primary
              : Theme.colors.orangeColor
          }
        /> */}

        <DialogTitle status={status}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentMessage}</DialogContentText>
        </DialogContent>
      </DialogStyle>
    </Portal>
  );
};

export default DialogComponent;

export const DialogSelectLocation = ({ visible, setVisible }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Actions style={{ flexDirection: "column" }}>
          <MainContentScroll
            style={{
              backgroundColor: "transparent",
              width: "100%",
              height: "100%",
            }}
          ></MainContentScroll>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
