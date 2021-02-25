import { NativeModules, NativeEventEmitter } from 'react-native';
const { Stockfish } = NativeModules;
import parseIntValue from './parseIntValue';

const stockfishEventEmitter = new NativeEventEmitter(Stockfish);

export default class EngineWrapper {
  /*
   callback should be a function taking
   -> type as string (1st parameter)
   -> data as object
   */
  constructor(callback) {
    this.ready = false;
    this.eventCallback = callback;
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

  setupNativeEventSubscription() {
    this.subscription = stockfishEventEmitter.addListener(
      'engine_data',
      (data) => {
        console.log('Got data : ' + JSON.stringify(data));

        const response = this.parseEngineReponse(data);
        if (!response) return;

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
    if (response === 'readyok') {
      this.ready = true;
      return;
    }
    if (!this.ready) return;
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

  launchCommand(command) {
    Stockfish.launchCommand(command);
  }

  stop() {
    this.subscription.remove();
    Stockfish.stopEngine();
  }
}
