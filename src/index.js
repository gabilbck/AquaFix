import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import RecuperarSenha from "./screens/RecuperarSenha";
import ProfileScreen from "./screens/ProfileScreen";
import TabsNavigation from "./screens/HomeScreen";
import CadPasso1 from "./screens/CadPasso1";
import CadPasso2 from "./screens/CadPasso2";
import RegisterAuto from "./screens/RegisterAuto";
import RegisterPes from "./screens/RegisterPes";

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
      <Stack.Navigator initialRouteName="RegisterUsu">
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
          name="RegisterPes"
          component={RegisterPes}
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
          name="HomeScreen"
          component={HomeScreen}
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
          name="ProfileScreen"
          component={ProfileScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const tabs = createBottomTabNavigator();

// export default function TabsNavigation() {
//     return (
//         <tabs.Navigator>
//             <tabs.Screen name="Home" component={HomeScreen} />
//             <tabs.Screen name="Profile" component={ProfileScreen} />
//         </tabs.Navigator>
//     );
// }
