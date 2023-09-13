import { View } from "react-native";
import { Image } from "expo-image";
import { Text } from "react-native-paper";
import { styles } from "../utils/styles";
/**
 * @auth Gabrieli Eduarda Lembeck
 * @name LoginScreen
 * @description Tela de home do aplicativo
 * @function HomeScreen
 * @param {Object} navigation
 * @export RootNavigation
 * @return {React.Component}
 * @since 1.0.0
 */

/**
 *
 *
 * @export
 * @param {*} {navigation}
 * @return {*}
 */
export default function ProfileScreen({ navigation }) {
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
          <Text style={styles.titulo}>PERFIL</Text>
        </View>
      </View>
    </View>
  );
}
