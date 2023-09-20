import { cnpj, cpf } from "cpf-cnpj-validator";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { styles } from "../utils/styles";
export default function InputCNPJValidator({ tipo }) {
  const [valor, setValor] = useState("");
  const [isValid, setIsValid] = useState(null);

  function validar(texto) {
    if (texto.length > 14) return;
    setValor(mask(texto));
    if (tipo === "cnpj") {
      setIsValid(cnpj.isValid(texto));
    } else {
      setIsValid(null);
    }

    console.log();
  }

  function mask(texto) {
    if (texto.length === 14) {
      return cnpj.format(texto);
    } else{
        return texto;
    }
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={`Digite seu ${tipo.toUpperCase()}`}
        value={valor}
        onChangeText={validar}
        error={!isValid}
      />
    </View>
  );
}
