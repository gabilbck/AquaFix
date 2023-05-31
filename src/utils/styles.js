import { StyleSheet } from "react-native";

/**
 * @description Arquivo de estilos globais
 * @param {object} styles Objeto com os estilos
 * @param {object} styles.container Estilo do container
 * @param {object} styles.box Estilo da caixa
 * @param {object} styles.titulo Estilo do título
 * @param {object} styles.distancia Estilo da distância
 * @param {object} styles.input Estilo do input
 * @param {object} styles.inputFocus Estilo do input quando focado
 * @since 0.1.0
 */

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
    input: {
        boxShadow: 'inset 0 5 10 0 rgba(0, 0, 0, 0.5)',

    },
    inputFocus: {
        transform: "translateY('5px')",
        boxShadow: 'inset 0px 10px 20px 2px rgba(0, 0, 0, 0.25)',
    },
});