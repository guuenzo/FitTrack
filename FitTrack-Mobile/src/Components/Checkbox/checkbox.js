import * as React from "react";
import { Checkbox } from "react-native-paper";

export const CheckExercicios = ({ checked }) => {
  return (
    <Checkbox status={checked ? "checked" : "unchecked"} color={"#2B3C64"} />
  );
};

// export const CheckExercicios = ({ setSelection, setExeSelecionado }) => {
//   const [checked, setChecked] = React.useState(false);

//   return (
//     <Checkbox
//       status={checked ? "checked" : "unchecked"}
//       onPress={() => {
//         setChecked(!checked);
//         setSelection(!checked);
//         setExeSelecionado((prevState) => ({
//           ...prevState,
//           selecionado: !checked,
//         }));
//       }}
//       color={"#2B3C64"}
//     />
//   );
// };
