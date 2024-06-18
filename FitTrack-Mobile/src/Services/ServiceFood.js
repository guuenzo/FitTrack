// src/services/edamamService.js

import axios from "axios";
import { api, translatePtToEnResource } from "./Service";

const appIdFoodDataBaseEdaman = "ab174771";
const appKeyFoodDataBaseEdaman = "b94417960a939f69dded74d48aa01cde";

const apiUrlAlimentos = "https://api.edamam.com/api/food-database/v2/parser";

export const getAlimentoExterno = async (
  alimento,
  { setLoading, setShowDialog, setDialog }
) => {
  setLoading(true);
  try {
    // Traduz o nome do alimento passado para inglês
    const responseTranslatedEN = await api.post(
      translatePtToEnResource + alimento
    );

    const alimentoTraduzidoParaIngles =
      responseTranslatedEN.data[0].translations[0].text;

    // Busca as informações do alimento
    const { data } = await axios.get(apiUrlAlimentos, {
      params: {
        app_id: appIdFoodDataBaseEdaman,
        app_key: appKeyFoodDataBaseEdaman,
        ingr: alimentoTraduzidoParaIngles,
      },
    });

    // Verifica se há resultados válidos e se o primeiro resultado é um alimento
    if (
      data &&
      data.hints &&
      data.hints.length > 0 &&
      data.hints[0].food &&
      data.hints[0].measures
    ) {
      const foodItem = data.hints[0].food;
      const gramMeasure = data.hints[0].measures.find(
        (measure) => measure.label === "Gram"
      );

      // Verifica se há nutrientes essenciais para validar se é um alimento
      if (
        foodItem.nutrients &&
        foodItem.nutrients.PROCNT &&
        foodItem.nutrients.CHOCDF &&
        foodItem.nutrients.FAT &&
        foodItem.nutrients.ENERC_KCAL
      ) {
        return {
          proteinas: foodItem.nutrients.PROCNT,
          carboidratos: foodItem.nutrients.CHOCDF,
          gorduras: foodItem.nutrients.FAT,
          calorias: foodItem.nutrients.ENERC_KCAL,
          peso: 100, // Peso padrão ou peso obtido da medida (opcional)
          nomeAlimento: alimento,
        };
      } else {
        setShowDialog(true);
        setDialog({
          status: "erro",
          contentMessage: "Alimento não encontrado!",
        });
        throw error;
      }
    } else {
      setShowDialog(true);
      setDialog({
        status: "erro",
        contentMessage: "Alimento não encontrado!",
      });
      throw error;
    }
  } catch (error) {
    setShowDialog(true);
    setDialog({
      status: "erro",
      contentMessage: "Alimento não encontrado!",
    });

    setLoading(false);
    throw error;
  }
};
