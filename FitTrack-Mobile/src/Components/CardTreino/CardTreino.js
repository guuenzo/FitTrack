import React, { useEffect, useState } from "react";
import {
  CardAddTreinoStyle,
  CardTreinoStyle,
  CardTreinoUpdate,
  ContainerCardExercicio,
  ContainerCheckBox,
  ImgExe,
  ImgExercicio,
  StyledFontAwesome,
  TextExercicio,
} from "./style";
import { TextMABold, TextQuickSandBold, TextTreinoBold } from "../Text/style";
import Theme from "../../Styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import { CheckExercicios } from "../Checkbox/checkbox";
import TooltipComponent from "../Tooltip/Tooltip";

const CardTreino = ({
  onPress,
  letraNomeTreino = "",
  grupoMuscular = "",
  fieldMargin,
  fieldMarginLeft,
}) => {
  return (
    <CardTreinoStyle
      fieldMargin={fieldMargin}
      onPress={onPress}
      fieldMarginLeft={fieldMarginLeft}
    >
      <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V2}>
        {letraNomeTreino}
      </TextMABold>

      <TooltipComponent
        textPrincipal={grupoMuscular}
        textoTooltip={grupoMuscular}
      />
      {/* <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1}>
        {grupoMuscular}
      </TextMABold> */}
    </CardTreinoStyle>
  );
};

export default CardTreino;

export const CardAddTreino = ({ onPress }) => {
  return (
    <CardAddTreinoStyle onPress={onPress}>
      <Ionicons name="add" size={35} color={Theme.colors.secondaryScale.V1} />
    </CardAddTreinoStyle>
  );
};
export const CardPersonalizeTreino = ({
  onPress,
  selected,
  letra,
  grupo = "Vazio",
}) => {
  return (
    <CardTreinoUpdate selected={selected} onPress={onPress}>
      <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1}>
        {letra}
      </TextMABold>
      <TextQuickSandBold
        fontSize={"16px"}
        color={Theme.colors.secondaryScale.V5}
      >
        {grupo}
      </TextQuickSandBold>
    </CardTreinoUpdate>
  );
};
export const CardGrupoTreino = ({ onPress, grupo, selected }) => {
  return (
    <CardTreinoUpdate onPress={onPress} selected={selected}>
      <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1}>
        {grupo}
      </TextMABold>
    </CardTreinoUpdate>
  );
};
export const CardExercicio = ({
  onPress,
  exercicio,
  setModalVideo,
  selected,
  isCheckCard = true,
}) => {
  return (
    <ContainerCardExercicio onPress={onPress}>
      <ImgExercicio
        onPress={() =>
          setModalVideo({
            nomeExe: exercicio.nomeExercicio,
            video: exercicio.videoExercicio,
            modal: true,
          })
        }
      >
        <ImgExe source={{ uri: exercicio.videoExercicio }} />
        <StyledFontAwesome
          name="play"
          size={34}
          color="black"
          style={{ opacity: 0.5 }}
        />
      </ImgExercicio>
      <TextExercicio>
        <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1}>
          {exercicio.nomeExercicio}
        </TextMABold>
      </TextExercicio>

      {isCheckCard && (
        <ContainerCheckBox>
          <CheckExercicios checked={selected} />
        </ContainerCheckBox>
      )}
    </ContainerCardExercicio>
  );
};
