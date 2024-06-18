import React, { useState } from "react";
import { Tooltip, Text } from "react-native-elements";
import Theme from "../../Styles/Theme";
import { TextMABold } from "../Text/style";
import { View } from "react-native";

const TooltipComponent = ({
  textPrincipal = "textPrincipal",
  textoTooltip = "textoTooltip",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      backgroundColor={Theme.colors.secondaryScale.V1}
      overlayColor="transparent"
      visible={open}
      height={95}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => setOpen(false)}
      popover={
        <View>
          <TextMABold fontSize={"16px"} style={{ color: "white" }}>
            {textoTooltip}
          </TextMABold>
        </View>
      }
    >
      <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1}>
        {textPrincipal.substring(0, 6)}
        {textPrincipal.length > 6 && "..."}
      </TextMABold>
    </Tooltip>
  );
};

export default TooltipComponent;
