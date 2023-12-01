import React, { useEffect, useState } from "react";
import { Image, View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import { styles } from "../utils/styles";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";

export default function PerfilScreen() {
  const [usuario, setUsuario] = useState({});
  const navigation = useNavigation();
  const [estadoServico, setEstadoServico] = useState("");
  const [estadoLinkdin, setEstadoLinkdin] = useState("");
  const [estadoInsta, setEstadoInsta] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuário UID: ", user.uid);
        setUsuario({ uid: user.uid });
      } else {
        console.log("Usuário não logado");
      }
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (!usuario.uid) return;

    const usuarioRef = doc(db, "usuario", usuario.uid);

    console.log("Buscando usuário com UID: ", usuario.uid);

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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Erro ao sair da conta:", error);
    }
  };

  const openWhatsAppChat = () => {
    if (usuario.whatsapp_usu) {
      const whatsappNumber = usuario.whatsapp_usu;
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}`;
      Linking.openURL(whatsappUrl)
        .then((data) => {
          console.log("WhatsApp foi aberto");
        })
        .catch((error) => {
          console.error("Error opening WhatsApp chat", error);
        });
    } else {
      console.warn("User has not registered a WhatsApp number");
    }
  };

  const openSocialMediaLink = (url) => {
    if (url) {
      Linking.openURL(url)
        .then((data) => {
          console.log("Redirecionado para a rede social");
        })
        .catch((error) => {
          console.error("Erro ao abrir o link da rede social", error);
        });
    } else {
      console.warn("O usuário não cadastrou um link para a rede social");
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
    if ((usuario?.instagram_usu != "") || (usuario?.instagram_usu != undefined)) {
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
    VerificaServico() && VerificaLinkdin() && VerificaInsta();
  }, [usuario.uid]);
  // const checkServicosPreenchidos = () => {
  //   const servicosList = [
  //     usuario?.servicosUsu,
  //     usuario?.servicosUsu1,
  //     usuario?.servicosUsu2,
  //   ];
  //   if (servicosList.every((servico) => servico === "")) {
  //     setEstadoServico(
  //       <Text style={styles.subtitulo2}>
  //         Este usuário não possui serviços cadastrados
  //       </Text>
  //     );
  //   } else {
  //     setEstadoServico(
  //       <Text style={styles.subtitulo2}>
  //         {usuario?.servicos_usu}
  //         {usuario?.servicos_usu1}
  //         {usuario?.servicos_usu2}
  //       </Text>
  //     );
  //   }
  // };
  // if (checkServicosPreenchidos()) return;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            @{usuario.nome_usu}
          </Text>
          <Text style={styles.tipoconta}>{usuario?.tipo_conta}</Text>
        </View>
        <View style={styles.conteudo}>
          <View style={styles.containerInner}>
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

            {/* <Text style={styles.subtitulo2}>
              {usuario?.servicos_usu}
              {usuario?.servicos_usu1}
              {usuario?.servicos_usu2}
            </Text> */}

            <Text style={styles.titulo2}>Redes sociais:</Text>
            <View style={styles.socialMediaContainer}>
              <TouchableOpacity onPress={openWhatsAppChat}>
                <Image
                  source={require("../../assets/img/whatsapp.png")}
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: 8,
                  }}
                />
              </TouchableOpacity>
              {estadoLinkdin}
              {estadoInsta}
            </View>
            <Text style={styles.titulo2}>
              Você deseja editar o seu perfil?{" "}
            </Text>
            <Button
              style={styles.botaoedit}
              labelStyle={{ color: "white", fontSize: 15 }}
              onPress={() => navigation.navigate("EditUsu")}
            >
              EDITAR PERFIL
            </Button>
            <Text style={styles.titulo2}>Você deseja sair da conta? </Text>
            <Button
              style={styles.botaovermelho}
              labelStyle={{ color: "white", fontSize: 15 }}
              onPress={handleSignOut}
            >
              SAIR DA CONTA
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
