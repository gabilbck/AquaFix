import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { styles } from "../utils/styles";
import { auth, db, storage } from "../config/firebase";
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

export default function EditUsu({ navigation }) {
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
            setAdicionarSobre(userData.bio_usu);
            setNomeUsu(userData.nome_usu);
            setNomeCompleto(userData.nome_real_usu);
            setEmail(userData.email_usu);
            setZipCode(userData.cep_usu);
            setCpf(userData.cpf_usu);
            setWhatsappUsu(userData.whatsapp_usu);
            // Set other state variables as needed
          }
        } catch (error) {
          console.error("Error fetching user profile data: ", error);
        }
      };

      fetchUserProfile();
    }
  }, [user]);

  const pickImage = async () => {
    // Image picker logic remains the same
  };

  const uploadImageToFirebase = async () => {
    // Upload image to Firebase storage logic remains the same
  };

  const setImageToFirebase = async (url) => {
    // Set image URL in Firestore logic remains the same
  };

  function handleUpdateProfile() {
    // Update the user's profile data in Firestore with the new values
    const userDocRef = doc(db, "usuario", user.uid);
    const userDataToUpdate = {
      bio_usu: adisobre,
      nome_usu: nomeUsu,
      nome_real_usu: nomeCompleto,
      email_usu: email,
      cep_usu: zipCode,
      cpf_usu: cpf,
      whatsapp_usu: whatsappUsu,
      // Update other fields as needed
    };

    updateDoc(userDocRef, userDataToUpdate)
      .then(() => {
        console.log("Profile updated successfully.");
        navigation.goBack(); // Navigate back to the previous screen
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
        // Handle error as needed
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Add profile information input fields here */}
        {/* Add image picker and display logic here */}
        <TextInput
          placeholder="Adicionar Sobre"
          value={adisobre}
          onChangeText={setAdicionarSobre}
          style={styles.input}
        />
        {/* Add other input fields for profile information */}
        {/* Add the image picker and display logic here */}
        <TouchableOpacity onPress={pickImage} style={styles.botao}>
          Escolher foto
        </TouchableOpacity>
        {/* Add a button to update the profile */}
        <TouchableOpacity onPress={handleUpdateProfile} style={styles.botao}>
          Atualizar Perfil
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
