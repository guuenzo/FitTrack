import { jwtDecode } from "jwt-decode";
import { mask, unMask } from "remask";
import { api, usuarioResource } from "../Services/Service";
import { Alert } from "react-native";

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
export const imcCalculator = (peso, altura) => peso / altura ** 2;

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

  return {
    id: decoded.jti,
    nome: decoded.name,
    email: decoded.email,
    token: token,
    foto: decoded.foto,
  };
};

export const calcularPorcentagemMacro = (pesoRefeicao, quantidadeMacro) => {
  if (pesoRefeicao === 0 || quantidadeMacro === 0) {
    return 0;
  }
  return (quantidadeMacro / pesoRefeicao) * 100;
};

export const calcularQuantidadeMacrosRefeicao = (array, macro) => {
  let total = 0;

  switch (macro.toLowerCase()) {
    case "proteinas":
      array.forEach((alimento) => (total += alimento.proteinas));
      return total !== 0
        ? Number.isInteger(total)
          ? total
          : total.toFixed(1)
        : 0;

    case "carboidratos":
      array.forEach((alimento) => (total += alimento.carboidratos));
      return total !== 0
        ? Number.isInteger(total)
          ? total
          : total.toFixed(1)
        : 0;

    case "gorduras":
      array.forEach((alimento) => (total += alimento.gorduras));
      return total !== 0
        ? Number.isInteger(total)
          ? total
          : total.toFixed(1)
        : 0;

    case "calorias":
      array.forEach((alimento) => (total += alimento.calorias));
      return total !== 0
        ? Number.isInteger(total)
          ? total
          : total.toFixed(1)
        : 0;

    case "peso":
      array.forEach((alimento) => (total += alimento.peso));
      return total !== 0 ? total : 0;

    default:
      return 0;
  }
};

export const calcularMacroAoAumentarPeso = (
  valorOriginal,
  pesoOriginal,
  novoPeso
) => {
  if (pesoOriginal === 0) {
    Alert.alert("Ops", "O peso original deve ser maior que zero.");
    return;
  }
  return (valorOriginal * novoPeso) / pesoOriginal;
};
