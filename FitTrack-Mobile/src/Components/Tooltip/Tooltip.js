import React, { useState } from "react";
import { View, Text } from "react-native";
import { Tooltip } from "react-native-walkthrough-tooltip";
import { Button, Title } from "react-native-paper";

const TooltipComponent = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Tooltip
        isVisible={visible}
        content={<Text>Este é um tooltip</Text>}
        placement="top"
        onClose={() => setVisible(false)}
      >
        <Title onPress={() => setVisible(true)}>
          Pressione aqui para ver o tooltip
        </Title>
      </Tooltip>
      <Button mode="contained" onPress={() => setVisible(true)}>
        Mostrar Tooltip
      </Button>
    </View>
  );
};

export default TooltipComponent;
