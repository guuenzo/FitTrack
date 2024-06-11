import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  GridLayout,
  GridLayoutFilipe,
  MainContent,
  MainContentScroll,
} from "../../Components/Container/style";
import FlatListComponent from "../../Components/FlatList/FlatList";
import CardRefeicao from "../../Components/CardRefeicao/CardRefeicao";
import { useNavigation } from "@react-navigation/native";
import Title from "../../Components/Title/Title";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";
import { StatusBar, View } from "react-native";
import { DropDownComponent } from "../../Components/Input/Input";
import InfoGlobalBoxComponent, {
  MacronutrientesRefeicaoBox,
} from "./InfoGlobal";
import { ButtonComponentDefault } from "../../Components/Button/Button";
import { ModalAlimentacao } from "../../Components/Modal/Modal";
import { api, refeicaoResource } from "../../Services/Service";
import { AuthContext } from "../../Contexts/AuthContext";

const MonteSuaRefeiçãoScreen = ({ route }) => {
  const navigation = useNavigation();

  const { userGlobalData } = useContext(AuthContext);

  const heightStatusBar = StatusBar.currentHeight;

  const [nomeRefeicao, setNomeRefeicao] = useState(
    route.params.refeicao.nomeRefeicao ? route.params.refeicao.nomeRefeicao : ""
  );

  const [alimentoSelecionado, setAlimentoSelecionado] = useState({});

  const [exibeModal, setExibeModal] = useState(false);

  const [isEditNameModal, setIsEditNameModal] = useState(false);

  const [alimentos, setAlimentos] = useState(
    route.params.refeicao.alimentos || []
  );

  //adiona um alimento pesquisado à refeição
  //item: pega o item selecionado no componente de dropdown e passa aqui pra tela "MonteSuaRefeiçãoScreen"
  const addAlimentoARefeicao = (item) => {
    let existeEsseAlimento = false;

    alimentos.forEach((element) => {
      if (element.id === item.id) {
        existeEsseAlimento = true;
        return;
      }
    });
    if (!existeEsseAlimento) {
      setAlimentos([...alimentos, item]);
    }
  };

  //soma o valor de cada macro de cada alimento e atribui a um único valor na refeição
  const calcularQuantidadeMacrosRefeicao = (macro = "".toLowerCase()) => {
    let total = 0;

    switch (macro.toLowerCase()) {
      case "proteinas":
        alimentos.forEach((alimento) => (total += alimento.proteinas));
        //caso o total seja === 0, valida se é um numero inteiro, se for, o retorna, se nao, só exibe o total com 1 casa decimal
        return total !== 0
          ? Number.isInteger(total)
            ? total
            : total.toFixed(1)
          : 0;

      case "carboidratos":
        alimentos.forEach((alimento) => (total += alimento.carboidratos));
        //caso o total seja === 0, valida se é um numero inteiro, se for, o retorna, se nao, só exibe o total com 1 casa decimal
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

      case "pesorefeicao":
        alimentos.forEach((alimento) => {
          total += alimento.peso;
        });

        return total !== 0 ? total : 0;
    }
  };

  const calcularPorcentagemMacro = (pesoRefeicao, quantidadeMacro) => {
    if (pesoRefeicao === 0 || quantidadeMacro === 0) {
      return 0;
    }
    return (quantidadeMacro / pesoRefeicao) * 100;
  };

  const atualizarNomeRefeicao = (txt) => {
    setIsEditNameModal(true);
    setExibeModal(!exibeModal);
  };

  const alterarPesoAlimento = (pesoAlimento) => {
    // Altera o peso do alimento
    const novoAlimentoSelecionado = {
      ...alimentoSelecionado,
      peso: peso,
    };
    setAlimentoSelecionado(novoAlimentoSelecionado);

    // Remove o alimento que teve o peso alterado
    const alimentosFiltrados = alimentos.filter(
      (x) => x.id !== novoAlimentoSelecionado.id
    );

    // Atualiza o estado dos alimentos com o novo alimento selecionado
    setAlimentos([...alimentosFiltrados, novoAlimentoSelecionado]);
  };

  const cadastrarRefeicao = async () => {
    try {
      const { data, status } = await api.post(
        `${refeicaoResource}/CadastrarRefeicao`,
        {
          nomeRefeicao,
          idUsuario: userGlobalData.id,
          alimentos: [
            {
              nomeAlimento: "adafasDA",
              peso: 20,
              proteinas: 30,
              calorias: 40,
              carboidratos: 10,
              gorduras: 220,
            },
          ],
        }
      );

      navigation.replace("Main", { indice: 0 });
    } catch (error) {
      console.log(error);
    }
  };
  const excluirRefeicao = async () => {
    try {
      const { data, status } = await api.delete(
        `${refeicaoResource}/ExcluirRefeicao?idRefeicao=${route.params.refeicao.idRefeicao}`
      );

      navigation.replace("Main", { indice: 0 });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("route.params.refeicao:", route.params.refeicao);
    return (cleanUp = () => {});
  }, [route.params]);

  return (
    <Container>
      <MainContentScroll>
        <GridLayout height="100%" padding="0">
          <MainContent>
            {exibeModal && (
              <ModalAlimentacao
                isEditName={isEditNameModal}
                texto={alimentoSelecionado.peso}
                setExibeModal={setExibeModal}
                exibeModal={exibeModal}
                setTexto={setNomeRefeicao}
                alterarPesoAlimento={alterarPesoAlimento}
              />
            )}

            <LeftArrowAOrXComponent
              isBlue
              fieldMargin={`${heightStatusBar + 20}px 0 0 0`}
            />
            <Title fieldMargin={"0 0 30px 0"} text={"Monte sua refeição"} />

            <DropDownComponent addAlimento={addAlimentoARefeicao} />

            <InfoGlobalBoxComponent
              nomeRefeicao={nomeRefeicao}
              onPressAtualizarNome={atualizarNomeRefeicao}
              pesoRefeicao={calcularQuantidadeMacrosRefeicao("pesorefeicao")}
              caloriasRefeicao={calcularQuantidadeMacrosRefeicao("calorias")}
            />

            <MacronutrientesRefeicaoBox
              quantidadeProteinas={calcularQuantidadeMacrosRefeicao(
                "proteinas"
              )}
              widthProteinas={calcularPorcentagemMacro(
                calcularQuantidadeMacrosRefeicao("pesorefeicao"),
                calcularQuantidadeMacrosRefeicao("proteinas")
              )}
              quantidadeCarboidratos={calcularQuantidadeMacrosRefeicao(
                "carboidratos"
              )}
              widthCarboidratos={calcularPorcentagemMacro(
                calcularQuantidadeMacrosRefeicao("pesorefeicao"),
                calcularQuantidadeMacrosRefeicao("carboidratos")
              )}
              quantidadeGorduras={calcularQuantidadeMacrosRefeicao("gorduras")}
              widthGorduras={calcularPorcentagemMacro(
                calcularQuantidadeMacrosRefeicao("pesorefeicao"),
                calcularQuantidadeMacrosRefeicao("gorduras")
              )}
            />

            <FlatListComponent
              //coloca os cards em ordem decrescente pelo numero de calorias do alimento
              data={alimentos.sort((a, b) => b.kcal - a.kcal)}
              keyExtractor={(item) => item.idAlimento}
              renderItem={({ item }) => (
                <CardRefeicao
                  onPressEditar={() => {
                    setIsEditNameModal(false);
                    setAlimentoSelecionado(item);
                    setExibeModal(true);
                  }}
                  isEditGramas
                  heightProteina={calcularPorcentagemMacro(
                    item.peso,
                    item.proteinas
                  )}
                  heightCarboidrato={calcularPorcentagemMacro(
                    item.peso,
                    item.carboidratos
                  )}
                  heightGordura={calcularPorcentagemMacro(
                    item.peso,
                    item.gorduras
                  )}
                  kcal={item.calorias}
                  nome={item.nomeAlimento}
                  pesoRefeicao={item.peso}
                  proteinas={item.proteinas}
                  carboidratos={item.carboidratos}
                  gorduras={item.gorduras}
                  onPressDeletar={() => {
                    //retorna pro array de alimentos só os alimentos que não forem clicados
                    setAlimentos(
                      alimentos.filter((x) => x.idAlimento !== item.idAlimento)
                    );
                  }}
                  onPress={() => {}}
                />
              )}
            />

            <View style={{ marginBottom: 80, marginTop: 30, gap: 30 }}>
              <ButtonComponentDefault
                statusButton
                text="confirmar"
                onPress={cadastrarRefeicao}
              />
              <ButtonComponentDefault
                isDeleteButton
                statusButton
                text="Excluir refeição"
                onPress={excluirRefeicao}
              />
            </View>
          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default MonteSuaRefeiçãoScreen;
