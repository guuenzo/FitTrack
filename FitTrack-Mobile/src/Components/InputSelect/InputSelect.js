import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

export const InputSelect = ({ setObjetivoSelecionado }) => {
    const pickerStyles = {
        inputIOS: style.pickerInput,
        inputAndroid: style.pickerInput,
        placeholder: { color: "#2B3C64" },
    };

    const placeholder = {
        label: "Objetivo",
        value: null,
       
    };

    const [arrayOptions, setArrayOptions] = useState(null);

    async function loadOptions() {
        // Definindo as opções fixas
        const options = [
            { label: "Bulking", value: "bulking" },
            { label: "Cutting", value: "cutting" },
            { label: "Manter Peso", value: "manter_peso" }
        ];

        setArrayOptions(options);
    }

    useEffect(() => {
        loadOptions();
    }, []);

    return (
        <View style={{ width: "90%" }}>
            {arrayOptions ? (
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={pickerStyles}
                    placeholder={placeholder}
                    onValueChange={(value) => setObjetivoSelecionado(value)}
                    items={arrayOptions}
                />
            ) : (
                <ActivityIndicator />
            )}
        </View>
    );
};

const style = StyleSheet.create({
    pickerInput: {
      fontSize: 16,
      padding: 12,
      borderBottomWidth: 2,
      borderColor: "#2B3C64",
      color: "#2B3C64",
      fontFamily: "MontserratAlternates_600SemiBold",
    },
    placeholder: {
      color: "#2B3C64",
      fontSize: 16,
      fontFamily: "MontserratAlternates_600SemiBold",
    },
  });