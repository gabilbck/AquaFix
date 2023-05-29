import { StyleSheet } from "react-native";

// CSS TEMPORÁRIO!
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#16337E',
    },
    box: {
        maxWidth: 300,
        width: '100%',
        borderRadius: 20,
        padding: 20,
        backgroundColor: 'white',
        shadowColor: '#A8A6A6',
        shadowOffset: {
            width: 3,
            height: 3,
        },
    },
    titulo: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        textDecorationStyle: 'bold',
    },
    distancia: {
        margin: 20,
    },
});