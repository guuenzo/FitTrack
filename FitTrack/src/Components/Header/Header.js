import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import {
  HeaderStyle,
  ProfileButton,
  WelcomeBox,
  WelcomeTextBox,
} from "./style";
import { Entypo } from "@expo/vector-icons";
import Theme from "../../Styles/Theme";
import { ImageProfileUser } from "../Image/Image";
import { TextMABold } from "../Text/style";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Contexts/AuthContext";

const Header = ({
  uriImageProfile = "https://avatars.githubusercontent.com/u/125310170?s=400&u=e379fad687a58d753af1755743dc6d57db9d001b&v=4",
  nome = "Filipe Góis",
}) => {
  const { userGlobalData } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <HeaderStyle>
      <WelcomeBox>
        <ImageProfileUser
          uriImageProfile={userGlobalData.foto || uriImageProfile}
        />
        <WelcomeTextBox>
          <TextMABold>Olá, </TextMABold>
          <TextMABold style={styles.nameStyle}>
            {userGlobalData.nome || nome}
          </TextMABold>
        </WelcomeTextBox>
      </WelcomeBox>
      {/* <ProfileButton onPress={() => navigation.navigate("Perfil")}>
        <Entypo
          name="chevron-small-right"
          size={30}
          color={Theme.colors.white.v1}
        />
      </ProfileButton> */}
    </HeaderStyle>
  );
};

export default Header;

const styles = StyleSheet.create({
  nameStyle: {
    fontSize: 19,
    color: Theme.colors.white.v1,
  },
});