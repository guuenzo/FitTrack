import * as React from "react";
import { Button, Text } from "react-native-paper";

const ButtonComponent = ({
  text = "Press me",
  statusButton = false,
  onPress,
}) => {
  return (
    <Button
      style={{
        height: 45,
        width: 125,
        backgroundColor: statusButton ? "#2B3C64" : "transparent",
      }}
      mode="contained"
      onPress={onPress}
    >
      <Text style={{ color: "#Fff" }}>{text.toUpperCase()}</Text>
    </Button>
  );
};
export default ButtonComponent;
