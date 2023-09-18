import { View } from "react-native";
import { Image } from "expo-image";
import { Button, Text } from "react-native-paper";
import { styles } from "../utils/styles";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CadPasso1({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Parte que aparece a imagem: azul e logo */}
      <View style={styles.imagemTopo}>
        <Image
          source={require("../../assets/img/logocomp-branca.png")}
          style={{ width: 200, height: 127 }}
        />
      </View>
      {/* Parte que aparece o conteúdo: cinza/branco */}
      <View style={styles.conteudo}>
        <View style={styles.containerInner}>
          <Text style={styles.titulo}>CADASTRE-SE</Text>
          <Text style={styles.subtitulo}>
            Selecione abaixo a opção que melhor se adequa a sua necessidade
          </Text>
          <View style={styles.container2}>
            <Button
              textColor={"white"}
              onPress={navigation.navigate("RegisterPessoa")}
              style={styles.botao2}
            >
              Quero constratar um serviço
            </Button>
            <Button
              textColor={"white"}
              onPress={navigation.navigate("CadPasso2")}
              style={styles.botao2}
            >
              Quero prestar um serviço
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}