import { jwtDecode } from "jwt-decode";
import { mask, unMask } from "remask";
import { api, usuarioResource } from "../Services/Service";

export const unMasked = (data) => unMask(data);

//Formatações de data

export const dateMaskedFull = (data) => mask(unMask(data), ["99/99/9999"]);

export const dateDbToViewFull = (date) => {
  date = date.substr(0, 10);
  date = date.split("-").reverse().join("/");
  date = dateMaskedFull(date);

  return date;
};

export const dateViewToDb = (date) => date.split("/").reverse().join("-");

//peso: KG, altura: metros
export const imcCalculator = (peso, altura) => (peso / altura ** 2).toFixed(2);

export const calcularIdadeDoUsuario = (dataNascimento) => {
  // Cria uma nova instância de Date com a data de nascimento
  const dataNasc = new Date(dataNascimento);

  // Obtém a data atual e a diferença em milissegundos
  const agora = new Date();
  const diferencaEmMilissegundos = agora - dataNasc;

  // Calcula a idade em anos
  let idade = Math.floor(
    diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25)
  );

  // Ajusta a idade se a data atual for anterior ao aniversário do usuário no ano atual
  if (
    agora.getMonth() < dataNasc.getMonth() ||
    (agora.getMonth() === dataNasc.getMonth() &&
      agora.getDate() < dataNasc.getDate())
  ) {
    idade--;
  }

  return idade;
};

export const userDecodeToken = async (token) => {
  if (token === null) {
    return null;
  }

  const decoded = jwtDecode(token);

  const getFotoUri = async (idUsuario) => {
    try {
      const { data } = await api.get(
        `${usuarioResource}/BuscarPorId?id=${idUsuario}`
      );

      return data.foto;
    } catch (error) {}
  };

  return {
    id: decoded.jti,
    nome: decoded.name,
    email: decoded.email,
    token: token,
    foto: await getFotoUri(decoded.jti),
  };
};
