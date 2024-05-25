import axios from "axios";

const ip = "";

const apiPort = "";

const apiUrlLocal = ``;

const appIdFoodDataBaseEdaman = "ab174771";

const appKeyFoodDataBaseEdaman = "b94417960a939f69dded74d48aa01cde";

const alimentoAserPesquisado = "banana";

const apiUrlAlimentos = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appIdFoodDataBaseEdaman}&app_key=%20${appKeyFoodDataBaseEdaman}&ingr=${alimentoAserPesquisado}&nutrition-type=cooking`;

export const apiAlimentos = axios.create({
  baseURL: apiUrlAlimentos,
});

export const api = axios.create({
  baseURL: apiUrlLocal,
});
