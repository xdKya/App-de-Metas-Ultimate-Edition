import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
export default class CriarMeta extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async addMetas() {
    if (
      this.state.Time &&
      this.state.Urgent &&
      this.state.Important &&
      this.state.Normal
    ) {
      let metaData = {
        Time: this.state.Time,
        Urgent: this.state.Urgent,
        Important: this.state.Important,
        Normal: this.state.Normal,
      };
      await firebase
        .database()
        .ref("/Times/")
        .set(metaData)
        .then(function (snapshot) {});
      //this.props.setUpdateToTrue();
      this.props.navigation.navigate("TelaInicial", { time: this.state.Time });
    } else {
      Alert.alert(
        "Error",
        "Todos os campos são obrigatórios!",
        [{ text: "OK", onPress: () => console.log("OK Pressionado") }],
        { cancelable: false }
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Programe o seu dia</Text>
        </View>
        <TextInput
          placeholder="Que horas voce vai acordar?"
          style={styles.TextInput}
          onChangeText={(Time) => {
            this.setState({ Time });
          }}
        ></TextInput>
        <Text style={styles.Text}>Defina suas Metas</Text>
        <TextInput
          placeholder="Metas Urgentes"
          style={[styles.TextInput, { backgroundColor: "red" }]}
          onChangeText={(Urgent) => {
            this.setState({ Urgent });
          }}
        ></TextInput>
        <TextInput
          placeholder="Metas Importante"
          style={[styles.TextInput, { backgroundColor: "blue" }]}
          onChangeText={(Important) => {
            this.setState({ Important });
          }}
        ></TextInput>
        <TextInput
          placeholder="Metas Normal"
          style={[styles.TextInput, { backgroundColor: "yellow" }]}
          onChangeText={(Normal) => {
            this.setState({ Normal });
          }}
        ></TextInput>
        <TouchableOpacity
          style={styles.Botao}
          onPress={() => {
            this.addMetas();
          }}
        >
          <Text style={[styles.Text, { marginRight: 0 }]}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9967A",
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
  TextInput: {
    borderWidth: 3,
    fontFamily: "BubblegumSans",
    height: 50,
    width: 200,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textShadowColor: "white",
    textShadowRadius: 3,
  },
  Text: {
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginRight: 70,
    marginTop: 20,
    fontFamily: "BubblegumSans",
    fontSize: 20,
    marginBottom: 20,
  },

  Botao: {
    backgroundColor: "lightgreen",
    width: 200,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
    textAlign: "center",
  },
});
