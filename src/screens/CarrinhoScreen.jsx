import React, { useState, useEffect } from "react";
import { View, Text, Image, Button } from "react-native";
import { styles } from "../utils/styles";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { ScrollView } from "react-native-web";

export default function CarrinhoScreen({ route, navigation }) {
  const { user_id } = route.params;
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [msgErro, setMsgErro] = useState("");

  useEffect(() => {
    const fetchCartData = async () => {
      try {
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
      query(carrinhoRef, where("user_id", "==", user_id), where("id", "==", item.id))
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            <View key={item.id} style={styles.card}>
              <Text style={styles.textoCard}>ID: {item.id}</Text>
              <Text style={styles.tituloCard}>{item.nome_prod}</Text>
              <Text style={styles.textoCard}>R$ {item.preco_prod}</Text>
              <Text style={styles.textoCard}>{item.desc_prod}</Text>
              <Text style={styles.imagemProduto}>{item.foto_prod}</Text>
              <Button onPress={() => handleRemoverItem(item)}>Remover</Button>
            </View>
          ))}
          <Text style={styles.tituloCard}>Carrinho</Text>
          <Text style={styles.tituloCard}>Quantidade de itens: {cartItems.length}</Text>
          <Text style={styles.tituloCard}>Total: R$ {totalPrice}</Text>
          <Button onPress={handleFinalizarCompra}>Finalizar Compra</Button>
          <Button onPress={() => navigation.navigate("LojaScreen")}>Continuar Comprando</Button>
          <Text style={styles.error}>{msgErro}</Text>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}
