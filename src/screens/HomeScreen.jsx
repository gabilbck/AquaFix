import React, { useEffect, useState } from "react";
import { View, TextInput, ScrollView } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { styles } from "../utils/styles";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { Image } from "expo-image";
import { Linking } from "react-native";
import { setUser } from "../utils/asyncstorage";

export default function HomeScreen({ navigation }) {
  const [usuario, setUsuario] = useState({});
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [link, setLink] = useState("");
  const [publicacoes, setPublicacoes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuário UID: ", user.uid);
        setUsuario({ uid: user.uid });

        // get user data from collection 'usuario' based on user.uid
        const usuarioRef = doc(db, "usuario", user.uid);
        getDoc(usuarioRef).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = {
              uid: user.uid,
              ...docSnapshot.data(),
            };
            console.log("Usuário completo:", userData);

            setUser(userData);
          }
        });
      } else {
        console.log("Usuário não logado");
      }
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    // verifica se uid não é vazio
    if (!usuario.uid) return;

    // referência ao documento no Firestore usando o UID do usuário
    const usuarioRef = doc(db, "usuario", usuario.uid);

    console.log("Buscando usuário com UID: ", usuario.uid);

    // busca o documento
    getDoc(usuarioRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          // pega os dados do documento
          const userData = docSnapshot.data();

          console.log("Usuário encontrado: ", userData);

          // precisa veriricar se user.adm é do FIRESTORE
          setIsAdmin(userData.adm === true ? true : false); // Defina como true se for um administrador
          console.log("Usuário é admin: ", userData.adm);
          console.log("Usuário é: ", userData);
          setUsuario(userData);
        } else {
          console.log("Usuário não encontrado !!!");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar usuário:", error);
      });
  }, [usuario.uid]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuário UID: ", user.uid);
        setUsuario({ uid: user.uid, nome_usu: user.displayName }); // Defina o nome do usuário aqui
        // Verifique se o usuário é um administrador (defina isso de acordo com sua lógica)
        const usuarioRef = doc(db, "usuario", user.uid);
      } else {
        console.log("Usuário não logado");
        // Se não estiver logado, defina isAdmin como false
        setIsAdmin(false);
      }
    });

    carregarPublicacoes();

    return () => {
      unsub();
    };
  }, []);

  const handleCadastro = async () => {
    if (titulo && texto && link) {
      try {
        // Gere um ID personalizado para a publicação
        const publicacaoId = Date.now(); // Use um valor numérico para o ID

        // Adicione os dados ao Firestore, incluindo o ID personalizado
        const docRef = await addDoc(collection(db, "publi_adm"), {
          id: publicacaoId,
          titulo_puli_adm: titulo,
          texto: texto,
          link: link,
        });

        console.log("Documento cadastrado com ID: ", docRef.id);
        // Limpe os campos após o cadastro
        setTitulo("");
        setTexto("");
        setLink("");
        // Recarregue as publicações após o cadastro
        carregarPublicacoes();
      } catch (error) {
        console.error("Erro ao cadastrar documento: ", error);
      }
    } else {
      console.warn("Preencha todos os campos.");
    }
  };

  const carregarPublicacoes = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "publi_adm"), orderBy("id", "desc"))
      );
      const publicacoesData = querySnapshot.docs.map((doc) => doc.data());
      setPublicacoes(publicacoesData);
    } catch (error) {
      console.error("Erro ao buscar publicações: ", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* Parte que aparece a imagem: azul e logo */}
          <View style={styles.imagemTopo}>
            <Image
              source={require("../../assets/img/logocomp-branca.png")}
              style={{ width: 200, height: 127 }}
            />
          </View>
          {/* Parte que aparece o conteúdo: cinza/branco */}
          <View style={{ ...styles.conteudo, flex: 1 }}>
            <View style={styles.containerInner}>
              <Text style={styles.titulo}>Bom dia, {usuario?.nome_usu}!</Text>
              <Text style={styles.subtitulo}>
                Venha conhecer as novidades do momento:
              </Text>
              {isAdmin && (
                <View>
                  <TextInput
                    placeholder="Título"
                    value={titulo}
                    onChangeText={(text) => setTitulo(text)}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Texto"
                    value={texto}
                    onChangeText={(text) => setTexto(text)}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Link"
                    value={link}
                    onChangeText={(text) => setLink(text)}
                    style={styles.input}
                  />
                  <Button
                    onPress={handleCadastro}
                    style={styles.botao}
                    textColor="white"
                  >
                    PUBLICAR
                  </Button>
                </View>
              )}
              {/* Lista de publicações */}
              {publicacoes.length === 0 && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ ...styles.subtitulo, fontWeight: "bold" }}>
                    Nenhuma publicação encontrada.
                  </Text>
                </View>
              )}
              <View>
                {publicacoes.map((publicacao, index) => (
                  <View key={index}>
                    <Card key={publicacao.id} style={styles.card}>
                      <Card.Content>
                        <Text
                          fontWeight="bold"
                          style={{
                            fontSize: 25,
                            fontWeight: "bold",
                            gap: 10,
                            color: "white",
                          }}
                        >
                          {publicacao.titulo_puli_adm}
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: "white",
                            marginTop: 7,
                          }}
                        >
                          {publicacao.texto}
                        </Text>
                      </Card.Content>
                      <Card.Actions>
                        <Button
                          style={{
                            backgroundColor: "lightgray",
                            borderRadius: 8,
                            border: 0,
                            marginTop: 10,
                            width: "100%",
                          }}
                          onPress={() => Linking.openURL(publicacao.link)}
                        >
                          <Text style={{ color: "black", fontWeight: "bold" }}>
                            Acessar
                          </Text>
                        </Button>
                      </Card.Actions>
                    </Card>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
