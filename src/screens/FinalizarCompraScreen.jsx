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
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ ...styles.subtitulo, fontWeight: "bold" }}>
                  Estamos trabalhando para disponibilizar essa função o mais
                  rápido possível!
                </Text>
                <Button
                  onPress={() => navigation.navigate("CarrinhoScreen")}
                  style={styles.botao}
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
