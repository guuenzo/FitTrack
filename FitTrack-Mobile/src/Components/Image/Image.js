import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ImageLogoStyle, ImageProfileStyle, ImageProfileUserStyle } from "./style";
import { MaterialIcons } from '@expo/vector-icons';

export const ImageProfileUser = ({ uriImageProfile, isHeader = true }) => {
  return (
    <ImageProfileUserStyle
      isHeader={isHeader}
      source={{ uri: uriImageProfile }}
    />
  );
};
export const ImageProfile = ({ uriImageProfile, isHeader = true, onPress = () => { } }) => {
  return (
    <View style={{ position: 'relative' }}>
      <ImageProfileUserStyle
        isHeader={isHeader}
        source={{ uri: uriImageProfile }}

      />
      <TouchableOpacity onPress={onPress} style={styles.btnEditFoto}>
        <MaterialIcons name="mode-edit-outline" size={22} color="#FFFF" />
      </TouchableOpacity>
    </View>
  );
};

const ImageLogo = ({ fieldMargin = "0 0 20px 0" }) => (
  <ImageLogoStyle
    fieldMargin={fieldMargin}
    source={require("../../Assets/Images/LogoFitTrack.png")}
  />
);

export default ImageLogo;

const styles = StyleSheet.create({
  btnEditFoto: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#1E91DB',
    position: 'absolute',
    top: -5,
    right: -3, alignItems: 'center',
    justifyContent: 'center',
    zIndex: 40
  }
});