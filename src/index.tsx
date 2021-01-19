import { NativeModules } from 'react-native';

type StockfishAndroidType = {
  multiply(a: number, b: number): Promise<number>;
};

const { StockfishAndroid } = NativeModules;

export default StockfishAndroid as StockfishAndroidType;
