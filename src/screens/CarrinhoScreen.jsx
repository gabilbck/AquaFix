import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { styles } from "../utils/styles";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export default function CarrinhoScreen({ route }) {
  const { user_id } = route.params;
  const [cartItems, setCartItems] = useState([]);

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
          console.log("User has no items in the cart.");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error.message);
      }
    };

    fetchCartData();
  }, [user_id]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>CARRINHO</Text>
      {/* Render cart items here using the cartItems state */}
    </View>
  );
}