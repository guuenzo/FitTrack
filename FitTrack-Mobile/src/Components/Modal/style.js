import { Image, View } from "react-native";
import { Modal } from "react-native-paper";
import { styled } from "styled-components";

export const ModalStyle = styled(Modal).attrs({
  contentContainerStyle: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
})`
  padding: 5%;
`;

export const ModalContent = styled(View)`
  align-items: ${(props) => props.aligItems || "stretch"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  gap: ${(props) => props.gap || "0px"};
  width: ${(props) => props.width || "max-content"};
  height: ${(props) => props.height || "max-content"};
  border-radius: 10px;
`;

export const ContainerModalVideo = styled.View`
flex: 1;
/* border: 1px solid black; */
padding: 30px;
align-items: center;
justify-content: center;
background-color: rgba(0, 0, 0, 0.60);

`
export const ContentModalvideo = styled.View`
padding: 15px 20px;
width: 100%;
height: 58%;

border-radius: 10px;
/* border: 1px solid black; */


background-color: #fff;
justify-content: flex-start;
gap: 10px;
align-items: center;
`

export const ContainerVideo = styled.View`
width: 267px;
height: 283px;
/* border: 1px solid black; */
align-items: center;
justify-content: center;
margin-top: 15px;
background-color: #D9D9D9;
`

export const ContainerClose = styled.View`
justify-content: flex-start;
width: 100%;
/* border: 1px solid black; */
`

export const ImgVideo = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;