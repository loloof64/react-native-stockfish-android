# react-native-stockfish-android

Use stockfish 13 in your react native Android application.

## Installation

```sh
npm install react-native-stockfish-android
```

## Usage

```js
import StockfishAndroid from "react-native-stockfish-android";

// ...

// processEventCallback must be a function taking two parameters : type and data
// type (string) is either bestmove or info
// data is payload
const engine = new Engine(processEventCallback);

// Don't forget to call stop() on the engine when needing to release your host component !
```

## How to run the example (you may need to run the react-native-stockfish-android projects inside the yarn cache : as a new one is generated at dependencies installation invocation).

1. install nodejs (lts or later) and yarn
2. cd example
3. run `yarn` in order to install dependencies
4. ensure a device is connected (either emulator or real device) : check by `adb devices`
4. run `npx react-native start` in one terminal in order to start the local server
5. run `npx react-native run-android` in another terminal in order to compile and deploy example on device.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

Using code from project [DroidFish](https://github.com/peterosterlund2/droidfish) and from project [react-native-stockfish](https://github.com/sunify/react-native-stockfish).