import React, { useState, useEffect } from "react";
import { View, TextInput, Text, FlatList } from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  startAt,
  endAt,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";

import { styles } from "../utils/styles";
import { Image } from "expo-image";
import { Button, Card } from "react-native-paper";
import { ScrollView } from "react-native-web";

export default function PesquisaScreen({ navigation }) {
  const [resultado, setResultado] = useState([]);
  const [busca, setBusca] = useState("");

  async function buscarServico() {
    if (busca.trim() === "") {
      // Não faça a consulta se o campo de busca estiver vazio
      setResultado([]);
      return;
    }

    const usuarioRef = collection(db, "usuario");
    const buscaServico = query(
      usuarioRef,
      where("servicos_usu", ">=", busca),
      orderBy("servicos_usu"),
      startAt(busca),
      endAt(busca + "\uf8ff")
    );

    const resultadoSnapshot = await getDocs(buscaServico);
    const listaUsuarios = resultadoSnapshot.docs.map((doc) => doc.data());

    // Agora, adicione a consulta para "servicos_usu1" e "servicos_usu2"
    const buscaServico1 = query(
      usuarioRef,
      where("servicos_usu1", ">=", busca),
      orderBy("servicos_usu1"),
      startAt(busca),
      endAt(busca + "\uf8ff")
    );

    const resultadoSnapshot1 = await getDocs(buscaServico1);
    const listaUsuarios1 = resultadoSnapshot1.docs.map((doc) => doc.data());

    const buscaServico2 = query(
      usuarioRef,
      where("servicos_usu2", ">=", busca),
      orderBy("servicos_usu2"),
      startAt(busca),
      endAt(busca + "\uf8ff")
    );

    const resultadoSnapshot2 = await getDocs(buscaServico2);
    const listaUsuarios2 = resultadoSnapshot2.docs.map((doc) => doc.data());

    // Combine todas as listas de resultados
    const resultadoFinal = [
      ...listaUsuarios,
      ...listaUsuarios1,
      ...listaUsuarios2,
    ];

    setResultado(resultadoFinal);
  }

  useEffect(() => {
    buscarServico();
  }, [busca]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imagemTopo}>
          <Image
            source={require("../../assets/img/logocomp-branca.png")}
            style={{ width: 200, height: 127 }}
          />
        </View>
        <View style={styles.conteudo}>
          <View style={styles.containerInner}>
            <TextInput
              placeholder="Faça sua busca"
              value={busca}
              onChangeText={setBusca}
              style={styles.input}
            />
            {resultado.length > 0 && (
              <FlatList
                data={resultado}
                renderItem={({ item }) => (
                  <View>
                    <Card style={styles.card}>
                      <Card.Content>
                        <Text
                          fontWeight="bold"
                          style={{
                            fontSize: 25,
                            fontWeight: "bold",
                            gap: 10,
                            color: "white",
                          }}
                        >
                          {item.nome_usu}
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "bold",
                            color: "white",
                            marginTop: 7,
                          }}
                        >
                          Serviços:
                        </Text>
                        <View style={styles.linhaServicos}>
                          <Text style={styles.servicos}>
                            {item.servicos_usu}
                          </Text>
                          <Text style={styles.servicos}>
                            {item.servicos_usu1}
                          </Text>
                          <Text style={styles.servicos}>
                            {item.servicos_usu2}
                          </Text>
                        </View>
                      </Card.Content>
                      <Card.Actions>
                        <Button
                          onPress={() =>
                            navigation.navigate("PerfilViewScreen", {
                              pessoa: item,
                            })
                          }
                          style={{
                            backgroundColor: "lightgray",
                            borderRadius: 8,
                            border: 0,
                            marginTop: 10,
                            width: "100%",
                          }}
                        >
                          <Text
                            style={{
                              color: "black",
                              fontWeight: "bold",
                            }}
                          >
                            Ver perfil
                          </Text>
                        </Button>
                      </Card.Actions>
                    </Card>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
