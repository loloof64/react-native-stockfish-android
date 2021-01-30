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
} from 'react-native';
import Engine from 'react-native-stockfish-android';
const EventEmitter2 = require('eventemitter2');

export default class App extends Component {
  state = {
    depth: 0,
    score: 0,
    command: '',
    bestMove: '',
    info: [
      {score: 0, pv: ''},
      {score: 0, pv: ''},
      {score: 0, pv: ''},
    ],
  };

  constructor() {
    super();
    this.eventListener = new EventEmitter2({});

    this.eventListener.on('info', (info) => {
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
    });

    this.eventListener.on('bestMove', ({bestMove, score}) => {
      this.setState((state) => ({
        bestMove,
      }));
    });
  }

  handleAnalyze() {
    Engine.newGame();
    Engine.launchCommand(this.state.command);
  }

  handleStop() {
    Engine.launchCommand('stop');
  }

  score(score) {
    return score / 100;
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
        {this.state.info.map((info, i) => (
          <View key={i} style={{}}>
            <Text>
              <Text style={{fontWeight: 'bold'}}>{info.score}</Text> {info.pv}
            </Text>
          </View>
        ))}
        <Text style={styles.bestmove}>{this.state.bestMove}</Text>
        <TextInput
          placeholder="Your command"
          value={this.state.command}
          onChangeText={(command) => this.setState({command})}
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
    justifyContent: 'space-between',
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
  bestmove: {
    backgroundColor: 'rgba(0,0,255,0.2)',
  },
});
