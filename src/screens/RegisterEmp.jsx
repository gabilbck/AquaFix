// import { View } from "react-native";
// import { Image } from "expo-image";
// import { Button, Text, TextInput } from "react-native-paper";
// import { styles } from "../utils/styles";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// export default function CadPasso1({ navigation }) {

//     function handleRegister() {
//         const [nomeUsu, setNomeUsu] = useState("");
//         const [nomeCompleto, setNomeCompleto] = useState("");
//         const [email, setEmail] = useState("");
//         const [zipCode, setZipCode] = useState("");
//         const [senha, setSenha] = useState("");
//         const [confirmSenha, setConfirmSenha] = useState("");
//         const [cpf, setCpf] = useState("");
//         const [isValid, setValid] = useState(null);
//         const [bio, setBio] = useState("");
//         const [photo, setPhoto] = useState("");
//         const [whatsappUsu, setWhatsappUsu] = useState("");

//   function handleRegister() {
//     if (senha !== confirmSenha) {
//       console.log("A senha e a confirmação de senha não correspondem");
//       return;
//     }

//     createUserWithEmailAndPassword(auth, email, senha)
//     .then((userCredential) => {
//         console.log("Usuário criado com sucesso!", userCredential);
//         const uid = userCredential.user.uid;

//         setDoc(doc(db, "usuario", uid), {
//           adm: false,
//           bio_usu: "Olá, eu sou " + nomeUsu,
//           cep_usu: zipCode,
//           cpf_usu: cpfUsu,
//           email_usu: email,
//           foto_usu: "",
//           nome_real_usu: nomeCompleto,
//           nome_usu: nomeUsu,
//           senha_usu: senha,
//           whatsapp_usu: whatsappUsu,
//         }).then(() => {
//           console.log("Cadastrado!");
//           navigation.navigate("LoginScreen");
//         });
//       })
//       .catch((error) => {
//         console.log("Erro ao criar usuário", error);
//         // Handle error codes
//       });
//   }

//     function


//   return (
//     <View style={styles.container}>
//       {/* Parte que aparece a imagem: azul e logo */}
//       <View style={styles.imagemTopo}>
//         <Image
//           source={require("../../assets/img/logocomp-branca.png")}
//           style={{ width: 200, height: 127 }}
//         />
//       </View>
//       {/* Parte que aparece o conteúdo: cinza/branco */}
//       <View style={styles.conteudo}>
//         <View style={styles.containerInner}>
//           <Text style={styles.titulo}>CADASTRE-SE</Text>
//           <Text style={styles.subtitulo}>
//             Preencha as seguintes informações:
//             </Text>
//             <TextInput

//             />
//         </View>
//       </View>
//     </View>
//   );
// }
