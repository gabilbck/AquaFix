import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../utils/styles";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { ScrollView } from "react-native";
import { Button, Card } from "react-native-paper";
import { getUser } from "../utils/asyncstorage";

export default function CarrinhoScreen({ route, navigation }) {
  const { user_id } = route.params || {};
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [msgErro, setMsgErro] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userCompleto = await getUser();

      try {
        const user_id = userCompleto.uid;
        const cartQuery = query(
          collection(db, "carrinho"),
          where("user_id", "==", user_id)
        );

        const cartSnapshot = await getDocs(cartQuery);

        if (!cartSnapshot.empty) {
          const cartData = cartSnapshot.docs.map((doc) => doc.data());
          setCartItems(cartData);
        } else {
          console.log("Você não tem nenhum item no carrinho.");
          setMsgErro("Você não tem nenhum item no carrinho.");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error.message);
      }
    };

    fetchData();
  }, [user_id]);

  useEffect(() => {
    if (!cartItems.length) return;

    const total = cartItems.reduce((acc, item) => {
      return acc + item.preco_prod;
    }, 0);

    setTotalPrice(total);
  }, [cartItems]);

  function handleFinalizarCompra() {
    navigation.navigate("FinalizarCompra", { user_id });
  }

  async function handleRemoverItem(item) {
    try {
      const userCompleto = await getUser();
      const currentUserID = userCompleto?.uid;
  
      if (!currentUserID || !item.id) {
        console.error("user_id ou item.id é undefined.");
        return;
      }
  
      const carrinhoRef = collection(db, "carrinho");
      const queryRef = query(
        carrinhoRef,
        where("user_id", "==", currentUserID),
        where("id", "==", item.id)
      );
  
      const querySnapshot = await getDocs(queryRef);
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          try {
            await deleteDoc(doc.ref);
            // Atualizar o estado para refletir a remoção no UI
            setCartItems((prevItems) =>
              prevItems.filter((prevItem) => prevItem.id !== item.id)
            );
          } catch (error) {
            console.error("Erro ao remover item: ", error.message);
          }
        });
      } else {
        console.warn("Item não encontrado no carrinho.");
      }
    } catch (error) {
      console.error("Erro ao obter usuário: ", error.message);
    }
  }

  const uniqueKeys = cartItems.map((item) => item.id);

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.imagemTopo}>
            <Image
              source={require("../../assets/img/logocomp-branca.png")}
              style={{ width: 200, height: 127 }}
            />
          </View>
          <View style={styles.conteudo}>
            <Text style={styles.titulo}>CARRINHO</Text>
            <View style={styles.containerInner}>
              {cartItems.map((item, index) => (
                <View key={index}>
                  <Card style={styles.card}>
                    <View style={{ flexDirection: "row" }}>
                      <Card.Cover
                        source={{ uri: item.foto_prod }}
                        style={styles.imagemProduto2}
                      />
                      <Card.Content style={styles.cardContent}>
                        <Text style={styles.cardProduto}>{item.nome_prod}</Text>
                        <Text style={styles.cardTexto}>{item.desc_prod}</Text>
                        <Text style={styles.cardValor}>
                          R$ {item.preco_prod}
                        </Text>
                      </Card.Content>
                    </View>
                    <Card.Actions>
                      <Button
                        style={{
                          backgroundColor: "red",
                          borderRadius: 8,
                          border: 0,
                          marginTop: 0,
                          width: "100%",
                        }}
                        onPress={() => handleRemoverItem(item)}
                      >
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                          Remover
                        </Text>
                      </Button>
                    </Card.Actions>
                  </Card>
                </View>
              ))}

              <Text style={{ ...styles.subtitulo, marginTop: 10 }}>
                Quantidade de itens: {cartItems.length}
              </Text>
              <Text style={styles.subtitulo}>Total: R$ {totalPrice}</Text>
              <Button
                onPress={handleFinalizarCompra}
                style={{ ...styles.botaoverde, marginTop: 10 }}
              >
                COMPRAR
              </Button>
              <Button
                onPress={() => navigation.navigate("LojaScreen")}
                style={styles.botao}
              >
                CONTINUAR COMPRANDO
              </Button>
              <Text style={styles.error}>{msgErro}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
