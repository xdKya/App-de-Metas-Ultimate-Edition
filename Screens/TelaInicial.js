import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import MetaProgramada from "./MetaProgramada";
SplashScreen.preventAutoHideAsync();
import firebase from "firebase";

let customFonts = {
  BubblegumSans: require("../assets/BubblegumSans-Regular.ttf"),
};

export default class TelaInicial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      time: 0,
      tempocarregado: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchMetaData();
  }

  fetchMetaData = async () => {
    let tempo = 0;
    console.log("var tempo: " + tempo);
    console.log("estado: " + this.state.time);
    await firebase
      .database()
      .ref("/Times/Time")
      .on(
        "value",
        (snapshot) => {
          if (snapshot.val()) {
            tempo = snapshot.val();
            console.log("recebeu o valor" + tempo);
            this.setState({ tempocarregado: true });
          }
          // this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log("A leitura falhou: " + errorObject.code);
        }
      );
    this.setState({ time: tempo });
    console.log("estado:" + this.state.time);
  };

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();

      return (
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>App de Metas</Text>
          </View>
          <Text style={[styles.text, { alignSelf: "center", fontSize: 30 }]}>
            Ola Henrique
          </Text>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              this.props.navigation.navigate("CriarMeta");
            }}
          >
            <Text style={styles.text}>Programe o seu dia</Text>
          </TouchableOpacity>
          {this.state.tempocarregado ? (
            <MetaProgramada time={this.state.time} />
          ) : (
            <Text>Nenhum alarme programado ainda!</Text>
          )}
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
  botao: {
    color: "black",
    backgroundColor: "lightgreen",
    width: 200,
    height: 200,
    borderRadius: 200,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "black",
    marginTop: 30,
  },
  text: {
    fontSize: 22,
    fontFamily: "BubblegumSans",
  },

  title: {
    flex: 0.2,
    backgroundColor: "white",
    borderBottomWidth: 10,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    height: 50,
  },

  titleText: {
    fontSize: 30,
    fontFamily: "BubblegumSans",
    marginTop: 30,
  },
});
