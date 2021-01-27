import { NativeModules, DeviceEventEmitter } from 'react-native';
const { Stockfish } = NativeModules;
import EventEmitter from 'eventemitter2';

const DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export default class EngineBase extends EventEmitter {
  constructor() {
    super({});
    this.initializeStockfish();
  }

  async initializeStockfish() {
    try {
      await Stockfish.startEngine();
    } catch (err) {
      console.error('Failed to start Stockfish: ' + err);
    }
  }

  newGame(positionFen = DEFAULT_FEN) {
    Stockfish.sendCommand('stop');
    Stockfish.sendCommand('uci');
    Stockfish.sendCommand('isready');
    Stockfish.sendCommand('ucinewgame');
    Stockfish.sendCommand('setoption name Ponder value false');
    Stockfish.sendCommand('position fen ' + positionFen);
  }

  sendCommand(command) {
    Stockfish.sendCommand(command);
  }

  stop() {
    Stockfish.stopEngine();
  }
}
