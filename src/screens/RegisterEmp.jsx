import { View, TextInput } from "react-native";
import { Image } from "expo-image";
import { Button, Text } from "react-native-paper";
import { styles } from "../utils/styles";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import InputCCValidator from "../components/InputCPFValidator";
import { useState } from "react";
// import InputCNPJValidator from "../components/InputCNPJValidator";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { cnpj } from "cpf-cnpj-validator";
import { ScrollView } from "react-native-web";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

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
  const [imageSelected, setImageSelected] = useState(false);
  const [erroImage, setErroImage] = useState("");

  function handleRegister() {
    if (senha !== confirmSenha) {
      setErroSenha("As senhas não correspondem");
      return;
    }

    if (!imageSelected) {
    // Se a imagem não foi selecionada, exiba uma mensagem de erro ou tome a ação apropriada.
    // Por exemplo, você pode definir um estado de erro para exibir uma mensagem de erro na interface do usuário.
    // Ou você pode impedir o envio do formulário até que a imagem seja selecionada.
    setErroImage("Selecione uma imagem antes de cadastrar.");
    return;
  }

    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        console.log("Usuário criado com sucesso!", userCredential);
        const uid = userCredential.user.uid;

        setDoc(doc(db, "usuario", uid), {
          adm: false,
          bio_usu: "Olá, eu sou " + nomeUsu,
          cep_usu: zipCode,
          cnpj: cnpjUsu,
          email_usu: email,
          nome_completo: nomeCompleto,
          nome_usu: nomeUsu,
          senha_usu: senha,
          whatsapp_usu: whatsappUsu,
          servisos_usu: servicosUsu,
          tipo_conta: "empresa",
        }).then(() => {
          console.log("Cadastrado!");
          navigation.navigate("LoginScreen");
        });
      })
      .catch((error) => {
        console.log("Erro ao criar usuário", error);
        // Handle error codes
      });
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageSelected(true); // Defina como true quando uma imagem for selecionada
    }
  };

  const uploadImageToFirebase = async () => {
    try {
      const response = await fetch(getImage);
      const blob = await response.blob();

      const storageRef = ref(storage, "foto_usu/" + Date.now());
      const uploadTask = uploadBytes(storageRef, blob);

      await uploadTask;

      const imageURL = await getDownloadURL(storageRef);
      setImageToFirebase(imageURL);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const setImageToFirebase = async (url) => {
    try {
      const ref = collection(db, "foto_usu");
      await addDoc(ref, { url });

      console.log("URL da imagem enviada a Firestore");
      setImage(null);
    } catch (error) {
      console.error("Erro ao enviar a Firestore: ", error);
      setImage(null);
    }
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
        {/* Parte que aparece o conteúdo: cinza/branco */}

        <View style={styles.conteudo}>
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
            <TextInput
              placeholder="E-mail da empresa"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
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
              <>
                <Image
                  source={{ uri: getImage }}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    alignSelf: "center",
                    marginTop: 10,
                    marginBottom: 10,
                    border: "4px #16337E solid",
                  }}
                />
              </>
            ) : (
              <Button
                onPress={pickImage}
                style={styles.botao2}
                textColor="white"
              >
                Escolher foto
              </Button>
            )}
            <Text>{erroImage}</Text>

            <Button
              onPress={handleRegister}
              style={styles.botao}
              textColor="white"
            >
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
