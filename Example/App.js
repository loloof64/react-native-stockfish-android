/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import Engine from 'react-native-stockfish-android';

export default class App extends Component {
  state = {
    depth: 0,
    score: 0,
    moves: '',
    baseTurn: 'w',
    info: [
      {score: 0, pv: ''},
      {score: 0, pv: ''},
      {score: 0, pv: ''},
    ],
  };

  constructor() {
    super();
    Engine.setEventCallback(this.processEvent);
  }

  processEvent(type, data) {
    ////////////////////////////////////
    console.log(type, data);
    ///////////////////////////////////////
    if (type === 'info') {
      const info = data;
      const i = info.multipv - 1;
      const nextInfo = [...this.state.info];
      nextInfo[i] = {
        ...info,
        score: this.score(info.score),
      };
      this.setState({
        info: nextInfo,
        depth: info.depth,
      });

      if (i === 0) {
        this.setState({
          score: this.score(info.score),
        });
      }
    } else if (type === 'bestMove') {
      const {bestMove, score} = data;
      this.setState((state) => ({
        moves: state.moves + '  ' + bestMove,
      }));
    }
  }

  handleAnalyze() {
    this.setState((state) => ({
      baseTurn: state.moves.split(' ').length % 2 ? 'w' : 'b',
    }));
    Engine.newGame();
    Engine.launchCommand('go depth 8 movetime 30000');
  }

  handleStop() {
    Engine.launchCommand('stop');
  }

  score(score) {
    const {baseTurn} = this.state;
    return ((baseTurn === 'b' ? -1 : 1) * score) / 100;
  }

  componentWillUnmount() {
    Engine.stop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.handleAnalyze()}
          title="Analyze"
          style={styles.button}
        />
        <Text>
          Score: {this.state.score} | Depth: {this.state.depth}
        </Text>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          }}
          contentContainerStyle={{
            flexDirection: 'column',
            padding: 10,
          }}>
          {this.state.info.map((info, i) => (
            <View key={i} style={{}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>{info.score}</Text> {info.pv}
              </Text>
            </View>
          ))}
        </ScrollView>
        <TextInput
          style={{
            width: 300,
            height: 200,
            backgroundColor: '#fff',
            borderColor: '#ccc',
            borderWidth: 1,
          }}
          multiline
          value={this.state.moves}
          onChangeText={(moves) => this.setState({moves})}
          autoCapitalize="none"
        />
        <Button onPress={() => this.handleStop()} title="Stop" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
