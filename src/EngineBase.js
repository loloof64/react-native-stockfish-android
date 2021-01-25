import { NativeModules, DeviceEventEmitter } from 'react-native';
const { Stockfish } = NativeModules;

export default class EngineBase {
  constructor() {
    this.newGame();
    this.ready = Stockfish.createEngine();
  }

  async newGame() {
    await this.ready;
    Stockfish.sendCommand('stop');
    Stockfish.sendCommand('uci');
    Stockfish.sendCommand('debug on');
    Stockfish.sendCommand('isready');
    Stockfish.sendCommand('ucinewgame');
    Stockfish.sendCommand('setoption name Ponder value false');
  }

  async sendCommand(command) {
    await this.ready;
    Stockfish.sendCommand(command);
  }

  async commit() {
    await this.ready;
    Stockfish.commit();
  }
}
