import { View } from "react-native";
import { styles } from "../utils/styles";
import { Image } from "expo-image";
import { Text, TextInput } from "react-native-paper";
import InputCCValidator from "../components/InputCCValidator";

export default function RegisterPes({ navigation }) {
  const [nomeUsu, setNomeUsu] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [whatsappUsu, setWhatsappUsu] = useState("");

  function handleRegister() {
    if (senha !== confirmSenha) {
      console.log("A senha e a confirmação de senha não correspondem");
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
          cpf_usu: cpfUsu,
          email_usu: email,
          foto_usu: "",
          nome_real_usu: nomeCompleto,
          nome_usu: nomeUsu,
          senha_usu: senha,
          whatsapp_usu: whatsappUsu,
          adm: "0",
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
-
  function formatPhoneNumber(value) {
    // Apply the desired phone number mask here
    const formattedValue = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d{2})(\d)/, "($1) $2") // Add parentheses to the area code
      .replace(/(\d{5})(\d)/, "$1-$2") // Add hyphen to the main number
      .slice(0, 15); // Limit the length of the input
    return formattedValue;
  }

  function formatCep(value) {
    // Apply the desired phone number mask here
    const formattedValueCep = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d{5})(\d)/, "$1-$2") // Add hyphen to the main number
      .slice(0, 15); // Limit the length of the input
    return formattedValueCep;
  }

  return (
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
          {/* CONTEÚDO */}
          <Text style={styles.titulo}>CADASTRE-SE</Text>
          <Text style={styles.subtitulo}>Pessoa</Text>
          <View>
            <Text style={styles.texto}>
              Para se cadastrar como pessoa, você precisa ter mais de 18 anos e
              possuir um CPF válido.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nome de usuário"
              value={nomeUsu}
              onChangeText={(text) => setNomeUsu(text)}
            />
            <InputCCValidator tipo="cpf" />
          </View>
        </View>
      </View>
    </View>
  );
}
