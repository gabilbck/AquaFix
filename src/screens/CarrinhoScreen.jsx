export default function CarrinhoScreen() {
    return (

        <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            {/* Parte que aparece a imagem: azul e logo */}
            <View style={styles.imagemTopo}>
              <Image
                source={require("../../assets/img/logocomp-branca.png")}
                style={{ width: 200, height: 127 }}
              />
            </View>
            {/* Parte que aparece o conteúdo: cinza/branco */}
            <View style={{ ...styles.conteudo, flex: 1 }}>
              <View style={styles.containerInner}>
                <Text style={styles.titulo}>CARRINHO</Text>
                <Text style={styles.subtitulo}>
                   Veja seu carrinho aqui:
                </Text>

              
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
    );

}