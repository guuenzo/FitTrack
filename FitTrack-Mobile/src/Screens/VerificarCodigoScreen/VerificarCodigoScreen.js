import { useRef, useState } from "react";
import {
  Container,
  GridLayout,
  LinearGradientTelasIniciais,
} from "../../Components/Container/style";
import ImageLogo from "../../Components/Image/Image";
import { ButtonComponentDefault } from "../../Components/Button/Button";
import { api } from "../../Services/Service";
import { View } from "react-native";
import { TitleLogins } from "../../Components/Title/style";
import { TextMarcado, TextQuickSandMedium } from "../../Components/Text/style";
import { LeftArrowAOrXComponent } from "../../Components/LeftArrowAOrX";
import {
  BlurViewComponent,
  InputCode,
  LinearGradientInputView,
} from "../../Components/Input/style";
import DialogComponent from "../../Components/Dialog/Dialog";

const VerificarCodigoScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState(
    route.params.emailRecuperacao
      ? route.params.emailRecuperacao
      : "email@email.com"
  );

  const [dialog, setDialog] = useState({});

  const [showDialog, setShowDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [codigo, setCodigo] = useState("");

  function focusNextInput(index) {
    //Verificar se o index e menor que a quantidade de campos
    if (index < inputs.length - 1) {
      inputs[index + 1].current.focus();
    }
  }

  function focusPrevInput(index) {
    if (index > 0) {
      inputs[index - 1].current.focus();
    }
  }

  async function ValidarCodigo() {
    setLoading(true);
    await api
      .post(
        `/RecuperarSenha/ValidarCodigo?email=${route.params.emailRecuperacao}&codigo=${codigo}`
      )
      .then(() => {
        navigation.replace("RedefinirSenha", {
          emailRecuperacao: route.params.emailRecuperacao,
        });
      })
      .catch((error) => {
        setDialog({
          status: "erro",
          contentMessage: "Código inválido!",
        });
        setShowDialog(true);
        setLoading(false);
        return;
      });

    setLoading(false);
  }

  return (
    <Container>
      <LinearGradientTelasIniciais>
        <GridLayout>
          <DialogComponent
            {...dialog}
            visible={showDialog}
            setVisible={setShowDialog}
            setDialog={setDialog}
          />

          <LeftArrowAOrXComponent />
          <View style={{ alignItems: "center" }}>
            <ImageLogo fieldMargin={"55px 0px 50px 0px"} />

            <TitleLogins>Verificar código</TitleLogins>
            <View style={{ height: 18 }} />
            <TextQuickSandMedium style={{ width: "80%" }}>
              Enviamos um email para <TextMarcado>{email}</TextMarcado> com um
              código de 4 dígitos válidos, digite os abaixo:
            </TextQuickSandMedium>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 19,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            {[0, 1, 2, 3].map((index) => (
              <BlurViewComponent>
                <LinearGradientInputView>
                  <InputCode
                    key={index}
                    ref={inputs[index]}
                    placeholder="0"
                    placeholderTextColor="#FFF"
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(txt) => {
                      //Verificar se o campo e vazio
                      if (txt === "") {
                        focusPrevInput(index);
                      } else {
                        //Verificar se o campo foi preenchido
                        const codigoInformado = [...codigo];
                        codigoInformado[index] = txt;
                        setCodigo(codigoInformado.join(""));

                        focusNextInput(index);
                      }
                    }}
                  />
                </LinearGradientInputView>
              </BlurViewComponent>
            ))}
          </View>

          <View style={{ marginTop: 72, alignItems: "center" }}>
            <ButtonComponentDefault
              disabled={loading}
              text="Continuar"
              statusButton={true}
              onPress={() => ValidarCodigo()}
            />
          </View>
        </GridLayout>
      </LinearGradientTelasIniciais>
    </Container>
  );
};

export default VerificarCodigoScreen;
