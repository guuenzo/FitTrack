import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BlurViewComponent,
  InputContainer,
  InputDataView,
  InputFormStyle,
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

export const InputDefault = ({
  value,
  onChangeText = () => {},
  placeholder = "",
  keyboardType = "default",
  disabled = false,
}) => {
  return (
    <InputFormStyle
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      value={value}
    />
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
    // {
    //   idAlimento: "1",
    //   nomeAlimento: "Banana",
    //   peso: 100,
    //   calorias: 89,
    //   proteinas: 20,
    //   carboidratos: 23,
    //   gorduras: 0.3,
    // },
    // {
    //   idAlimento: "2",
    //   nomeAlimento: "Maçã",
    //   peso: 116,
    //   calorias: 52,
    //   proteinas: 0.3,
    //   carboidratos: 14,
    //   gorduras: 0.2,
    // },
    // {
    //   idAlimento: "3",
    //   nomeAlimento: "Pera",
    //   peso: 100,
    //   calorias: 57,
    //   proteinas: 0.4,
    //   carboidratos: 15,
    //   gorduras: 0.1,
    // },
    // {
    //   idAlimento: "4",
    //   nomeAlimento: "Uva",
    //   peso: 100,
    //   calorias: 69,
    //   proteinas: 0.7,
    //   carboidratos: 18,
    //   gorduras: 0.2,
    // },
    // {
    //   idAlimento: "5",
    //   nomeAlimento: "Laranja",
    //   peso: 100,
    //   calorias: 47,
    //   proteinas: 0.9,
    //   carboidratos: 12,
    //   gorduras: 0.1,
    // },
    // {
    //   idAlimento: "6",
    //   nomeAlimento: "Morango",
    //   peso: 100,
    //   calorias: 32,
    //   proteinas: 0.7,
    //   carboidratos: 8,
    //   gorduras: 0.3,
    // },
    // {
    //   idAlimento: "7",
    //   nomeAlimento: "Abacaxi",
    //   peso: 100,
    //   calorias: 50,
    //   proteinas: 0.5,
    //   carboidratos: 13,
    //   gorduras: 0.1,
    // },
    // {
    //   idAlimento: "8",
    //   nomeAlimento: "Melancia",
    //   peso: 100,
    //   calorias: 30,
    //   proteinas: 0.6,
    //   carboidratos: 8,
    //   gorduras: 0.2,
    // },
  ],
  setValue,

  addAlimento = () => {},
}) => {
  const [item, setItem] = useState("");
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
      maxHeight={300}
      labelField="nomeAlimento"
      valueField="idAlimento"
      search
      placeholder={!isFocus ? "Encontre um alimento" : "..."}
      searchPlaceholder="Pesquisar..."
      value={item}
      onFocus={() => setIsFocus(true)}
      onBlur={() => {
        setIsFocus(false);
        if (item.trim() !== "") {
          addAlimento(item);
        }
      }}
      onChange={(item) => {
        setItem(item);
        setValue(item);
        addAlimento(item);
        setIsFocus(false);
      }}
      onChangeText={(txt) => setItem(txt)}
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
