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
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { TextMABold } from "../Text/style";

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

export const DropDownComponent = ({
  data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ],
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    // <View style={styles.containerDropDown}>
    <Dropdown
      style={[
        styles.dropdown,
        isFocus && { borderColor: Theme.colors.secondaryScale.V1 },
      ]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? "Encontre um alimento" : "..."}
      searchPlaceholder="Pesquisar..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
        setIsFocus(false);
      }}
      renderLeftIcon={() => (
        <FontAwesome
          name="search-plus"
          size={20}
          color="black"
          style={{
            marginRight: 5,
            color: isFocus
              ? Theme.colors.secondaryScale.V1
              : Theme.colors.secondaryScale.V7,
          }}
          // color={isFocus ? "blue" : "black"}
        />
      )}
    />
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
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "100%",
  },
  containerDropDown: { backgroundColor: "white", padding: 10 },
  icon: {},
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Theme.colors.secondaryScale.V1,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
