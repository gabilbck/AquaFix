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
    container: { //Base: PRIMEIRO VIEW DE TODOS AZUL
        flex: 1,
        backgroundColor: "#16337E",
    },
    imagemTopo:{ //Base: IMAGEM DE CIMA
        alignItems: "center",
        paddingVertical: 40,
    },
    conteudo: { //Base: CONTEÚDO ESCRITO COM BOTOES TEXTOS ETC
        backgroundColor: "#F4F4F4",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 40,
        paddingHorizontal: 40,
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
    },
    titulo: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        color: '#16337E',
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        width: 270,
        fontSize: 17,
        padding: 10,
        // outros estilos do botão...
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        borderStyle: 'none',
        borderWidth: 1,
        outline: 'none',
        backgroundColor: 'white',
    },
    botao:{
        height: 50,
        fontSize: 17,
        padding: 10,
        backgroundColor: '#16337E',
        borderRadius: 5,
        color: 'white',
        textDecorationColor: 'white',
    }
});