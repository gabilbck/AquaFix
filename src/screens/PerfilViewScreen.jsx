import React, { useEffect, useState } from "react";
import { Image, View, ScrollView, Linking, Pressable } from "react-native";
import { Button, Modal, Text } from "react-native-paper";
import { Rating } from "react-native-ratings";
import { auth, db } from "../config/firebase";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { styles } from "../utils/styles";

export default function PerfilViewScreen({ navigation, route }) {
  const [usuario, setUsuario] = useState({});
  const [estadoServico, setEstadoServico] = useState("");
  const [estadoLinkdin, setEstadoLinkdin] = useState("");
  const [estadoInsta, setEstadoInsta] = useState("");
  const { pessoa } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [mediaAvaliacoes, setMediaAvaliacoes] = useState(0);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [rating, setRating] = useState();

  useEffect(() => {
    setUsuario({ ...pessoa, uid: pessoa.nome_usu });
    console.log("Pessoa: ", pessoa);
  }, [pessoa]);

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

  function VerificaServico() {
    const servicosList = [
      usuario?.servicos_usu,
      usuario?.servicos_usu1,
      usuario?.servicos_usu2,
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
          {usuario?.servicos_usu}{", "+usuario?.servicos_usu1}
          {", "+usuario?.servicos_usu2}
        </Text>
      );
    }
  }

  function VerificaLinkdin() {
    if (usuario?.linkedin_usu != "" || usuario?.linkedin_usu != undefined) {
      setEstadoLinkdin(
        <Pressable
          onPress={() => openSocialMediaLink(usuario?.linkedin_usu)}
          style={styles.socialMediaIcon}
        >
          <Image
            source={require("../../assets/img/linkedin.png")}
            style={{ width: 50, height: 50, marginRight: 8 }}
          />
        </Pressable>
      );
    } else {
      setEstadoLinkdin("");
    }
  }

  function VerificaInsta() {
    if (usuario?.instagram_usu != "" || usuario?.instagram_usu != undefined) {
      setEstadoInsta(
        <Pressable
          onPress={() => openSocialMediaLink(usuario?.instagram_usu)}
          style={styles.socialMediaIcon}
        >
          <Image
            source={require("../../assets/img/instagram.png")}
            style={{ width: 50, height: 50, marginRight: 8 }}
          />
        </Pressable>
      );
    } else {
      setEstadoInsta("");
    }
  }

  function abrirModalAvaliacao() {
    setModalVisible(true);
  }

  function fecharModalAvaliacao() {
    setModalVisible(false);
  }

  useEffect(() => {
    VerificaServico();
    VerificaLinkdin();
    VerificaInsta();
    loadAvaliacoes();
  }, [usuario.uid]);

  const loadAvaliacoes = async () => {
    try {
      const avaliacoesRef = collection(db, "avaliacao");
      const q = query(
        avaliacoesRef,
        where("uid_usuario_avaliado", "==", usuario.uid)
      );
      const querySnapshot = await getDocs(q);

      let totalRating = 0;
      let count = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        totalRating += data.rating;
        count += 1;
      });

      if (count > 0) {
        const averageRating = totalRating / count;
        setMediaAvaliacoes(averageRating);
      } else {
        setMediaAvaliacoes(0);
      }

      // Set the ratings for displaying in the modal
      setAvaliacoes(querySnapshot.docs.map((doc) => doc.data().rating));
    } catch (error) {
      console.error("Error loading ratings: ", error);
    }
  };

  function showRating(rating) {
    loadAvaliacoes({rating});
    console.log("Rating: ", rating);
    setRating(rating);
  }
  const handleRatingSubmit = async () => {
    const currentUser = auth.currentUser;
    const usuarioAvaliado = usuario?.uid;
  
    if (usuarioAvaliado) {
  
      // Call addDoc and add the document
      addDoc(collection(db, "avaliacao"), {
        rating: rating,
        uid_usuario_avaliado: usuarioAvaliado,
        uid_usuario_avaliador: currentUser.uid,
      })
        .then(() => {
          console.log("Avaliação adicionada com sucesso!");
          // Limpar o estado de rating após a avaliação ser salva
          setRating(0);
          // Fechar o modal após a avaliação ser salva
          setModalVisible(false);
        })
        .catch((error) => {
          console.error("Erro ao adicionar a avaliação: ", error);
        });
      } else {
        console.error("usuarioAvaliado is undefined or invalid.");
      }
    };

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
                marginTop: 5,
                marginBottom: 5,
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
              
              @{usuario.nome_usu}
            </Text>
            <Text style={styles.tipoconta}>{usuario?.tipo_conta}</Text>
          </View>
          <View style={styles.conteudo}>
            <View style={styles.containerInner}>
              <Button
                onPress={() => abrirModalAvaliacao()}
                style={styles.botaoAvaliar}
              >
                Avaliar Prestador
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
              <Text style={styles.titulo2}>Serviços oferecidos:</Text>
              {estadoServico}
              <Text style={styles.titulo2}>Entrar em Contato:</Text>
              <View style={styles.socialMediaContainer}>
                <Pressable onPress={openWhatsAppChat}>
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
                </Pressable>
                {estadoLinkdin}
                {estadoInsta}
              </View>
              <Button
                onPress={() => navigation.goBack()}
                style={{ ...styles.botao, marginTop: 30 }}
              >
                VOLTAR PARA A TELA ANTERIOR
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal de avaliação */}
      <Modal visible={modalVisible} animationType="slide" onDismiss={() => fecharModalAvaliacao()}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Avaliar: {usuario.nome_usu}</Text>
          <Text style={styles.modalText}>Avaliação: {rating}</Text>
          
          <Rating
            onStartRating={rating}
            onSwipeRating={0}
            onFinishRating={(rating) => showRating(rating)}
            style={{ paddingVertical: 10 }}
            type="star"
            ratingCount={5}
            imageSize={40}
          />
          <Text style={styles.modalText}>Média: {mediaAvaliacoes.toFixed(1)}</Text>
          <Button
            style={{ ...styles.botao, marginTop: 10, marginBottom: 0 }}
            onPress={() => handleRatingSubmit()}
          >
            <Text style={{ color: "white" }}>Salvar Avaliação</Text>
          </Button>
        </View>
      </Modal>
    </View>
  );
}