import React, { useEffect, useState } from "react";
import {
  Container,
  GridLayout,
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

const MonteSuaRefeiçãoScreen = () => {
  const heightStatusBar = StatusBar.currentHeight;

  const [nomeRefeicao, setNomeRefeicao] = useState("Jantar");

  const [exibeModal, setExibeModal] = useState(false);

  const [alimentos, setAlimentos] = useState([]);

  const [refeicao, setRefeicao] = useState({
    alimentos: [],
  });

  const navigation = useNavigation();

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
        alimentos.forEach((alimento) => (total += alimento.kcal));

        return total !== 0
          ? Number.isInteger(total)
            ? total
            : total.toFixed(1)
          : 0;

      case "pesorefeicao":
        alimentos.forEach((alimento) => (total += alimento.pesoRefeicao));

        return total !== 0
          ? Number.isInteger(total)
            ? total
            : total.toFixed(1)
          : 0;
    }
  };

  const calcularPorcentagemMacro = (pesoRefeicao, quantidadeMacro) => {
    if (pesoRefeicao === 0 || quantidadeMacro === 0) {
      return 0;
    }
    return (quantidadeMacro / pesoRefeicao) * 100;
  };

  const atualizarNomeRefeicao = (txt) => {
    setExibeModal(!exibeModal);
    setRefeicao({ ...refeicao, nomeRefeicao: txt });
  };

  return (
    <Container>
      <MainContentScroll>
        <GridLayout>
          <MainContent>
            {exibeModal && (
              <ModalAlimentacao
                setExibeModal={setExibeModal}
                exibeModal={exibeModal}
                setTexto={setNomeRefeicao}
                texto={nomeRefeicao}
                // setTexto={setNomeRefeicao}
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
              //coloca os cards em ordem decrescente pelo numero de kcal do alimento
              data={alimentos.sort((a, b) => b.kcal - a.kcal)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CardRefeicao
                  isEditGramas
                  heightProteina={calcularPorcentagemMacro(
                    item.pesoRefeicao,
                    item.proteinas
                  )}
                  heightCarboidrato={calcularPorcentagemMacro(
                    item.pesoRefeicao,
                    item.carboidratos
                  )}
                  heightGordura={calcularPorcentagemMacro(
                    item.pesoRefeicao,
                    item.gorduras
                  )}
                  kcal={item.kcal}
                  nome={item.nome}
                  pesoRefeicao={item.pesoRefeicao}
                  proteinas={item.proteinas}
                  carboidratos={item.carboidratos}
                  gorduras={item.gorduras}
                  onPressDeletar={() => {
                    //retorna pro array de alimentos só os alimentos que não forem clicados
                    setAlimentos(alimentos.filter((x) => x.id !== item.id));
                  }}
                  onPress={() => {}}
                />
              )}
            />

            <View style={{ marginBottom: 80, marginTop: 30, gap: 30 }}>
              <ButtonComponentDefault
                statusButton
                text="confirmar"
                onPress={() => {
                  navigation.replace("Main", { indice: 0 });
                }}
              />
            </View>
          </MainContent>
        </GridLayout>
      </MainContentScroll>
    </Container>
  );
};

export default MonteSuaRefeiçãoScreen;
