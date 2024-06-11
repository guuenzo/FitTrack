import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React, { useMemo, useEffect, useCallback } from "react";
import { I18nextProvider, Trans, useTranslation } from "react-i18next";

function Language() {
  const { t, i18n } = useTranslation("language");

  const languages = useMemo(() => {
    return [
      { name: t("portuguese"), id: "pt-BR" },
      { name: t("english"), id: "en-US" },
    ];
  }, [i18n.language]);

  const onPressLanguage = useCallback((language) => {
    i18n.changeLanguage(language);
  }, []);
}

export default function App() {
  return (
    <I18nextProvider language="en">
      <YourRootComponent />
    </I18nextProvider>
  );
}

// Um componente filho que utiliza a tradução
function YourRootComponent() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>
        <Trans>Bem-vindo ao nosso aplicativo!</Trans>
      </Text>
      <TouchableOpacity style={styles.button}
        title={<Trans>Alterar idioma</Trans>}
        onPress={() => console.log("Botão pressionado")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button:{
    height: 50,
    width: 50,
    backgroundColor:"#000"
  }
});
