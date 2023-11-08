import { Button } from "react-native-paper";
import { Text, View, TextInput, ScrollView } from "react-native";
import { Image } from "expo-image";
import { styles } from "../utils/styles";
import { useState } from "react";
import { auth, db, storage } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

export default function RegisterAuto({ navigation }) {
  const [adisobre, setAdicionarSobre] = useState("");
  const [nomeUsu, setNomeUsu] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [isValid, setValid] = useState(null);
  const [bio, setBio] = useState("");
  const [whatsappUsu, setWhatsappUsu] = useState("");
  const [getImage, setImage] = useState(null);
  const [ErrImage, setErrImage] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [nomeUsuError, setNomeUsuError] = useState("");
  const [nomeCompletoError, setNomeCompletoError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [whatsappUsuError, setWhatsappUsuError] = useState("");
  const [FacebookUsu, setFacebookUsu] = useState("");
  const [instagramUsu, setinstagramUsu] = useState("");
  const [linkedinUsu, setlinkedinUsu] = useState("");
  const [adisobreError, setAdicionarSobreError] = useState("");
  const [servicosUsu, setServicosUsu] = useState("");
  const [servicosUsu1, setServicosUsu1] = useState("");
  const [servicosUsu2, setServicosUsu2] = useState("");
  const [erroServico, setErroServico] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const resizedImage = await resizeImage(result.uri);
      setImage(resizedImage.uri);
    }
  };
  
  const resizeImage = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }], // Redimensiona a largura da imagem para 800 pixels (ou outro valor desejado)
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    return manipResult;
  };

  const uploadImageToFirebase = async () => {
    try {
      const response = await fetch(getImage);
      const blob = await response.blob();

      const storageRef = ref(storage, "foto_usu/" + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, blob);
  
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
      const emailQuery = query(
        collection(db, "usuario"),
        where("email_usu", "==", email)
      );
      const emailQuerySnapshot = await getDocs(emailQuery);

      if (!emailQuerySnapshot.empty) {
        console.error("E-mail já cadastrado");
        setErroEmail("E-mail já cadastrado");
        return;
      }

      // Check if username is already registered
      const usernameQuery = query(
        collection(db, "usuario"),
        where("nome_usu", "==", nomeUsu)
      );
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
        bio_usu: adisobre,
        cep_usu: zipCode,
        cpf_usu: cpf,
        email_usu: email,
        nome_completo: nomeCompleto,
        nome_usu: nomeUsu,
        senha_usu: senha,
        tipo_conta: "Autônomo",
        whatsapp_usu: whatsappUsu,
        facebook_usu: FacebookUsu,
        instagram_usu: instagramUsu,
        linkedin_usu: linkedinUsu,
        foto_usu: getImage,
        servicos_usu: servicosUsu,
        servicos_usu1: servicosUsu1,
        servicos_usu2: servicosUsu2,
      });
      await uploadImageToFirebase();

      console.log("Cadastrado!");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Erro ao criar usuário", error);
      // Handle error codes
    }
  };

  function retornaLogradouro() {
    const url = `https://viacep.com.br/ws/${zipCode}/json/`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.logradouro);
        return data.logradouro; // Atualiza o estado com o logradouro
      });
  }

  function formatPhoneNumber(value) {
    // Apply the desired phone number mask here
    const formattedValue = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d{2})(\d)/, "($1) $2") // Add parentheses to the area code
      .replace(/(\d{5})(\d)/, "$1-$2") // Add hyphen to the main number
      .slice(0, 15); // Limit the length of the input
    return formattedValue;
  }

  function formatPhoneNumberCep(value) {
    // Apply the desired phone number mask here
    const formattedValueCep = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d{5})(\d)/, "$1-$2") // Add hyphen to the main number
      .slice(0, 15); // Limit the length of the input
    return formattedValueCep;
  }

  function formatPhoneNumberCpf(value) {
    // Apply the desired phone number mask here
    const formattedValueCep = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d{3})(\d)/, "$1.$2") // Add hyphen to the main number
      .replace(/(\d{3})(\d)/, "$1.$2") // Add hyphen to the main number
      .replace(/(\d{3})(\d)/, "$1-$2") // Add hyphen to the main number
      .slice(0, 15); // Limit the length of the input
    return formattedValueCep;
  }

  const Registrar = () => {
    const checkServicosPreenchidos = () => {
      const servicosList = [servicosUsu, servicosUsu1, servicosUsu2];

      if (servicosList.every((servico) => servico === "")) {
        setErroServico("Preencha pelo menos um serviço");
      } else {
        setErroServico("");
      }
    };
    if (checkServicosPreenchidos()) return;
    if (email === "") {
      setErroEmail("Preencha o campo e-mail");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErroEmail("E-mail inválido");
      return;
    }
    if (email.includes(" ")) {
      setErroEmail("E-mail inválido");
      return;
    }
    if (senha !== confirmSenha) {
      setErroSenha("As senhas não correspondem");
      return;
    }

    if (senha == "") {
      setErroSenha("Preencha o campo senha");
      return;
    }

    if (nomeCompleto == "") {
      setNomeCompletoError("Preencha o campo nome completo");
      return;
    }

    if (nomeUsu == "") {
      setNomeUsuError("Preencha o campo nome de usuário");
      return;
    }

    if (zipCode == "") {
      setZipCodeError("Preencha o campo CEP");
      return;
    }

    if (cpf == "") {
      setCpfError("Preencha o campo CPF");
      return;
    }

    if (getImage == null) {
      setErrImage("Escolha uma imagem");
      return;
    }

    if (adisobre == "") {
      setAdicionarSobreError("Preencha o campo sobre");
      return;
    }

    if (whatsappUsu == "") {
      setWhatsappUsuError("Preencha o campo telefone");
      return;
    }

    setImageToFirebase();
  };

  return (
    // <KeyboardAvoidingView style={styles.container} behavior="padding">
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
            <Text style={styles.titulo_register}>CADASTRE-SE</Text>
            <Text style={styles.subtitulo_register}>
              Para iniciar seu cadastro, preencha asseguintes informações:
            </Text>
            <TextInput
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <Text style={styles.textErr}>{erroEmail}</Text>
            <TextInput
              placeholder="Senha"
              secureTextEntry={true}
              value={senha}
              onChangeText={setSenha}
              style={styles.input}
            />
            <Text style={styles.fakespaceErr}></Text>
            <TextInput
              placeholder="Confirmar senha"
              value={confirmSenha}
              onChangeText={setConfirmSenha}
              style={styles.input}
              secureTextEntry={true}
            />
            <Text style={styles.textErr}>{erroSenha}</Text>
            <TextInput
              placeholder="Nome Completo"
              value={nomeCompleto}
              onChangeText={setNomeCompleto}
              style={styles.input}
            />
            <Text style={styles.textErr}>{nomeCompletoError}</Text>
            <TextInput
              placeholder="Nome de Usuário"
              value={nomeUsu}
              onChangeText={setNomeUsu}
              style={styles.input}
            />
            <Text style={styles.textErr}>{nomeUsuError}</Text>
            <TextInput
              placeholder="Digite seu CEP"
              value={zipCode}
              onChangeText={(e) => setZipCode(formatPhoneNumberCep(e))}
              maxLength={9}
              style={styles.input}
              onBlur={retornaLogradouro}
            />
            <Text style={styles.textErr}>{zipCodeError}</Text>
            {/* Mostra o logradouro abaixo do TextInput do CEP */}
            {logradouro ? <Text>{logradouro}</Text> : null}
            <Text>{retornaLogradouro}</Text>
            <TextInput
              placeholder="Digite seu CPF"
              value={cpf}
              onChangeText={(e) => setCpf(formatPhoneNumberCpf(e))}
              maxLength={14}
              style={styles.input}
            />
            <Text style={styles.textErr}>{cpfError}</Text>
            <TextInput
              placeholder="Serviço 1"
              value={servicosUsu}
              onChangeText={setServicosUsu}
              style={styles.input}
            />
            <TextInput
              placeholder="Serviço 2"
              value={servicosUsu1}
              onChangeText={setServicosUsu1}
              style={styles.input}
            />
            <TextInput
              placeholder="Serviço 3"
              value={servicosUsu2}
              onChangeText={setServicosUsu2}
              style={styles.input}
            />

            {getImage ? (
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
            ) : (
              <Button
                onPress={pickImage}
                style={styles.botao}
                textColor="white"
              >
                Escolher foto
              </Button>
            )}
            <Text style={styles.textErr}>{ErrImage}</Text>
            <TextInput
              placeholder="Adicionar Sobre"
              value={adisobre}
              onChangeText={setAdicionarSobre}
              style={styles.input}
            />
            <Text style={styles.textErr}>{adisobreError}</Text>
            <TextInput
              placeholder="Telefone"
              value={whatsappUsu}
              onChangeText={(value) => setWhatsappUsu(formatPhoneNumber(value))}
              maxLength={15}
              style={styles.input}
            />
            <Text style={styles.textErr}>{whatsappUsuError}</Text>
            <TextInput
              placeholder="Facebook (opcional)"
              value={FacebookUsu}
              onChangeText={setFacebookUsu}
              style={styles.input}
            />
            <Text style={styles.textErr}></Text>
            <TextInput
              placeholder="Instagram (opcional)"
              value={instagramUsu}
              onChangeText={setinstagramUsu}
              style={styles.input}
            />
            <Text style={styles.textErr}></Text>
            <TextInput
              placeholder="Linkedin (opcional)"
              value={linkedinUsu}
              onChangeText={setlinkedinUsu}
              style={styles.input}
            />
            <Button
              textColor={"white"}
              onPress={Registrar}
              style={styles.botao}
            >
              REGISTRAR
            </Button>
          </View>
          <View style={styles.linha}>
            <View style={styles.coluna}>
              <Text>Escolheu a opção errada?</Text>
              <Button
                textColor={"black"}
                onPress={() => navigation.navigate("CadPasso2")}
              >
                <Text style={styles.botaoPreto}>Voltar ao passo anterior</Text>
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
      </ScrollView>
    </View>
    // </KeyboardAvoidingView>
  );
}
