// i18n.js

import axios from "axios";

// import * as Localization from "react-native-localize";
// import i18n from "i18n-js";

// // Define as traduções
// const translations = {
//   en: { greeting: "Hello", goodbye: "Goodbye" },
//   pt: { greeting: "Olá", goodbye: "Adeus" },
//   // Adicione mais idiomas conforme necessário
// };

// // Define o idioma inicial baseado na localização do dispositivo
// const fallback = { languageCode: "en", isRTL: false };
// const { languageTag } =
//   Localization.findBestAvailableLanguage(Object.keys(translations)) || fallback;

// // Define o idioma para o i18n-js
// i18n.translations = { [languageTag]: translations[languageTag] };
// i18n.locale = languageTag;

// export default i18n;

//api google para tradução:
//key=AIzaSyB9Vxjy-MEYYlwC-FMRkQSALIrS2meI0ko

const apiGoogleKey = "AIzaSyB9Vxjy-MEYYlwC-FMRkQSALIrS2meI0ko";

export const traduzirTexto = async () => {
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${apiGoogleKey}`,
      {
        q: "hello, my name is Filipe Góis.",
        source: "en",
        target: "pt",
        format: "text",
      }
    );

    const textoTraduzido = response.data.data.translations[0].translatedText;
    return textoTraduzido;
  } catch (error) {
    console.error("Erro ao traduzir texto:", error);
  }
};
