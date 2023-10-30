import React from "react";
import {
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "../utils/styles";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function PerfilViewScreen({ navigation, route }) {
  const [usuario, setUsuario] = useState({});
  // const [pessoa, onChangePessoa] = useState(route.params.title);
  const [estadoServico, setEstadoServico] = useState("");
  const [estadoLinkdin, setEstadoLinkdin] = useState("");
  const [estadoInsta, setEstadoInsta] = useState("");
  const [notaUsu, setNotaUsu] = useState("");

  // traga os props id id e nome
  const { pessoa } = route.params;

  // useEffect(() => {
  //   console.log("vou busar por este id_pessoa: ", id_pessoa);
  //   setUsuario({
  //     nome_usu: nome_pessoa,
  //     uid: id_pessoa,
  //   });
  // }, [id_pessoa, nome_pessoa]);

  useEffect(() => {
    setUsuario({
      ...pessoa,
      uid: pessoa.id_pessoa,
    });
    console.log("Trouxe essa pessoa maravilhosa:", pessoa);
    console.log(usuario);
  }, [pessoa]);

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
          setUsuario(userData);
          if (userData.whatsapp_usu) {
            userData.whatsapp_usu = extractCleanPhoneNumber(
              userData.whatsapp_usu
            );
          }
        } else {
          console.log("Usuário não encontrado !!!");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar usuário:", error);
      });
  }, [usuario.uid]);

  const openWhatsAppChat = () => {
    if (usuario?.whatsapp_usu) {
      const whatsappNumber = usuario?.whatsapp_usu;

      // Validate and sanitize the phone number
      const sanitizedWhatsAppNumber = whatsappNumber.replace(/[^0-9]/g, "");

      if (sanitizedWhatsAppNumber.length === 0) {
        console.error("Invalid WhatsApp number");
        return;
      }

      const whatsappUrl = `https://api.whatsapp.com/send?phone=55${sanitizedWhatsAppNumber}`;

      Linking.openURL(whatsappUrl)
        .then((data) => {
          console.log("WhatsApp chat opened");
        })
        .catch((error) => {
          console.error("Error opening WhatsApp chat", error);
        });
    } else {
      console.warn("User has not registered a WhatsApp number");
    }
  };

  const extractCleanPhoneNumber = (phoneNumber) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, "");
    return cleanedNumber;
  };

  function VerificaServico() {
    const servicosList = [
      usuario?.servicosUsu,
      usuario?.servicosUsu1,
      usuario?.servicosUsu2,
    ];
    if (
      servicosList.every((servico) => servico === "") ||
      servicosList.every((servico) => servico === undefined)
    ) {
      setEstadoServico(
        <Text style={styles.subtitulo2}>
          Este usuário não possui serviços cadastrados
        </Text>
      );
    } else {
      setEstadoServico(
        <Text style={styles.subtitulo2}>
          {usuario?.servicos_usu}
          {usuario?.servicos_usu1}
          {usuario?.servicos_usu2}
        </Text>
      );
    }
  }

  function VerificaLinkdin() {
    if (usuario?.linkedin_usu != "" || usuario?.linkedin_usu != undefined) {
      setEstadoLinkdin(
        <TouchableOpacity
          onPress={() => openSocialMediaLink(usuario?.linkedin_usu)}
          style={styles.socialMediaIcon}
        >
          <Image
            source={require("../../assets/img/linkedin.png")}
            style={{
              width: 50,
              height: 50,
              marginRight: 8,
            }}
          />
        </TouchableOpacity>
      );
    } else {
      setEstadoLinkdin("");
    }
  }

  function VerificaInsta() {
    if (usuario?.instagram_usu != "" || usuario?.instagram_usu != undefined) {
      setEstadoInsta(
        <TouchableOpacity
          onPress={() => openSocialMediaLink(usuario?.instagram_usu)}
          style={styles.socialMediaIcon}
        >
          <Image
            source={require("../../assets/img/instagram.png")}
            style={{
              width: 50,
              height: 50,
              marginRight: 8,
            }}
          />
        </TouchableOpacity>
      );
    } else {
      setEstadoInsta("");
    }
  }

  useEffect(() => {
    VerificaServico() && VerificaLinkdin() && VerificaInsta() && usuarioNota();
  }, [usuario.uid]);

  async function usuarioNota() {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const uid = userCredential.user.uid;
    const notaUsuario = () => {
      try {
        addDoc(doc(db, "usuario"), {
          nota_usu: notaUsu,
          outrocampo: "Nota adicionada!",
        });
        console.log("Cadastrado!");
      } catch (error) {
        console.log(error);
      }
    };
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* Parte que aparece a imagem: azul e logo */}
          <View style={styles.usuTopo}>
            <Image
              source={usuario.foto_usu}
              style={{
                width: 103,
                height: 103,
                borderRadius: 50,
                alignSelf: "center",
                marginTop: 10,
                marginBottom: 10,
                borderColor: "white",
                borderWidth: 4,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "white",
                marginTop: 7,
              }}
            >
              {usuario.nome_usu}
            </Text>
          </View>
          {/* Parte que aparece o conteúdo: cinza/branco */}
          <View style={styles.conteudo}>
            <View style={styles.containerInner}>
              <Text style={styles.tipoconta}>{usuario?.tipo_conta}</Text>
              <Button
                backgroundColor="red"
                onPress={() => notaUsuario()}
                value="péssimo"
              >
                Péssimo {usuario?.nota_usu}
              </Button>
              <Button
                backgroundColor="orange"
                onPress={() => notaUsuario()}
                value="ruim"
              >
                Ruim {usuario?.nota_usu}
              </Button>
              <Button
                backgroundColor="yellow"
                onPress={() => notaUsuario()}
                value="satisfatório"
              >
                Satisfatório {usuario?.nota_usu}
              </Button>
              <Button
                backgroundColor="green"
                onPress={() => notaUsuario()}
                value="ótimo"
              >
                Ótimo {usuario?.nota_usu}
              </Button>
              <Button
                backgroundColor="purple"
                onPress={() => notaUsuario()}
                value="perfeito"
              >
                Perfeito {usuario?.nota_usu}
              </Button>
              <Text style={styles.titulo2}>Nome: </Text>
              <Text style={styles.subtitulo2}>{usuario?.nome_completo}</Text>
              <Text style={styles.titulo2}>Apelido: </Text>
              <Text style={styles.subtitulo2}>{usuario?.nome_usu}</Text>
              <Text style={styles.titulo2}>Email: </Text>
              <Text style={styles.subtitulo2}>{usuario?.email_usu}</Text>
              <Text style={styles.titulo2}>Biografia: </Text>
              <Text style={styles.subtitulo2}>{usuario?.bio_usu}</Text>
              <Text style={styles.titulo2}>Telefone para contato:</Text>
              <Text style={styles.subtitulo2}>{usuario?.whatsapp_usu}</Text>
              <Text style={styles.titulo2}>Serviços que você oferece:</Text>
              {estadoServico}
              <Text style={styles.titulo2}>Entrar em Contato:</Text>
              <View style={styles.socialMediaContainer}>
                <TouchableOpacity onPress={openWhatsAppChat}>
                  <View style={styles.socialMediaIcon}>
                    <Image
                      source={require("../../assets/img/whatsapp.png")}
                      style={{
                        width: 50,
                        height: 50,
                        marginRight: 8, // Espaçamento entre as imagens
                      }}
                    />
                  </View>
                </TouchableOpacity>
                {estadoLinkdin}
                {estadoInsta}
              </View>
              <Button
                onPress={() => navigation.goBack()}
                style={{ ...styles.botao, marginTop: 0 }}
              >
                VOLTAR
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
