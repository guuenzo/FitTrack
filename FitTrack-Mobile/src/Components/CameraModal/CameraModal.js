import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraView, useCameraPermissions, FlashMode } from "expo-camera";
import { useEffect, useState, useRef } from "react";
import {
  FontAwesome,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { ActionsContainer, LastPhoto } from "./Style";

export const CameraModal = ({
  visible,
  setUriCameraCapture,
  setShowCameraModal,
  getMediaLibrary = false,
}) => {
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState("back");
  const [openModal, setOpenModal] = useState(false);
  const [lanterna, setLanterna] = useState("off");
  const [salvarPhoto, setSalvarPhoto] = useState(null);
  const [lastPhoto, setLastPhoto] = useState(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [permissionMedia, requestMediaPermission] =
    MediaLibrary.usePermissions();

  useEffect(() => {
    (async () => {
      if (permission && !permission.granted) {
        await requestPermission();
      }

      // const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync()
      if (MediaLibrary.PermissionStatus.DENIED) {
        await requestMediaPermission();
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await CameraView.requestCameraPermissionsAsync();

      const { status: mediaStatus } =
        await MediaLibrary.requestPermissionsAsync();
    })();

    GetLatestPhoto();
  }, []);

  async function CapturePhoto() {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      setSalvarPhoto(photo.uri);

      setOpenModal(true);

      // await setfotoTirada(photo.uri);
    }
  }

  function ClearPhoto() {
    setSalvarPhoto(null);

    setOpenModal(false);
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function UploadPhoto() {
    //   // await MediaLibrary.createAssetAsync(salvarPhoto)
    //   //   .then(() => {
    //   //     alert("foto salva com sucesso");
    //   if (route.params.screen == "PrescricaoConsulta") {
    //     navigation.navigate("PrescricaoConsulta", {
    //       uriPhoto: salvarPhoto,
    //       screen: "Prescricao",
    //       consultaId: route.params.idConsulta,
    //     });
    //   } else {
    //     navigation.replace("Main", {
    //       uriPhoto: salvarPhoto,
    //       screen: "TelaPerfil",
    //       id: route.params.userId,
    //     });
    //   }
    //   // })
    //   // .catch((error) => {
    //   //   console.log("nao foi possivel salvar a foto");
    //   // });
  }

  async function GetLatestPhoto() {
    const { assets } = await MediaLibrary.getAssetsAsync({
      sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      first: 1,
    });

    if (assets.length > 0) {
      const photo = await MediaLibrary.getAssetInfoAsync(assets[0].id);
      // console.log(photo.localUri);
      setLastPhoto(photo.localUri);
    }
  }

  async function SelectImageGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSalvarPhoto(result.assets[0].uri);
      setOpenModal(true);
    }
  }

  return (
    <Modal style={styles.container} visible={visible}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        ratio="16:9"
        flash={lanterna}
      >
        <TouchableOpacity
          onPress={() => setShowCameraModal(false)}
          style={{ marginTop: 55, marginLeft: 15 }}
        >
          <Text style={{ fontSize: 25, color: "#2B3C64" }}>X</Text>
        </TouchableOpacity>
        <View style={styles.viewFlip}>
          <TouchableOpacity
            style={styles.btnFlip}
            onPress={() => toggleCameraFacing()}
          >
            <MaterialCommunityIcons name="camera-flip" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnFlash}
            onPress={() => setLanterna(lanterna == "off" ? "on" : "off")}
          >
            {lanterna == "off" ? (
              <Ionicons name="flash-off" size={24} color="#fff" />
            ) : (
              <Ionicons name="flash-sharp" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </CameraView>

      <ActionsContainer>
        {lastPhoto != null ? (
          <TouchableOpacity onPress={() => SelectImageGallery()}>
            <LastPhoto source={{ uri: lastPhoto }} />
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <TouchableOpacity
          style={styles.btnCapture}
          onPress={() => CapturePhoto()}
        >
          <FontAwesome name="camera" size={24} color="#ffff" />
        </TouchableOpacity>
      </ActionsContainer>

      <Modal animationType="slide" transparent={false} visible={openModal}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
          }}
        >
          <View style={{ margin: 10, flexDirection: "row", gap: 20 }}>
            <TouchableOpacity
              style={styles.btnClear}
              onPress={() => ClearPhoto()}
            >
              <FontAwesome name="trash" size={36} color="#ff0000" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnUpload}
              onPress={() => UploadPhoto()}
            >
              <FontAwesome name="upload" size={36} color="#121212" />
            </TouchableOpacity>
          </View>

          <Image
            style={{ width: "100%", height: 500, borderRadius: 15 }}
            source={{ uri: salvarPhoto }}
          />
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  camera: {
    flex: 1,
    width: "100%",
    height: "80%",
  },
  viewFlip: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
  },
  btnFlip: {
    padding: 20,
  },
  txtFlip: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
  },
  btnCapture: {
    padding: 20,
    // margin: 20,
    borderRadius: 10,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    left: -25,
  },
  btnClear: {
    padding: 20,
    backgroundColor: "transparent",

    justifyContent: "center",
    alignItems: "center",
  },
  btnUpload: {
    padding: 20,
    backgroundColor: "transparent",

    justifyContent: "center",
    alignItems: "center",
  },
  btnFlash: {
    padding: 20,
    backgroundColor: "transparent",

    justifyContent: "center",
    alignItems: "center",
  },
  btnBack: {
    padding: 20,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 90,
    right: 200,

    justifyContent: "center",
    alignItems: "center",
  },
});
