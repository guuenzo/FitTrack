import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BlurViewComponent,
  InputContainer,
  InputDataView,
  InputStyle,
  LinearGradientInputView,
} from "./style";
import Theme from "../../Styles/Theme";
import { BlurView } from "expo-blur";
import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment/moment";

export const InputPassword = ({
  value,
  onChangeText,
  placeholder = "Senha:",
}) => {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  return (
    <BlurViewComponent>
      <LinearGradientInputView>
        <InputStyle
          secureTextEntry={!senhaVisivel}
          keyboardType="default"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />

        <MaterialCommunityIcons
          style={{ position: "absolute", right: 15, top: 10 }}
          onPress={() => setSenhaVisivel(!senhaVisivel)}
          name={senhaVisivel ? "eye" : "eye-off"}
          size={22}
          color={`rgba(239, 239, 239, 1)`}
        />
      </LinearGradientInputView>
    </BlurViewComponent>
  );
};

export const InputComponent = ({
  value,
  onChangeText,
  placeholder = "",
  keyboardType = "default",
  disabled = false,
}) => {
  return (
    <BlurViewComponent>
      <LinearGradientInputView>
        <InputStyle
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      </LinearGradientInputView>
    </BlurViewComponent>
  );
};

export const InputData = ({
  //passa a data para o componente pai
  setData,
}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setData(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <BlurViewComponent style={{ height: 40 }}>
      <LinearGradientInputView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showMode("date")}
        >
          <Text style={styles.text}>
            {isToday(date)
              ? "Data de Nascimento"
              : moment(date).format("DD/MM/YYYY")}
          </Text>
        </TouchableOpacity>

        {/* <Button onPress={() => showMode("date")} title="Show Date Picker" /> */}
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            display="calendar"
            onChange={onChange}
            maximumDate={new Date()}
            minimumDate={new Date(1900, 0, 1)}
          />
        )}
      </LinearGradientInputView>
    </BlurViewComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
    color: Theme.colors.white.v1,
    fontFamily: Theme.fonts.quicksand.Quicksand_700Bold,
  },
  button: {
    height: "100%",
    justifyContent: "center",
  },
});
