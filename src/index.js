import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

/**
 * @auth Gabrieli Eduarda Lembeck
 * @since 1.0.0
 * @description Função que retorna a navegação de telas
 * @param {Object} navigation
 * @export RootNavigation função que retorna a navegação de telas
 * @return {React.Component} navegação principal
 */

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="TabsNavigation"
                    component={TabsNavigation}
                    options={{
                        headerShown: false,
                    }} />
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{
                        headerShown: false,
                    }} />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                    }} />
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const Tabs = createMaterialBottomTabNavigator();

function TabsNavigation() {
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