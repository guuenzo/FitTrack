import axios from "axios";

// const ip = "192.168.15.61";

const ip = "172.16.39.113";

const apiPort = ":5179";

const apiUrlLocal = `http://${ip}${apiPort}/api`;

export const api = axios.create({
  baseURL: apiUrlLocal,
});

//Rotas

export const loginResource = `/Login`;
export const usuarioResource = `/Usuario`;
export const recuperarSenhaResource = `/RecuperarSenha`;
export const refeicaoResource = `/Refeicao`;
export const translateResource = `/Translate`;
export const translateEnToPtResource = `${translateResource}/TranslateENToPT?textToTranslate=`;
export const translatePtToEnResource = `${translateResource}/TranslatePTToEN?textToTranslate=`;
