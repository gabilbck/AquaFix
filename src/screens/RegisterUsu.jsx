import { Button, RadioButton } from "react-native-paper";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { styles } from "../utils/styles";
import { useState } from "react";
import { auth, db, storage } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

export default function RegisterUsu({ navigation }) {
  const [adisobre, setAdicionarSobre] = useState("");
  const [nomeUsu, setNomeUsu] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [isValid, setValid] = useState(null);
  const [bio, setBio] = useState("");
  const [whatsappUsu, setWhatsappUsu] = useState("");
  const [getImage, setImage] = useState(null);
  
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImageToFirebase = async () => {
      try {
          const response = await fetch(getImage);
          const blob = await response.blob();

          const storageRef = ref(storage, 'foto_usu/' + Date.now())
          ;
          const uploadTask = uploadBytes(storageRef, blob);

          await uploadTask;

          const imageURL = await getDownloadURL(storageRef);
          setImageToFirebase(imageURL);
      } catch (error) {
          console.error('Error uploading image: ', error);
      }
  };

  const setImageToFirebase = async (url) => {
      try {
          const ref = collection(db, 'foto_usu');
          await addDoc(ref, { url });

          console.log('URL da imagem enviada a Firestore');
          setImage(null);
      } catch (error) {
          console.error('Erro ao enviar a Firestore: ', error);
          setImage(null);
      }
  };

  function handleRegister() {
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        console.log("Usuário criado com sucesso!", userCredential);
        const uid = userCredential.user.uid;

        setDoc(doc(db, "usuario", uid), {
          adm: false,
          bio_usu: "Olá, eu sou " + adisobre,
          tipo_conta: "",
          profissao_usu: "",
          cep_usu: zipCode,
          cpf_usu: cpf,
          email_usu: email,
          nome_real_usu: nomeCompleto,
          nome_usu: nomeUsu,
          senha_usu: senha,
          tipo_conta: "Cliente",
          whatsapp_usu: whatsappUsu,
          foto_usu: getImage,
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

  function Registrar(){
    handleRegister();
    uploadImageToFirebase();
  }

  

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
            <TextInput
              placeholder="Senha"
              secureTextEntry={true}
              value={senha}
              onChangeText={setSenha}
              style={styles.input}
            />
            <TextInput
              placeholder="Nome Completo"
              value={nomeCompleto}
              onChangeText={setNomeCompleto}
              style={styles.input}
            />
            <TextInput
              placeholder="Nome de Usuário"
              value={nomeUsu}
              onChangeText={setNomeUsu}
              style={styles.input}
            />
            <TextInput
              placeholder="Digite seu CEP"
              value={zipCode}
              onChangeText={(e) => setZipCode(formatPhoneNumberCep(e))}
              maxLength={9}
              style={styles.input}
              onBlur={retornaLogradouro}
            />
            <TextInput
              placeholder="Digite seu CPF"
              value={cpf}
              onChangeText={(e) => setCpf(formatPhoneNumberCpf(e))}
              maxLength={14}
              style={styles.input}
            />
            {getImage ? <> 
              <Image source={{ uri: getImage }} style={{ width: 200, height: 200, borderRadius: "50%", alignSelf: "center", marginTop: 10, marginBottom: 10, border: "4px #16337E solid"}} />
              </>
              :
              <Button onPress={pickImage} style={styles.botao} textColor="white">
                Escolher foto
              </Button>
            }

            <TextInput
              placeholder="Adicionar Sobre"
              value={adisobre}
              onChangeText={setAdicionarSobre}
              style={styles.input}
            />
            <TextInput
              placeholder="Telefone"
              value={whatsappUsu}
              onChangeText={(value) => setWhatsappUsu(formatPhoneNumber(value))}
              maxLength={15}
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
        </View>
      </ScrollView>
    </View>
    // </KeyboardAvoidingView>
  );

  
}