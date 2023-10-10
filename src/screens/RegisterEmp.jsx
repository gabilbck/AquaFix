import React, { useState } from "react";
import { View, TextInput, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import { styles } from "../utils/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../config/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { cnpj } from "cpf-cnpj-validator";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Image } from "expo-image";

export default function RegisterEmp({ navigation }) {
  const [nomeUsu, setNomeUsu] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [cnpjUsu, setCnpjUsu] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [whatsappUsu, setWhatsappUsu] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [erroCnpj, setErroCnpj] = useState("");
  const [servicosUsu, setServicosUsu] = useState("");
  const [getImage, setImage] = useState(null);
  const [erroSenha, setErroSenha] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroUser, setErroUser] = useState("");

  // const storage = getStorage(); // Initialize Firebase Storage

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImageToFirebase = async () => {
    try {
      const response = await fetch(getImage);
      const blob = await response.blob();

      const storageRef = ref(storage, "foto_usu/" + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, blob);

      
      // uploadTask.on("state_changed", (snapshot) => {
      //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //   console.log(`Upload is ${progress}% done`);
      // });

      await uploadTask;

      const imageURL = await getDownloadURL(storageRef);
      setImageToFirebase(imageURL);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const setImageToFirebase = async (url) => {
    try {
      // Check if email is already registered
      const emailQuery = query(collection(db, "usuario"), where("email_usu", "==", email));
      const emailQuerySnapshot = await getDocs(emailQuery);

      if (!emailQuerySnapshot.empty) {
        console.error("E-mail já cadastrado");
        setErroEmail("E-mail já cadastrado");
        return;
      }

      // Check if username is already registered
      const usernameQuery = query(collection(db, "usuario"), where("nome_usu", "==", nomeUsu));
      const usernameQuerySnapshot = await getDocs(usernameQuery);

      if (!usernameQuerySnapshot.empty) {
        console.error("Nome de usuário já cadastrado");
        setErroUser("Nome de usuário já cadastrado");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      console.log("Usuário criado com sucesso!", userCredential);

      const uid = userCredential.user.uid;

      await setDoc(doc(db, "usuario", uid), {
        adm: false,
        bio_usu: "Olá, eu sou " + nomeUsu,
        cep_usu: zipCode,
        cnpj: cnpjUsu,
        email_usu: email,
        nome_completo: nomeCompleto,
        nome_usu: nomeUsu,
        senha_usu: senha,
        whatsapp_usu: whatsappUsu,
        servicos_usu: servicosUsu,
        tipo_conta: "empresa",
        foto_usu: getImage,
      });

      // Upload the image to Firestore here
      await uploadImageToFirebase();

      console.log("Cadastrado!");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Erro ao criar usuário", error);
      // Handle error codes
    }
  }

  function retornaLogradouro() {
    const url = `https://viacep.com.br/ws/${zipCode}/json/`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.logradouro);
        return data.logradouro;
      });
  }

  function numeroCelular(value) {
    // Apply the desired phone number mask here
    const formattedValue = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d{2})(\d)/, "($1) $2") // Add parentheses to the area code
      .replace(/(\d{5})(\d)/, "$1-$2") // Add hyphen to the main number
      .slice(0, 15); // Limit the length of the input
    return formattedValue;
  }

  function cep(value) {
    // Apply the desired phone number mask here
    const formattedValueCep = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d{5})(\d)/, "$1-$2") // Add hyphen to the main number
      .slice(0, 15); // Limit the length of the input
    return formattedValueCep;
  }

  function validar(texto) {
    if (texto.length > 14) return;

    setCnpjUsu(texto);
    if (texto.length === 14) {
      if (!cnpj.isValid(texto)) {
        setErroCnpj("CNPJ inválido");
        setIsValid(false);
        return;
      } else {
        setCnpjUsu(cnpj.format(texto));
        setIsValid(true);
        setErroCnpj("CNPJ válido");
      }
    }

    console.log(texto);
  }

  const Registrar = () => {
    if (senha !== confirmSenha) {
      setErroSenha("As senhas não correspondem");
      return;
    }
    if (senha.length < 6) {
      setErroSenha("A senha deve ter no mínimo 6 caracteres");
      return;
    }
    if (senha.length > 20) {
      setErroSenha("A senha deve ter no máximo 20 caracteres");
      return;
    }
    if (nomeUsu.length < 2) {
      setErroUser("O nome de usuário deve ter no mínimo 2 caracteres");
      return;
    }
    if (nomeUsu.length > 20) {
      setErroUser("O nome de usuário deve ter no máximo 20 caracteres");
      return;
    }
    if (nomeCompleto.length < 2) {
      setErroUser("O nome completo deve ter no mínimo 2 caracteres");
      return;
    }
    if (nomeCompleto.length > 50) {
      setErroUser("O nome completo deve ter no máximo 50 caracteres");
      return;
    }

    setImageToFirebase(); // Upload the image before registering the user
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Parte que aparece a imagem: azul e logo */}
        <View style={styles.imagemTopo}>
          <Image
            source={require("../../assets/img/logocomp-branca.png")}
            style={{ width: 200, height: 127 }}
          />
        </View>
        <View style={styles.conteudo}>
          {/* Parte que aparece o conteúdo: cinza/branco */}
          <View style={styles.containerInner}>
            <Text style={styles.titulo}>CADASTRE-SE</Text>
            <Text style={styles.subtitulo}>
              Preencha as seguintes informações:
            </Text>
            <TextInput
              placeholder="Nome da Empresa"
              value={nomeCompleto}
              onChangeText={setNomeCompleto}
              style={styles.input}
            />
            <TextInput
              placeholder="Nome de usuário da empresa"
              value={nomeUsu}
              onChangeText={setNomeUsu}
              style={styles.input}
            />
            <Text>{erroUser}</Text>
            <TextInput
              placeholder="E-mail da empresa"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <Text>{erroEmail}</Text>
            <TextInput
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              style={styles.input}
              secureTextEntry={true}
            />
            <TextInput
              placeholder="Confirmar senha"
              value={confirmSenha}
              onChangeText={setConfirmSenha}
              style={styles.input}
              secureTextEntry={true}
            />
            <Text>{erroSenha}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Digite seu CNPJ`}
              value={cnpjUsu}
              onChangeText={validar}
              error={!isValid}
            />
            <Text>{erroCnpj}</Text>
            <TextInput
              placeholder="CEP"
              value={zipCode}
              onChangeText={(value) => setZipCode(cep(value))}
              style={styles.input}
              onBlur={retornaLogradouro}
            />
            <TextInput
              placeholder="Número de WhatsApp da empresa"
              value={whatsappUsu}
              onChangeText={(value) => setWhatsappUsu(numeroCelular(value))}
              style={styles.input}
            />
            <TextInput
              placeholder="Serviços oferecidos (separe por vírugla)"
              value={servicosUsu}
              onChangeText={setServicosUsu}
              style={styles.input}
            />
            {getImage ? (
              <Image
                source={{ uri: getImage }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100, // Use borderRadius to make it circular
                  alignSelf: "center",
                  marginTop: 10,
                  marginBottom: 10,
                  borderColor: "#16337E", // Use borderColor instead of border
                  borderWidth: 4, // Use borderWidth instead of border
                }}
              />
            ) : (
              <Button
                onPress={pickImage} // Call pickImage when this button is pressed
                style={styles.botao2}
                textColor="white"
              >
                Escolher foto
              </Button>
            )}
            <Button onPress={Registrar} style={styles.botao} textColor="white">
              CADASTRAR
            </Button>
            <View style={styles.linha}>
              <View style={styles.coluna}>
                <Text>Escolheu a opção errada?</Text>
                <Button
                  textColor={"black"}
                  onPress={() => navigation.navigate("CadPasso2")}
                >
                  <Text style={styles.botaoPreto}>
                    Voltar ao passo anterior
                  </Text>
                </Button>
              </View>
              <View style={styles.coluna}>
                <Text>Já tem uma conta?</Text>
                <Button
                  textColor={"black"}
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  <Text style={styles.botaoPreto}>Entrar agora!</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
