import axios from "axios";

// const ip = "192.168.15.61";

const ip = "172.16.39.113";

const apiPort = ":5179";

const apiUrlLocal = `http://${ip}${apiPort}/api`;
// const apiUrlLocal = `http://192.168.21.125/api`;

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
export const exercicioResource = `/Exercicio/ListarPorGrupoMuscular`;
export const grupoMuscularResource = `/GrupoMuscular`;
export const treinoResource = `/Treino`;
