import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { styles } from "../utils/styles";

/**
 * @function SplashScreen
 * @author Gabrieli Eduarda Lembeck 
 * @since 0.1.0
 * 
 * @description Tela de carregamento do aplicativo
 * @param {Object} navigation Objeto de navegação 
 * @export {Function} SplashScreen 
 * @return {React.Component} 
 */

export default function SplashScreen({navigation}) {

    // setTimeout(() =>{
    // navigation.navigate('TabsNavigation');
    // },1000)

    setTimeout(() =>{
      navigation.navigate('RegisterScreen');
      },1000)

    return (
    <View style={styles.container}>
    <ActivityIndicator/>
      <Text>Aguarde um instente...</Text>
    </View>
  );
}