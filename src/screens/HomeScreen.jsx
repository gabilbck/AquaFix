import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "../utils/styles";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
          <Text style={styles.titulo}>HOME</Text>
        </View>
        
      </View>
    </View>
  );
}

const Tabs = createMaterialBottomTabNavigator();

function TabsNavigation({navigation}) {
    return (
        <Tabs.Navigator 
        activeColor="#e91e63" 
        style={{ backgroundColor: 'tomato' }}>
            <Tabs.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }} />
        </Tabs.Navigator>
    );
}
