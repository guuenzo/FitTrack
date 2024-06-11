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
  const { userGlobalData, setUserGlobalData } = useContext(AuthContext);
  const navigation = useNavigation();
  const [refeicoes, setRefeicoes] = useState([]);

  const getRefeicoes = async () => {
    try {
      const { data, status } = await api.get(
        refeicaoResource + "/ListarRefeicoesDoUsuario",
        {
          headers: {
            Authorization: `Bearer ${userGlobalData.token}`,
          },
        }
      );
      setRefeicoes(data);

      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRefeicoes();
    return (cleanUp = () => {});
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
                  nome={item.nomeRefeicao}
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
              onPress={() => navigation.navigate("MonteSuaRefeição")}
            />
          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default AlimentacaoScreen;
