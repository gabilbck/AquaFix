import React, { useState } from "react";
import { Button } from "react-native-paper";
import { Text, View, TextInput, ScrollView, Image } from "react-native";
import { styles } from "../utils/styles";
import { auth, db, storage } from "../config/firebase";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

export default function RegisterProd({ navigation }) {
  const [nomeProd, setNomeProd] = useState("");
  const [nomeProdErr, setnomeProdErr] = useState("");
  const [descProd, setDescProd] = useState("");
  const [descProdErr, setDescProdErr] = useState("");
  const [precoProd, setPrecoProd] = useState("");
  const [precoProdErr, setPrecoProdErr] = useState("");
  const [imagemProd, setImagemProd] = useState(null);
  const [imagemProdErr, setImagemProdErr] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagemProd(result.uri);
    }
  };


  const uploadImageToFirebase = async () => {
    try {
      const response = await fetch(imagemProd);
      const blob = await response.blob();
  
      const storageRef = ref(storage, 'foto_usu/' + Date.now());
      const uploadTask = uploadBytes(storageRef, blob);
  
      await uploadTask;
  
      const imageURL = await getDownloadURL(storageRef);
      setImageToFirebase(imageURL);
    } catch (error) {
      console.error('Erro ao enviar a imagem: ', error);
    }
  };
  
  const setImageToFirebase = async (url) => {
    try {
      // Verificar se o nome do produto já está registrado
      const produtoQuery = query(
        collection(db, "produto"),
        where("nome_prod", "==", nomeProd)
      );
      const produtoQuerySnapshot = await getDocs(produtoQuery);
  
      if (!produtoQuerySnapshot.empty) {
        console.error("Produto já cadastrado");
        // Tratar o erro ou exibir uma mensagem adequada ao usuário
        return;
      }
  
      // Cadastrar o produto no banco de dados
      await setDoc(doc(db, "produto", nomeProd), {
        user_id: auth.currentUser.uid,
        nome_prod: nomeProd,
        desc_prod: descProd,
        preco_prod: "R$" + precoProd,
        foto_prod: imagemProd, // Usar a URL da imagem enviada para o Firebase Storage
      }).then(() => {
          console.log("Cadastrado!");
          navigation.navigate("LojaScreen"); //pagina principal de produto
        });
        await uploadImageToFirebase();

    } catch (error) {
        console.error("Erro ao cadastrar o produto", error);
      // Handle error codes
    }
  };

    const Registrar = () => {
      if (nomeProd === "") {
        setnomeProdErr("Preencha o campo Nome");
        return;
      }
      if (descProd == "") {
        setDescProdErr("Preencha o campo Descrição");
        return;
      }
      if (precoProd == "") {
        setPrecoProdErr("Preencha o campo Preço");
        return;
      }
      if (imagemProd == null) {
        setImagemProdErr("Escolha uma foto");
        return;
      }
  
      setImageToFirebase();
    };

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
              <View style={styles.containerInner}>
                <Text style={styles.titulo_register}>CADASTRAR PRODUTO</Text>
                <Text style={styles.subtitulo_register}>
                  Cadastre seu produto aqui:
                </Text>
                <TextInput
                  placeholder="Nome do Produto"
                  value={nomeProd}
                  onChangeText={setNomeProd}
                  style={styles.input}
                />
                <Text style={styles.textErr}>{nomeProdErr}</Text>
                <TextInput
                  placeholder="Descrição do Produto"
                  value={descProd}
                  onChangeText={setDescProd}
                  style={styles.input}
                />
                <Text style={styles.textErr}>{descProdErr}</Text>
                <TextInput
                  placeholder="Preço do Produto"
                  value={precoProd}
                  onChangeText={setPrecoProd}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <Text style={styles.textErr}>{precoProdErr}</Text>
                {imagemProd ? (
                  <Image
                    source={{ uri: imagemProd }}
                    style={{
                      width: 200,
                      height: 200,
                      borderRadius: "50%",
                      alignSelf: "center",
                      marginTop: 10,
                      marginBottom: 10,
                      borderWidth: 4,
                      borderColor: "#16337E",
                    }}
                  />
                ) : (
                  <Button onPress={pickImage} style={styles.botao} textColor="white">
                    Escolher foto
                  </Button>
                )}
                <Text style={styles.textErr}>{imagemProdErr}</Text>
                <Button textColor={"white"} onPress={Registrar} style={styles.botao}>
                  REGISTRAR
                </Button>
                {/* Restante do seu código... */}
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }