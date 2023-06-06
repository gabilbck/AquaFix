import { View } from "react-native";
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
export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}
