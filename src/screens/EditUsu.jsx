import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Image, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../utils/styles";
import { auth, db, storage } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "react-native-paper";
import { ScrollView } from "react-native-web";

export default function EditProfile({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [imageUri, setImageUri] = useState(null); // Store the image URI

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
            setImageUri(userData.foto_usu); // Set the image URI
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
        setImageUri(result.uri); // Store the image URI
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  const uploadImageToFirebase = async () => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const storageRef = ref(storage, "foto_usu/" + user.uid); // Use the user's UID as the image path
      const uploadTask = uploadBytes(storageRef, blob);

      await uploadTask;

      const imageURL = await getDownloadURL(storageRef);

      // Update the user's profile image URL in Firestore
      const userDocRef = doc(db, "usuario", user.uid);
      await updateDoc(userDocRef, {
        foto_usu: imageURL,
      });

      console.log("Profile image updated successfully.");
      navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      console.error("Error uploading image: ", error);
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

    updateDoc(userDocRef, userDataToUpdate).then(() => {
      console.log("Profile updated successfully.");
      navigation.goBack(); // Navigate back to the previous screen
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.imagemTopo}>
            {imageUri ? (
              <Pressable onPress={pickImage} style={styles.botao3}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#16337E",
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 8,
                    alignSelf: "center",
                  }}
                >
                  Escolher foto
                </Text>
              </Pressable>
            ) : (
              <Image
                source={{ uri: imageUri }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  alignSelf: "center",
                  marginTop: 10,
                  marginBottom: 10,
                  borderWidth: 4,
                  borderColor: "#16337E",
                }}
              />
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
                style={{...styles.botaoedit, alignContent: "center", alignItems: "center", alignSelf: "center",}}
                labelStyle={{ color: "white", fontSize: 15 }}
                onPress={() => {
                  handleUpdateProfile();
                  uploadImageToFirebase();
                }}
              >
                SALVAR
              </Button>
              <Button
                style={{...styles.botaovermelho2, width: "50%"}}
                labelStyle={{ color: "white", fontSize: 15 }}
                onPress={() => navigation.goBack()}
              >
                CANCELAR
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
