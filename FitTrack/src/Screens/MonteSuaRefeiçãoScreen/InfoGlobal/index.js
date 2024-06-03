import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { InfoGlobalBox, InfoGlobalBoxBottom, InfoGlobalBoxTop } from "../style";
import { TextMABold, TextQuickSandBold } from "../../../Components/Text/style";
import Theme from "../../../Styles/Theme";
import { TouchableOpacity, View } from "react-native";

const InfoGlobalBoxComponent = ({
  nomeRefeicao = "Lasanha",
  pesoRefeicao = 700,
  caloriasRefeicao = 1500,
}) => {
  return (
    <InfoGlobalBox>
      <InfoGlobalBoxTop>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1}>
            {nomeRefeicao}
          </TextMABold>
          <TouchableOpacity style={{ padding: 20 }}>
            <FontAwesome5
              name="pen"
              size={10}
              color={Theme.colors.secondaryScale.V1}
            />
          </TouchableOpacity>
        </View>
        <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1}>
          {pesoRefeicao} G
        </TextMABold>
      </InfoGlobalBoxTop>
      <InfoGlobalBoxBottom>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TextQuickSandBold
            fontSize={"14px"}
            color={Theme.colors.secondaryScale.V5}
          >
            valores nutricionais:
          </TextQuickSandBold>
        </View>
        <TextQuickSandBold
          fontSize={"14px"}
          color={Theme.colors.secondaryScale.V5}
        >
          {caloriasRefeicao} Kcal
        </TextQuickSandBold>
      </InfoGlobalBoxBottom>
    </InfoGlobalBox>
  );
};

export default InfoGlobalBoxComponent;
