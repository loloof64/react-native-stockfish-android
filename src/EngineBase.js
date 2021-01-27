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
    Stockfish.launchCommand('stop');
    Stockfish.launchCommand('uci');
    Stockfish.launchCommand('isready');
    Stockfish.launchCommand('ucinewgame');
    Stockfish.launchCommand('setoption name Ponder value false');
    Stockfish.launchCommand('position fen ' + positionFen);
  }

  launchCommand(command) {
    Stockfish.launchCommand(command);
  }

  stop() {
    Stockfish.stopEngine();
  }
}
