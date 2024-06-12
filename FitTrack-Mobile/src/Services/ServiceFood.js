// src/services/edamamService.js
import axios from 'axios';

const appIdFoodDataBaseEdaman = 'ab174771';
const appKeyFoodDataBaseEdaman = 'b94417960a939f69dded74d48aa01cde';

const apiUrlAlimentos = 'https://api.edamam.com/api/food-database/v2/parser';

export const getAlimentoExterno = async (alimento) => {
  try {
    const { data } = await axios.get(apiUrlAlimentos, {
      params: {
        app_id: appIdFoodDataBaseEdaman,
        app_key: appKeyFoodDataBaseEdaman,
        ingr: alimento,
      },
    });

    const foodItem = data.hints[0].food;
    const gramMeasure = data.hints[0].measures.find(measure => measure.label === 'Gram');

    return {
      proteinas: foodItem.nutrients.PROCNT,
      carboidratos: foodItem.nutrients.CHOCDF,
      gorduras: foodItem.nutrients.FAT,
      calorias: foodItem.nutrients.ENERC_KCAL,
      peso: gramMeasure ? gramMeasure.weight : 100,
      nomeAlimento: foodItem.label,
    };
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw error;
  }
};
