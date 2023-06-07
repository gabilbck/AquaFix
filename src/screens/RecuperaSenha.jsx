import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { styles } from "../utils/style";
import { auth } from "../config/firebase";
import { confirmPasswordReset, sendPasswordResetEmail } from "firebase/auth";

function EsqueceuSenha() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleVerificationCodeChange = (text) => {
    setVerificationCode(text);
  };

  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
  };

  const handleConfirmNewPasswordChange = (text) => {
    setConfirmNewPassword(text);
  };

  const handleEnviarCodigo = async () => {
    try {
      await sendPasswordResetEmail(email);
      console.log(`Um código de verificação foi enviado para ${email}`);
    } catch (error) {
      console.log("Ocorreu um erro ao enviar o código de verificação:", error);
    }
  };

  const handleTrocarSenha = async () => {
    try {
      await authconfirmPasswordReset(auth, verificationCode, newPassword);
      console.log(`A senha foi alterada com sucesso para ${newPassword}`);
    } catch (error) {
      console.log("Ocorreu um erro ao trocar a senha:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TextInput
          label="E-mail"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={handleEmailChange}
        />
        <Button onPress={handleEnviarCodigo}>
          Enviar código de verificação
        </Button>
        <TextInput
          label="Código de verificação"
          placeholder="Digite o código de verificação"
          value={verificationCode}
          onChangeText={handleVerificationCodeChange}
        />
        <TextInput
          label="Nova senha"
          placeholder="Digite a nova senha"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={handleNewPasswordChange}
        />
        <TextInput
          label="Confirmar nova senha"
          placeholder="Digite a nova senha novamente"
          secureTextEntry={true}
          value={confirmNewPassword}
          onChangeText={handleConfirmNewPasswordChange}
        />
        <Button onPress={handleTrocarSenha}>Trocar senha</Button>
      </View>
    </View>
  );
}

export default EsqueceuSenhaScreen;
