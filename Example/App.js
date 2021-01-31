import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import Engine from 'react-native-stockfish-android';

export default function App() {
  const [depth, setDepth] = useState(0);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState('');
  const [baseTurn, setBaseTurn] = useState('w');
  const [info, setInfo] = useState([
    {score: 0, pv: ''},
    {score: 0, pv: ''},
    {score: 0, pv: ''},
  ]);
  const [engine, setEngine] = useState(null);

  function processEvent(type, data) {
    if (type === 'info') {
      const tempInfo = data;

      const i = tempInfo.multipv - 1;
      let nextInfo = [...info];

      const newScore = getScore(tempInfo.score[1]);

      nextInfo[i] = {
        ...tempInfo,
        score: newScore,
      };

      setInfo((theInfo) => nextInfo);
      setDepth((theDepth) => tempInfo.depth);

      if (i === 0) {
        setScore((theScore) => newScore);
      }
    } else if (type === 'bestMove') {
      const {bestMove} = data;
      setMoves((theMoves) => moves + ' ' + bestMove);
    }
  }

  useEffect(() => {
    setEngine(new Engine(processEvent));

    return function () {
      if (engine) {
        engine.stop();
      }
    };
  }, []);

  function handleAnalyze() {
    setBaseTurn((theBaseTurn) => (moves.split(' ').length % 2 ? 'w' : 'b'));
    if (!engine) {
      return;
    }

    engine.newGame();
    engine.launchCommand('position startpos moves ' + moves);
    engine.launchCommand('go movetime 3000');
  }

  function handleStop() {
    if (!engine) {
      return;
    }
    engine.launchCommand('stop');
  }

  function getScore(score) {
    return ((baseTurn === 'b' ? -1 : 1) * score) / 100.0;
  }

  return (
    <View style={styles.container}>
      <Button onPress={handleAnalyze} title="Analyze" style={styles.button} />
      <Text>
        Score: {score} | Depth: {depth}
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
        {info.map((info, i) => (
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
        value={moves}
        onChangeText={(moves) => setMoves((m) => moves)}
        autoCapitalize="none"
      />
      <Button onPress={handleStop} title="Stop" />
    </View>
  );
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
