import React, { useState } from "react";
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

const CardTreino = ({ onPress, letraNomeTreino = "", grupoMuscular = "" }) => {
  return (
    <CardTreinoStyle onPress={onPress}>
      <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V2}>
        {letraNomeTreino}
      </TextMABold>
      <TextMABold fontSize={"16px"} color={Theme.colors.secondaryScale.V1}>
        {grupoMuscular}
      </TextMABold>
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
  grupo,
  exercicio,
  img,
  setExeSelecionado,
  setModalVideo,
  isCheckCard = true,
}) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <ContainerCardExercicio onPress={() => console.log(exercicio, isSelected)}>
      <ImgExercicio
        onPress={(x) =>
          setModalVideo({
            ...x,
            nomeExe: exercicio.nomeExercicio,
            video: exercicio.midiaExercicio.videoExercicio,
            modal: true,
          })
        }
      >
        <ImgExe source={{ uri: exercicio.midiaExercicio.videoExercicio }} />
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
          <CheckExercicios
            setSelection={setSelection}
            setExeSelecionado={setExeSelecionado}
          />
        </ContainerCheckBox>
      )}
    </ContainerCardExercicio>
  );
};
