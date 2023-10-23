import { View } from "react-native";
import { Image } from "expo-image";
import { Button, Text } from "react-native-paper";
import { styles } from "../utils/styles";

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
              onPress={() => navigation.navigate("RegisterUsu")}
              style={styles.botao2}
            >
              Quero contratar um serviço
            </Button>
            <Button
              textColor={"white"}
              onPress={() => navigation.navigate("CadPasso2")}
              style={styles.botao2}
            >
              Quero prestar um serviço
            </Button>
          </View>
          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}>
            <Button
              textColor={"black"}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.botaoPreto}>Voltar ao anterior</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
