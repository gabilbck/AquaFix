import { GeoPoint } from "firebase/firestore";
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
  /** Geral */
  /** Cadastros/Logins/etc */
  container: {
    //Base: PRIMEIRO VIEW DE TODOS AZUL
    flex: 1,
    backgroundColor: "#16337E",
    width: "100%",
  },
  container2: {
    marginTop: 40,
    maxWidth: 300,
    alignSelf: "center",
  },
  containerInner: {
    maxWidth: 500,
    width: "100%",
    height: "100%",
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
  subtitulo3: {
    textAlign: "left",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
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
    borderColor: "#ccc",
    borderRadius: 8,
    color: "#333",
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
  card2: {
    backgroundColor: "#16337e",
    marginVertical: 10,
    elevation: 2,
    borderRadius: 8, // Adicione bordas arredondadas aos cards
  },
  botaoverde: {
    fontSize: 17,
    padding: 4,
    backgroundColor: "#32A22C",
    borderRadius: 5,
    color: "white",
    textDecorationColor: "white",
    alignSelf: "center",
    marginBottom: 20,
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
  botao3: {
    marginTop: 10,
    fontSize: 17,
    padding: 4,
    backgroundColor: "#16337E",
    borderRadius: 5,
    color: "white",
    textDecorationColor: "white",
    alignSelf: "center",
    marginVertical: 10,
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
  botaovermelho2: {
    marginBottom: 10,
    fontSize: 17,
    padding: 4,
    backgroundColor: "#e82c3c",
    borderRadius: 5,
    color: "white",
    textDecorationColor: "white",
    alignSelf: "center",
    marginVertical: 10,
  },
  botaovermelho3: {
    marginBottom: 10,
    fontSize: 17,
    padding: 4,
    backgroundColor: "#e82c3c",
    borderRadius: 5,
    color: "white",
    textDecorationColor: "white",
    alignSelf: "center",
    marginVertical: 10,
    marginTop: 20,
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
  botaoedit2: {
    marginTop: 10,
    fontSize: 17,
    padding: 4,
    backgroundColor: "#16337E",
    borderRadius: 5,
    color: "white",
    textDecorationColor: "white",
    marginVertical: 10,
    alignSelf: "left",
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
  imagemProduto: {
    width: 100, // Ajuste o tamanho conforme necessário
    height: 100, // Ajuste o tamanho conforme necessário
    borderRadius: 100,
  },
  imagemProduto2: {
    margin: 10,
    width: 90, // Ajuste o tamanho conforme necessário
    height: 90, // Ajuste o tamanho conforme necessário
    borderRadius: 13,
  },
  imagemProduto3: {
    marginBottom: 35,
    width: 270, // Set the width to your desired value
    height: 270, // Set the height to your desired value
    alignSelf: 'center',
    borderRadius: 10,
  },
  
  
  card: {
    backgroundColor: "#16337e",
    marginVertical: 10,
    elevation: 2,
    borderRadius: 8, // Adicione bordas arredondadas aos cards
    color: "white",
    maxWidth: "100%",
    width: "100%",
    wordWrap: "break-word",
    overflowWrap: "break-word",
  },

  cardTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },

  cardProduto: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    wordWrap: "break-word",
    overflowWrap: "break-word",
  },

  cardValor: {
    marginTop: 7,
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },

  cardTexto: {
    wordWrap: "break-word",
    overflowWrap: "break-word",
    fontSize: 17,
    color: "white",
    width: "70%",
  },

  cardButton: {
    marginLeft: 10,
    justifyContent: "flex-end",
    backgroundColor: "#16337E",
  },

  cardContent: {
    margin: 0,
    padding: 0,
  },

  textErr: {
    color: "red",
    fontWeight: "bold",

    marginTop: 6,
    textAlign: "center",
  },
  fakespaceErr: {
    marginBottom: 10,
    marginTop: 6,
  },
  socialMediaContainer: {
    flexDirection: "row",
    justifyContent: "left",
    marginTop: 12,
    marginBottom: 12,
  },
  socialMediaIcon: {
    alignItems: "left",
  },

  tipoconta: {
    padding: 10,
    alignSelf: "center",
    borderRadius: 100,
    backgroundColor: "white",
    color: "#16337E",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
  servicos: {
    padding: 8,
    borderRadius: 15,
    backgroundColor: "white",
    color: "black",
    textAlign: "center",
    marginTop: 5,
    textAlignVertical: "center",
    textAlign: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",

  },
  linhaServicos: {
    flexDirection: "row",
    
    justifyContent: "space-between",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",

    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    margin: 20,
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 17,
    marginBottom: 12,
    textAlign: "center",
  },
  botaoAvaliar: {
    alignSelf: "center",
    alignContent: "left",
    alignItems: "left",
    borderRadius: 5,
    backgroundColor: "#16337E",
    color: "White",
    marginBottom: 20,
    fontWeight: "bold",
  },

  backButton: {
    marginTop: 10,
    fontSize: 17,
    padding: 4,
    backgroundColor: "#808080", 
    borderRadius: 10,
    color: "white",
    textDecorationColor: "white",
    alignSelf: "center",
    marginVertical: 10,
  },

  button: {
    fontSize: 17,
    padding: 4,
    backgroundColor: "red",
    borderRadius: 10,
    color: "white",
    textDecorationColor: "white",
    alignSelf: "center",
    marginBottom: 20,
  },
  
  imageContainer: {
    backgroundColor: "#16337E", 
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  productName: {
    color: "white", // Altere para a cor desejada
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  productPrice: {
    color: "white", // Altere para a cor desejada
    fontSize: 18,
    marginTop: 5,
  },

  productDescription: {
    color: "white", // Altere para a cor desejada
    fontSize: 16,
    marginTop: 10,
  },

  addToCartButton: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },

  addToCartButtonText: {
    color: "#16337E", // Altere para a cor desejada
    fontSize: 18,
    fontWeight: "bold",
  },

  

});

