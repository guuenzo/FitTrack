import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  GridLayout,
  MainContent,
  MainContentScroll,
} from "../../Components/Container/style";
import Header from "../../Components/Header/Header";
import Title from "../../Components/Title/Title";
import CardRefeicao, {
  CardAdicionarRefeicao,
} from "../../Components/CardRefeicao/CardRefeicao";
import { useNavigation } from "@react-navigation/native";
import FlatListComponent from "../../Components/FlatList/FlatList";
import { api, refeicaoResource } from "../../Services/Service";
import { AuthContext } from "../../Contexts/AuthContext";

const AlimentacaoScreen = () => {
  const { userGlobalData } = useContext(AuthContext);
  const navigation = useNavigation();
  const [refeicoes, setRefeicoes] = useState([]);

  const calcularQuantidadeMacrosRefeicao = (alimentos, macro) => {
    let total = 0;

    switch (macro.toLowerCase()) {
      case "proteinas":
        alimentos.forEach((alimento) => (total += alimento.proteinas));
        return total !== 0
          ? Number.isInteger(total)
            ? total
            : total.toFixed(1)
          : 0;

      case "carboidratos":
        alimentos.forEach((alimento) => (total += alimento.carboidratos));
        return total !== 0
          ? Number.isInteger(total)
            ? total
            : total.toFixed(1)
          : 0;

      case "gorduras":
        alimentos.forEach((alimento) => (total += alimento.gorduras));
        return total !== 0
          ? Number.isInteger(total)
            ? total
            : total.toFixed(1)
          : 0;

      case "calorias":
        alimentos.forEach((alimento) => (total += alimento.calorias));
        return total !== 0
          ? Number.isInteger(total)
            ? total
            : total.toFixed(1)
          : 0;

      case "peso":
        alimentos.forEach((alimento) => (total += alimento.peso));
        return total !== 0 ? total : 0;

      default:
        return 0;
    }
  };

  const calcularPorcentagemMacro = (pesoRefeicao, quantidadeMacro) => {
    if (pesoRefeicao === 0 || quantidadeMacro === 0) {
      return 0;
    }
    return (quantidadeMacro / pesoRefeicao) * 100;
  };

  const getRefeicoes = async () => {
    try {
      const { data, status } = await api.get(
        `${refeicaoResource}/ListarRefeicoesDoUsuario`,
        {
          headers: {
            Authorization: `Bearer ${userGlobalData.token}`,
          },
        }
      );

      setRefeicoes(data);

      console.log("data", data[0].alimentos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRefeicoes();
  }, []);

  return (
    <Container>
      <MainContentScroll>
        <GridLayout height="100%" padding="0">
          <MainContent>
            <Header />

            <Title
              text={refeicoes.length !== 0 ? "Alimentação" : "Monte sua dieta"}
            />

            <FlatListComponent
              data={refeicoes}
              keyExtractor={(item) => item.idRefeicao}
              renderItem={({ item }) => (
                <CardRefeicao
                  kcal={calcularQuantidadeMacrosRefeicao(
                    item.alimentos,
                    "calorias"
                  )}
                  pesoRefeicao={calcularQuantidadeMacrosRefeicao(
                    item.alimentos,
                    "peso"
                  )}
                  proteinas={calcularQuantidadeMacrosRefeicao(
                    item.alimentos,
                    "proteinas"
                  )}
                  carboidratos={calcularQuantidadeMacrosRefeicao(
                    item.alimentos,
                    "carboidratos"
                  )}
                  gorduras={calcularQuantidadeMacrosRefeicao(
                    item.alimentos,
                    "gorduras"
                  )}
                  nome={item.nomeRefeicao}
                  heightCarboidrato={calcularPorcentagemMacro(
                    calcularQuantidadeMacrosRefeicao(item.alimentos, "peso"),
                    calcularQuantidadeMacrosRefeicao(
                      item.alimentos,
                      "carboidratos"
                    )
                  )}
                  heightProteina={calcularPorcentagemMacro(
                    calcularQuantidadeMacrosRefeicao(item.alimentos, "peso"),
                    calcularQuantidadeMacrosRefeicao(
                      item.alimentos,
                      "proteinas"
                    )
                  )}
                  heightGordura={calcularPorcentagemMacro(
                    calcularQuantidadeMacrosRefeicao(item.alimentos, "peso"),
                    calcularQuantidadeMacrosRefeicao(item.alimentos, "gorduras")
                  )}
                  isRefeicao
                  onPress={() => {
                    console.log("item", item);
                    navigation.navigate("MonteSuaRefeição", {
                      refeicao: item,
                    });
                  }}
                />
              )}
            />

            <CardAdicionarRefeicao
              onPress={() =>
                navigation.navigate("MonteSuaRefeição", { refeicao: {} })
              }
            />
          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default AlimentacaoScreen;
