import { NativeModules, NativeEventEmitter } from 'react-native';
const { Stockfish } = NativeModules;
import parseIntValue from './parseIntValue';

const stockfishEventEmitter = new NativeEventEmitter(Stockfish);

const DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export default class EngineWrapper {
  constructor() {
    this.setupNativeEventSubscription();
    this.initializeStockfish();
  }

  async initializeStockfish() {
    try {
      await Stockfish.startEngine();
    } catch (err) {
      console.error('Failed to start Stockfish: ' + err);
    }
  }

  /*
   callback should be a function taking
   -> type as string (1st parameter)
   -> data as object
   */
  setEventCallback(callback) {
    this.eventCallback = callback;
  }

  setupNativeEventSubscription() {
    this.subscription = stockfishEventEmitter.addListener(
      'engine_data',
      (data) => {
        console.log('Got data : ' + JSON.stringify(data));

        if (!Stockfish.ready()) return;
        const response = this.parseEngineReponse(data);

        switch (response.type) {
          case 'bestMove':
            this.eventCallback('bestMove', {
              bestMove: response.data.bestmove,
              ponderMove: response.data.ponder,
            });
            break;
          case 'info':
            this.eventCallback('info', response.data);
            break;
        }
      }
    );
  }

  parsePv(info) {
    const match = info.match(/\spv\s(.*)$/);
    if (!match) {
      return null;
    }

    return match[1];
  }

  parseEngineReponse(response) {
    if (response.startsWith('bestmove')) {
      const parts = response.split(' ');
      return {
        type: 'bestMove',
        data: {
          bestmove: parts[1],
          ponder: parts[3],
        },
      };
    } else if (response.startsWith('info')) {
      const cpScore = parseIntValue(response, 'score cp');
      const mateScore = parseIntValue(response, 'score mate');
      return {
        type: 'info',
        data: {
          multipv: parseIntValue(response, 'multipv'),
          depth: parseIntValue(response, 'depth'),
          seldepth: parseIntValue(response, 'seldepth'),
          nodes: parseIntValue(response, 'nodes'),
          time: parseIntValue(response, 'time'),
          score: cpScore ? ['cp', cpScore] : ['mate', mateScore],
          pv: this.parsePv(response),
        },
      };
    } else {
      return {
        type: 'unknown',
        data: response,
      };
    }
  }

  newGame(positionFen = DEFAULT_FEN) {
    Stockfish.launchCommand('stop');
    Stockfish.launchCommand('uci');
    Stockfish.launchCommand('isready');
    Stockfish.launchCommand('ucinewgame');
    Stockfish.launchCommand('setoption name Ponder value false');
    Stockfish.launchCommand('setoption name Skill Level value 20');
    Stockfish.launchCommand('setoption name MultiPV value 3');
    Stockfish.launchCommand('position fen ' + positionFen);
  }

  launchCommand(command) {
    Stockfish.launchCommand(command);
  }

  stop() {
    this.subscription.remove();
    Stockfish.stopEngine();
  }
}
