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
  /** Cadastros/Logins/etc */
  container: {
    //Base: PRIMEIRO VIEW DE TODOS AZUL
    flex: 1,
    backgroundColor: "#16337E",
  },
  container2: {
    marginTop: 40,
    maxWidth: 300,
    alignSelf: "center",
  },
  containerInner: {
    maxWidth: 500,
    width: "100%",
    
  },
  imagemTopo: {
    //logo DE CIMA
    alignItems: "center",
    paddingVertical: 40,
  },
  usuTopo: {
    alignItems: "center",
    paddingVertical: 30,
    width: "100%",
  },
  conteudo: {
    //CONTEÚDO ESCRITO COM BOTOES TEXTOS ETC => para cadastros
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 40,
    paddingHorizontal: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titulo: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    color: "#16337E",
    fontWeight: "bold",
    margin: 40,
  },
  titulo2: {
    fontSize: 17,
    textAlign: "left",

    color: "#16337E",
    fontWeight: "bold",
  },
  subtitulo2: {
    marginTop: 5,
    fontSize: 17,
    textAlign: "left",

    color: "#16337E",
    marginBottom: 25,
  },
  subtitulo: {
    textAlign: "center",
    color: "#16337E",
    fontSize: 15,
  },
  input: {
    height: 50,
    width: "100%",
    fontSize: 17,
    padding: 10,
    alignSelf: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    //borderStyle: 'none',
    borderWidth: 1,
    backgroundColor: "white",
    marginVertical: 12,
  },
  SelectPicker: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#333',
    paddingRight: 30, // para acomodar a seta do seletor
    marginBottom: 10,
  },

  botao: {
    fontSize: 17,
    padding: 4,
    backgroundColor: "#16337E",
    borderRadius: 5,
    color: "white",
    textDecorationColor: "white",
    alignSelf: "center",
    marginVertical: 40,
  },
  botao2: {
    fontSize: 17,
    padding: 4,
    backgroundColor: "#16337E",
    borderRadius: 5,
    color: "white",
    textDecorationColor: "white",
    alignSelf: "center",
    marginVertical: 10,
    width: "100%",
    paddingHorizontal: 30,
  },
  botaovermelho: {
    marginTop: 15,
    fontSize: 17,
    padding: 4,
    backgroundColor: "#e82c3c",
    borderRadius: 5,
    color: "white",
    textDecorationColor: "white",
    alignSelf: "left",
    marginVertical: 40,
    width: "50%",
  },
  botaoedit: {
    marginTop: 15,
    fontSize: 17,
    padding: 4,
    backgroundColor: "#16337E",
    borderRadius: 5,
    color: "white",
    textDecorationColor: "white",
    alignSelf: "left",
    marginVertical: 40,
    width: "50%",
  },
  botaoPreto: {
    fontWeight: "bold",
  },
  linha: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    paddingBottom: 50,
  },
  coluna: {
    flex: 1,
    alignItems: "center",
  },
  titulo_register: {
    fontSize: 25,
    textAlign: "center",
    margin: 20,
    color: "#16337E",
    fontWeight: "bold",
  },
  subtitulo_register: {
    textAlign: "center",
    color: "#16337E",
    fontSize: 15,
    marginBottom: 20,
  },
  textos_register: {
    textAlign: "center",
    color: "#16337E",
    fontSize: 15,
    marginBottom: 20,
    marginTop: 20,
  },

  card: {
    backgroundColor: "#f6f6f6",
    marginVertical: 10,
    elevation: 2,
    borderRadius: 8, // Adicione bordas arredondadas aos cards
  },

  cardTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },

  cardButton: {
    marginLeft: 10,
    justifyContent: "flex-end",
    backgroundColor: "#16337E",
  },

  textErr: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
  
});
