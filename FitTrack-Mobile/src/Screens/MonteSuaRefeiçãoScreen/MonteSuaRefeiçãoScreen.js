import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  GridLayout,
  MainContent,
  MainContentScroll,
} from "../../Components/Container/style";
import FlatListComponent from "../../Components/FlatList/FlatList";
import { CardRefeicaoView } from "../../Components/CardRefeicao/CardRefeicao";
import { CommonActions, useNavigation } from "@react-navigation/native";
import Title from "../../Components/Title/Title";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";
import { Alert, StatusBar, View } from "react-native";
import { DropDownComponent } from "../../Components/Input/Input";
import InfoGlobalBoxComponent, {
  MacronutrientesRefeicaoBox,
} from "./InfoGlobal";
import { ButtonComponentDefault } from "../../Components/Button/Button";
import { ModalAlimentacao } from "../../Components/Modal/Modal";
import { api, refeicaoResource } from "../../Services/Service";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  calcularMacroAoAumentarPeso,
  calcularPorcentagemMacro,
  calcularQuantidadeMacrosRefeicao,
} from "../../utils/StringFunctions";
import { TextInput } from "react-native-paper";
import { getAlimentoExterno } from "../../Services/ServiceFood";

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

  const [pesoAlimentoSelecionado, setPesoAlimentoSelecionado] = useState(0);

  const [alimentos, setAlimentos] = useState(
    route.params.refeicao.alimentos || []
  );

  const [alimentoPesquisado, setAlimentoPesquisado] = useState("");

  //adiona um alimento pesquisado à refeição
  //item: pega o item selecionado no componente de dropdown e passa aqui pra tela "MonteSuaRefeiçãoScreen"
  const addAlimentoARefeicao = (item) => {
    let existeEsseAlimento = false;

    alimentos.forEach((element) => {
      if (element.idAlimento === item.idAlimento) {
        existeEsseAlimento = true;
        return;
      }
    });
    if (!existeEsseAlimento) {
      setAlimentos([...alimentos, item]);
    }
  };

  //soma o valor de cada macro de cada alimento e atribui a um único valor na refeição

  const atualizarNomeRefeicao = (txt) => {
    setIsEditNameModal(true);
    setExibeModal(!exibeModal);
  };

  const alterarPesoAlimento = (
    valorOriginalMacro,
    novoPesoAlimento,
    pesoAntigo
  ) => {
    // Altera o peso do alimento
    const novoAlimentoSelecionado = {
      ...alimentoSelecionado,
      peso: novoPesoAlimento,
      carboidratos: calcularMacroAoAumentarPeso(
        alimentoSelecionado.carboidratos,
        novoPesoAlimento,
        pesoAntigo
      ),
      gorduras: calcularMacroAoAumentarPeso(
        alimentoSelecionado.gorduras,
        novoPesoAlimento,
        pesoAntigo
      ),
      proteinas: calcularMacroAoAumentarPeso(
        alimentoSelecionado.proteinas,
        novoPesoAlimento,
        pesoAntigo
      ),
      calorias: calcularMacroAoAumentarPeso(
        alimentoSelecionado.calorias,
        novoPesoAlimento,
        pesoAntigo
      ),
    };

    setAlimentoSelecionado(novoAlimentoSelecionado);

    // Remove o alimento que teve o peso alterado
    const alimentosFiltrados = alimentos.filter(
      (x) => x.idAlimento !== novoAlimentoSelecionado.idAlimento
    );

    // Atualiza o estado dos alimentos com o novo alimento selecionado
    setAlimentos([...alimentosFiltrados, novoAlimentoSelecionado]);
  };

  const cadastrarRefeicao = async () => {
    try {
      if (nomeRefeicao.trim() === "") {
        Alert.alert("Ops", "O nome da refeição é obrigatório");
        return;
      }

      let alimentosSemId = [];

      alimentos.map((element) => {
        alimentosSemId.push({ ...element, idAlimento: null });
      });

      //é preciso passar os aliementos sem um id para o back end, pois o id é criado lá
      const { status } = await api.post(
        `${refeicaoResource}/CadastrarRefeicao`,
        {
          nomeRefeicao,
          idUsuario: userGlobalData.id,
          alimentos: alimentosSemId,
        }
      );
      if (status === 201) {
        Alert.alert("Sucesso");
        navigation.replace("Main", { indice: 0 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const atualizarRefeicao = async () => {
    try {
      if (nomeRefeicao.trim() === "") {
        Alert.alert("Ops", "O nome da refeição é obrigatório");
        return;
      }

      if (alimentos.length === 0) {
        await excluirRefeicao();
        return;
      }

      let alimentosSemId = [];

      alimentos.map((element) => {
        alimentosSemId.push({ ...element, idAlimento: null });
      });

      api.put(
        `${refeicaoResource}/AtualizarRefeicao?idRefeicao=${route.params.refeicao.idRefeicao}`,
        {
          nomeRefeicao,
          idUsuario: userGlobalData.id,
          alimentos: alimentosSemId,
        }
      );

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Main", params: { indice: 0 } }],
        })
      );
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

  const adicionarAlimento = async (alimento) => {
    const response = await getAlimentoExterno(alimento);
    let existeEsseAlimento = false;

    alimentos.forEach((element) => {
      if (element.nomeAlimento === response.nomeAlimento) {
        existeEsseAlimento = true;
        return;
      }
    });
    if (!existeEsseAlimento) {
      setAlimentos([...alimentos, response]);
    }

    console.log(response);
  };

  // useEffect(() => {
  //   return (cleanUp = () => {});
  // }, [route.params, alimentoSelecionado, alimentos]);

  return (
    <Container>
      <MainContentScroll>
        <GridLayout height="100%" padding="0">
          <MainContent>
            {exibeModal && (
              <ModalAlimentacao
                isEditName={isEditNameModal}
                texto={nomeRefeicao}
                peso={pesoAlimentoSelecionado}
                setPeso={setPesoAlimentoSelecionado}
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

            <DropDownComponent addAlimento={adicionarAlimento} />

            <InfoGlobalBoxComponent
              nomeRefeicao={nomeRefeicao}
              onPressAtualizarNome={atualizarNomeRefeicao}
              pesoRefeicao={calcularQuantidadeMacrosRefeicao(alimentos, "peso")}
              caloriasRefeicao={calcularQuantidadeMacrosRefeicao(
                alimentos,
                "calorias"
              )}
            />

            <MacronutrientesRefeicaoBox
              quantidadeProteinas={calcularQuantidadeMacrosRefeicao(
                alimentos,
                "proteinas"
              )}
              widthProteinas={calcularPorcentagemMacro(
                calcularQuantidadeMacrosRefeicao(alimentos, "peso"),
                calcularQuantidadeMacrosRefeicao(alimentos, "proteinas")
              )}
              quantidadeCarboidratos={calcularQuantidadeMacrosRefeicao(
                alimentos,
                "carboidratos"
              )}
              widthCarboidratos={calcularPorcentagemMacro(
                calcularQuantidadeMacrosRefeicao(alimentos, "peso"),
                calcularQuantidadeMacrosRefeicao(alimentos, "carboidratos")
              )}
              quantidadeGorduras={calcularQuantidadeMacrosRefeicao(
                alimentos,
                "gorduras"
              )}
              widthGorduras={calcularPorcentagemMacro(
                calcularQuantidadeMacrosRefeicao(alimentos, "peso"),
                calcularQuantidadeMacrosRefeicao(alimentos, "gorduras")
              )}
            />

            <FlatListComponent
              //coloca os cards em ordem decrescente pelo numero de calorias do alimento
              data={alimentos.sort((a, b) => b.kcal - a.kcal)}
              keyExtractor={(item) => item.idAlimento}
              renderItem={({ item }) => (
                <CardRefeicaoView
                  onPressEditar={() => {
                    setPesoAlimentoSelecionado(item.peso);
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
                  kcal={
                    item.calorias !== 0
                      ? Number.isInteger(item.calorias)
                        ? item.calorias
                        : item.calorias.toFixed(1)
                      : 0
                  }
                  nome={item.nomeAlimento}
                  pesoRefeicao={
                    item.peso !== 0
                      ? Number.isInteger(item.peso)
                        ? item.peso
                        : item.peso.toFixed(1)
                      : 0
                  }
                  proteinas={
                    item.proteinas !== 0
                      ? Number.isInteger(item.proteinas)
                        ? item.proteinas
                        : item.proteinas.toFixed(1)
                      : 0
                  }
                  carboidratos={
                    item.carboidratos !== 0
                      ? Number.isInteger(item.carboidratos)
                        ? item.carboidratos
                        : item.carboidratos.toFixed(1)
                      : 0
                  }
                  gorduras={
                    item.gorduras !== 0
                      ? Number.isInteger(item.gorduras)
                        ? item.gorduras
                        : item.gorduras.toFixed(1)
                      : 0
                  }
                  onPressDeletar={() => {
                    //retorna pro array de alimentos só os alimentos que não forem clicados
                    setAlimentos(
                      alimentos.filter(
                        (x) => x.nomeAlimento !== item.nomeAlimento
                      )
                    );
                  }}
                />
              )}
            />

            <View style={{ marginBottom: 80, marginTop: 30, gap: 30 }}>
              <ButtonComponentDefault
                statusButton
                text={
                  route.params.refeicao.idRefeicao
                    ? "Atualizar refeição"
                    : "Cadastrar refeição"
                }
                onPress={
                  !route.params.refeicao.idRefeicao
                    ? cadastrarRefeicao
                    : atualizarRefeicao
                }
              />

              {route.params.refeicao.idRefeicao && (
                <ButtonComponentDefault
                  isDeleteButton
                  statusButton
                  text="Excluir refeição"
                  onPress={excluirRefeicao}
                />
              )}
            </View>
          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default MonteSuaRefeiçãoScreen;
