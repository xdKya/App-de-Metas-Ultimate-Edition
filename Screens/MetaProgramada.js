import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default class MetaProgramada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    };
  }
  counter = () => {
    if (this.state.time >= 1) {
      this.setState({
        time: this.state.time - 1,
      });
    }
  };
  componentDidMount() {
    this.setState({ time: this.props.time });
    setInterval(this.counter, 1000);
  }
  render() {
    return (
      <View>
        <Text>{"O Alarme ira tocar em : " + this.state.time} </Text>
        <TouchableOpacity onPress={() => this.setState({ time: 0 })}>
          <Text>redefinir</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
