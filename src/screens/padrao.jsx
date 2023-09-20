import { View } from "react-native"
import { styles } from "../utils/styles";

export default function HomeScreen() {
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
          {/* CONTEÚDO */}
        </View>
      </View>
    </View>
    )
}