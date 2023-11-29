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

  useEffect(async () => {
    const userCompleto = await getUser();

    const fetchCartData = async () => {
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

    fetchCartData();
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

  function handleRemoverItem(item) {
    console.log("Removendo item do carrinho: ", item);

    const carrinhoRef = collection(db, "carrinho");

    carrinhoRef(
      query(
        carrinhoRef,
        where("user_id", "==", user_id),
        where("id", "==", item.id)
      )
    )
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
      })
      .catch((error) => {
        console.error("Error removing item from cart: ", error.message);
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.imagemTopo}>
          <Image
            source={require("../../assets/img/logocomp-branca.png")}
            style={{ width: 200, height: 127 }}
          />
        </View>
        <View style={styles.conteudo}>
          <Text style={styles.titulo}>CARRINHO</Text>
          <View style={styles.containerInner}>
            {cartItems.map((item) => (
              <Card.Content key={item.id} style={styles.card}>
                {/* {console.log(item)} */}
                  <Image
                    source={{ uri: item.foto_prod }}
                    style={styles.imagemProduto}
                  />
                  <Text style={styles.cardTitle}>{item.nome_prod}</Text>
                  <Text style={styles.cardValor}>R$ {item.preco_prod}</Text>
                  <Text style={styles.cardTexto}>{item.desc_prod}</Text>
                  <Button
                    onPress={() => handleRemoverItem(item)}
                    style={styles.cardButton}
                  >
                    Remover
                  </Button>
              </Card.Content>
            ))}
            <Text style={styles.subtitulo}>
              Quantidade de itens: {cartItems.length}
            </Text>
            <Text style={styles.subtitulo}>Total: R$ {totalPrice}</Text>
            <Button onPress={handleFinalizarCompra} style={styles.botao}>
              Finalizar Compra
            </Button>
            <Button
              onPress={() => navigation.navigate("LojaScreen")}
              style={styles.botao}
            >
              Continuar Comprando
            </Button>
            <Text style={styles.error}>{msgErro}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
