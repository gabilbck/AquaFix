import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";

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
                    name="HomeScreen"
                    component={HomeScreen} />
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