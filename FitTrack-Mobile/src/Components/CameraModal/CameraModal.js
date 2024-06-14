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
import { useEffect, useState, useRef, useContext } from "react";
import {
  FontAwesome,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { ActionsContainer, LastPhoto } from "./Style";
import { api } from "../../Services/Service";
import { AuthContext } from "../../Contexts/AuthContext";

export const CameraModal = ({
  visible,
  setUriCameraCapture,
  setShowCameraModal,
  getMediaLibrary = false,
}) => {
  const { userGlobalData, setUserGlobalData } = useContext(AuthContext);
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

  async function AlterarFotoPerfil() {
    const formData = new FormData();
    formData.append("Arquivo", {
      uri: salvarPhoto,
      name: `image.${salvarPhoto.split(".").pop()}`,
      type: `image/${salvarPhoto.split(".").pop()}`,
    });

    await api
      .put(`/Usuario/AlterarFotoPerfil?id=${userGlobalData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setUserGlobalData({ ...userGlobalData, foto: salvarPhoto });
    setShowCameraModal(false) || setOpenModal(false);
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
        {/* <TouchableOpacity style={{}}>
          <Text>x</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => setShowCameraModal(false)}
          style={{ marginTop: 66, left: -160 }}
        >
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <View
          style={{
            padding: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            // marginTop: 65,
          }}
        >
          <TouchableOpacity
            style={styles.btnFlash}
            onPress={() => setLanterna(lanterna == "off" ? "on" : "off")}
          >
            {lanterna == "off" ? (
              <Ionicons name="flash-off" size={30} color="#fff" />
            ) : (
              <Ionicons name="flash-sharp" size={30} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.viewFlip}></View>

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
            <FontAwesome name="camera" size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnFlip}
            onPress={() => toggleCameraFacing()}
          >
            <MaterialCommunityIcons name="camera-flip" size={35} color="#fff" />
          </TouchableOpacity>
        </ActionsContainer>
      </CameraView>

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
              onPress={() => AlterarFotoPerfil()}
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
    justifyContent: "center",
    alignItems: "center",
  },
  viewFlip: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
  },
  btnFlip: {
    padding: 0,
    left: 80,
    marginBottom: 35,
  },
  txtFlip: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
  },
  btnCapture: {
    padding: 20,
    // margin: 20,
    borderRadius: 35,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
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
    // padding: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#000",
    height: 33,
    width: 33,
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
