import { Rating, AirbnbRating } from "react-native-ratings";
import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "../utils/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc, addDoc } from "firebase/firestore";

export default function PerfilViewScreen({ navigation, route }) {
  const [usuario, setUsuario] = useState({});
  const [estadoServico, setEstadoServico] = useState("");
  const [estadoLinkdin, setEstadoLinkdin] = useState("");
  const [estadoInsta, setEstadoInsta] = useState("");
  const [notaUsuPessimo, setNotaUsuPessimo] = useState("");
  const [notaUsuRuim, setNotaUsuRuim] = useState("");
  const [notaUsuSatisfatorio, setNotaUsuSatisfatorio] = useState("");
  const [notaUsuOtimo, setNotaUsuOtimo] = useState("");
  const [notaUsuPerfeito, setNotaUsuPerfeito] = useState("");
  const { pessoa } = route.params;

  useEffect(() => {
    setUsuario({ ...pessoa, uid: pessoa.id_pessoa });
  }, [pessoa]);

  useEffect(() => {
    if (!usuario.uid) return;
    const usuarioRef = doc(db, "usuario", usuario.uid);
    getDoc(usuarioRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
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
          {" "}
          Este usuário não possui serviços cadastrados{" "}
        </Text>
      );
    } else {
      setEstadoServico(
        <Text style={styles.subtitulo2}>
          {usuario?.servicos_usu} {usuario?.servicos_usu1}{" "}
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
            style={{ width: 50, height: 50, marginRight: 8 }}
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
            style={{ width: 50, height: 50, marginRight: 8 }}
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
          <View style={styles.conteudo}>
            <View style={styles.containerInner}>
              <Text style={styles.tipoconta}>{usuario?.tipo_conta}</Text>
              <TempComponente />
              <View style={{ border: "4px solid red" }}>
                <Button onPress={() => usuarioNota()} value="péssimo">
                  Péssimo {usuario?.nota_usu}
                </Button>
                <Button
                  backgroundColor="orange"
                  onPress={() => usuarioNota()}
                  value="ruim"
                >
                  Ruim {usuario?.nota_usu}
                </Button>
                <Button
                  backgroundColor="yellow"
                  onPress={() => usuarioNota()}
                  value="satisfatório"
                >
                  Satisfatório {usuario?.nota_usu}
                </Button>
                <Button
                  backgroundColor="green"
                  onPress={() => usuarioNota()}
                  value="ótimo"
                >
                  Ótimo {usuario?.nota_usu}
                </Button>
                <Button
                  backgroundColor="purple"
                  onPress={() => usuarioNota()}
                  value="perfeito"
                >
                  Perfeito {usuario?.nota_usu}
                </Button>
              </View>
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
                VOLTAR PARA A TELA ANTERIOR
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const TempComponente = () => {
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);

  // Configurar a referência para o banco de dados Firebase
  const dbRef = db.database().ref("ratings");

  useEffect(() => {
    // Recuperar as avaliações do Firebase e calcular a média
    dbRef.on("value", (snapshot) => {
      let totalRating = 0;
      let totalRatings = 0;

      snapshot.forEach((childSnapshot) => {
        const rating = childSnapshot.val();
        totalRating += rating;
        totalRatings++;
      });

      if (totalRatings > 0) {
        setAverageRating(totalRating / totalRatings);
      }
      setNumberOfRatings(totalRatings);
    });
  }, []);

  const handleRatingSubmit = () => {
    // Enviar a nova avaliação para o Firebase
    dbRef.push(userRating);
  };

  return (
    <View>
      <Text>Avaliação Média: {averageRating.toFixed(2)}</Text>
      <Text>Número de Avaliações: {numberOfRatings}</Text>
      <Rating
        type="star"
        ratingCount={5}
        imageSize={40}
        showRating
        onFinishRating={(rating) => setUserRating(rating)}
      />
      <Button title="Enviar Avaliação" onPress={handleRatingSubmit} />
    </View>
  );
};
