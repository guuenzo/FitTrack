import { useState } from "react";
import { Switch } from "react-native-paper";

const SwitchComponent = ({ value = false }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(value);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <Switch
      style={{}}
      thumbColor={"#2B3C64"}
      value={isSwitchOn}
      onValueChange={onToggleSwitch}
    />
  );
};

export default SwitchComponent;
