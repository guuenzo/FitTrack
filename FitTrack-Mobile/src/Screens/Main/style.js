import { BottomNavigation } from "react-native-paper";
import styled from "styled-components";
import Theme from "../../Styles/Theme";

export const BottomNavigationStyle = styled(BottomNavigation).attrs({
  barStyle: {
    height: 65,
    backgroundColor: Theme.colors.white.v1,
    shadowColor: Theme.colors.black.v1,
    shadowOpacity: 0.08,
    shadowOffset: "0px -4px",
    shadowRadius: "10px",
    elevation: 10,
  },
  activeIndicatorStyle: {
    backgroundColor: Theme.colors.secondaryScale.V1,
    height: 45,
    width: 45,
  },
  activeColor: Theme.colors.white.v1,
})``;
