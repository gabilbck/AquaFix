import { View, Text } from "react-native";
import { styles } from "../utils/styles";
import { Image } from "expo-image";
import { Button } from "react-native-paper";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FinalizarCompraScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.imagemTopo}>
            <Image
              source={require("../../assets/img/logocomp-branca.png")}
              style={{ width: 200, height: 127 }}
            />
          </View>
          <View style={styles.conteudo}>
            <View style={styles.containerInner}>
              <Text style={{ ...styles.titulo, marginBottom: 0 }}>
                FINALIZAR COMPRA
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...styles.subtitulo,
                    fontWeight: "bold",
                    fontSize: 20,
                    margin: 0,
                    padding: 0,
                  }}
                >
                  Estamos trabalhando para disponibilizar essa função o mais
                  rápido possível!
                </Text>
                <Button
                  onPress={() => navigation.navigate("CarrinhoScreen")}
                  style={{ ...styles.botao, marginBottom: 0 }}
                >
                  Voltar
                </Button>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
