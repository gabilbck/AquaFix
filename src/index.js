import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import RecuperarSenha from "./screens/RecuperarSenha";
import CadPasso1 from "./screens/CadPasso1";
import CadPasso2 from "./screens/CadPasso2";
import RegisterAuto from "./screens/RegisterAuto";
import RegisterUsu from "./screens/RegisterUsu";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PesquisaScreen from "./screens/PesquisaScreen";
import PerfilScreen from "./screens/PerfilScreen";
import EditUsu from "./screens/EditUsu";
import RegisterEmp from "./screens/RegisterEmp";
import PerfilViewScreen from "./screens/PerfilViewScreen";
import CarrinhoScreen from "./screens/CarrinhoScreen";
import LojaScreen from "./screens/LojaScreen";
import RegisterProd from "./screens/RegisterProd";
import VerProdScreen from "./screens/VerProdScreen";
import RecuperarSenha2 from "./screens/RecuperarSenha2";

/**
 * @auth Gabrieli Eduarda Lembeck
 * @since 1.0.0
 * @description Função que retorna a navegação de telas
 * @param {Object} navigation
 * @export RootNavigation função que retorna a navegação de telas
 * @return {React.Component} navegação principal
 */

const Stack = createNativeStackNavigator();

export default function RootNavigation({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadPasso1"
          component={CadPasso1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CadPasso2"
          component={CadPasso2}
          options={{
            headerShown: false,
          }}
        />

        {/* <Stack.Screen
                    name="TabsNavigation"
                    component={TabsNavigation}
                    options={{
                        headerShown: false,
                    }} /> */}

        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TabsNavigation"
          component={TabsNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RecuperarSenha"
          component={RecuperarSenha}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RecuperarSenha2"
          component={RecuperarSenha2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterAuto"
          component={RegisterAuto}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterUsu"
          component={RegisterUsu}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterEmp"
          component={RegisterEmp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PesquisaScreen"
          component={PesquisaScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterProd"
          component={RegisterProd}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PerfilScreen"
          component={PerfilScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditUsu"
          component={EditUsu}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PerfilViewScreen"
          component={PerfilViewScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VerProdScreen"
          component={VerProdScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tabs = createMaterialBottomTabNavigator();

function TabsNavigation() {
  return (
    <Tabs.Navigator
      initialRouteName="Feed"
      // tabBarColor="blue"
      // tabBarActiveTextColor="white"
      activeColor="white"
      inactiveColor="white"
      selectedLabelStyle={{ backgroundColor: "white" }}
      // labelStyle={{ fontSize: 12 }}
      // style={{ backgroundColor: "white" }}
      barStyle={{
        backgroundColor: "#16337E",
      }}
      shifting={true}
      tabBarColor="white"
    >
      <Tabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={33} />
          ),
        }}
      />
      <Tabs.Screen
        name="PesquisaScreen"
        component={PesquisaScreen}
        options={{
          tabBarLabel: "Pesquise",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={33} />
          ),
        }}
      />
      <Tabs.Screen
        name="LojaScreen"
        component={LojaScreen}
        options={{
          tabBarLabel: "Loja",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="store" color={color} size={33} />
          ),
        }}
      />
      <Tabs.Screen
        name="CarrinhoScreen"
        component={CarrinhoScreen}
        options={{
          tabBarLabel: "Carrinho",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color={color} size={33} />
          ),
        }}
      />
      <Tabs.Screen
        name="PerfilScreen"
        component={PerfilScreen}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={33} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
