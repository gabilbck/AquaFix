import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, Linking } from "react-native";
import { styles } from "../utils/styles";

export default function VerProdScreen({ route, navigation }) {
  const { nome_prod, foto_prod, desc_prod, preco_pro } = route.params;
  const [showButton, setShowButton] = useState(true); // Alterado para true para exibir o botão inicialmente

  const handleDeleteProduct = () => {
    Alert.alert("Excluir Produto", "Tem certeza que deseja excluir este produto?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: () => {
          navigation.goBack();
        },
        style: "destructive",
      },
    ]);
  };

  const handleAddToCart = () => {
    // Lógica para adicionar ao carrinho
    // Você pode implementar sua lógica aqui
  };

  const handleOpenYoutubeLink = () => {
    Linking.openURL("https://www.youtube.com/watch?v=H-AT42lYGBg");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.imagemTopo}>
          <Image
            source={require("../../assets/img/logocomp-branca.png")}
            style={{ width: 200, height: 127 }}
          />
        </View>
        <View style={styles.conteudo}>
          <View style={styles.containerInner}>
            <Text style={styles.titulo}>PRODUTO</Text>
            <View style={styles.imageContainer}>
              <Image
                style={styles.imagemProduto}
                source={{ uri: foto_prod }}
              />
              <Text style={styles.productName}>{nome_prod}</Text>
              <Text style={styles.productPrice}>{preco_pro}</Text>
              <Text style={styles.productDescription}>{desc_prod}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "red" }]}
                  onPress={handleDeleteProduct}
                >
                  <Text style={styles.buttonText}>Excluir Produto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.addToCartButton]}
                  onPress={handleAddToCart}
                >
                  <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        {showButton && (
          <TouchableOpacity
            style={styles.youtubeButton}
            onPress={handleOpenYoutubeLink}
          >
            <Text style={styles.smallButtonText}>🎪</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
