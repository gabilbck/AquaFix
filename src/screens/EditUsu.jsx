import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../utils/styles";
import { auth, db, storage } from "../config/firebase";
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "react-native-paper";

export default function EditProfile({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [getImage, setImage] = useState(null);

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      // Fetch user profile data and populate the state
      const fetchUserProfile = async () => {
        try {
          const userDocRef = doc(db, "usuario", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setName(userData.nome_usu);
            setEmail(userData.email_usu);
            setBio(userData.bio_usu);
            setWhatsapp(userData.whatsapp_usu);
          }
        } catch (error) {
          console.error("Error fetching user profile data: ", error);
        }
      };

      fetchUserProfile();
    }
  }, [user]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
      Alert.alert("Error", "Unable to pick an image. Please try again.");
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
      Alert.alert("Error", "Unable to upload the image. Please try again.");
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
      Alert.alert("Error", "Unable to save the image URL in Firestore.");
    }
  };

  function handleUpdateProfile() {
    // Update the user's profile data in Firestore with the new values
    const userDocRef = doc(db, "usuario", user.uid);
    const userDataToUpdate = {
      nome_usu: name,
      email_usu: email,
      bio_usu: bio,
      whatsapp_usu: whatsapp,
    };

    // Check if the password field is not empty and update the password
    if (password !== "") {
      userDataToUpdate.senha_usu = password;
    }

    updateDoc(userDocRef, userDataToUpdate)
      .then(() => {
        console.log("Profile updated successfully.");
        navigation.goBack(); // Navigate back to the previous screen
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
        Alert.alert(
          "Error",
          "Unable to update your profile. Please try again."
        );
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.imagemTopo}> 
        {getImage ? (
          <>
            <Image
              source={{ uri: getImage }}
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                alignSelf: "center",
                marginTop: 10,
                marginBottom: 10,
                border: "4px #16337E solid",
              }}
            />
          </>
        ) : (
          <Button onPress={pickImage} style={styles.botao} textColor="white">
            Escolher foto
          </Button>
        )}

        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "white",
            marginTop: 5,
          }}
        >
          {name}
        </Text>
      </View>
      <View style={styles.conteudo}>
        <View style={styles.containerInner}>
          <Text style={styles.titulo_register}>EDITAR INFORMAÇÕES</Text>
          <Text style={styles.subtitulo_register}>
            Edite e atualize as informações que desejar:
          </Text>
          {/* Name Input */}
          <TextInput
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          {/* Email Input */}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          {/* Bio Input */}
          <TextInput
            placeholder="Bio"
            value={bio}
            onChangeText={setBio}
            style={styles.input}
          />

          {/* Password Input */}
          <TextInput
            placeholder="Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          {/* WhatsApp Input */}
          <TextInput
            placeholder="WhatsApp"
            value={whatsapp}
            onChangeText={setWhatsapp}
            style={styles.input}
          />

          {/* Update Button */}
          <Button
            style={styles.botaoedit}
            labelStyle={{ color: "white", fontSize: 15 }}
            onPress={() => {
              handleUpdateProfile();
              uploadImageToFirebase();
            }}
          >
            SALVAR
          </Button>
        </View>
      </View>
    </View>
  );
}

/* 
<View style={styles.container}>
      {/* Parte que aparece a imagem: azul e logo }
      <View style={styles.imagemTopo}>
        <Image
          source={require("../../assets/img/logocomp-branca.png")}
          style={{ width: 200, height: 127 }}
        />
      </View>
      {/* Parte que aparece o conteúdo: cinza/branco }
      <View style={styles.conteudo}>
        <View style={styles.containerInner}>
          {/* CONTEÚDO }
        </View>
      </View>
    </View>
*/
