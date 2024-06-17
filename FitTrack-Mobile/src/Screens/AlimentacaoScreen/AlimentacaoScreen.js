import { useContext, useEffect, useState } from "react";
import {
  Container,
  GridLayout,
  MainContent,
  MainContentScroll,
} from "../../Components/Container/style";
import Header from "../../Components/Header/Header";
import Title from "../../Components/Title/Title";
import CardRefeicaoButton, {
  CardAdicionarRefeicao,
} from "../../Components/CardRefeicao/CardRefeicao";
import { useNavigation } from "@react-navigation/native";
import FlatListComponent from "../../Components/FlatList/FlatList";
import { api, refeicaoResource } from "../../Services/Service";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  calcularPorcentagemMacro,
  calcularQuantidadeMacrosRefeicao,
} from "../../utils/StringFunctions";

const AlimentacaoScreen = () => {
  const { userGlobalData } = useContext(AuthContext);
  const navigation = useNavigation();
  const [refeicoes, setRefeicoes] = useState([]);

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
    } catch (error) {}
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
                <CardRefeicaoButton
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
