package com.loloof64.reactnativestockfishandroid

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter


class StockfishAndroidModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  companion object  Library{
    fun loadStockfish() {
        System.loadLibrary("stockfish")
    }

    external fun readNextOutputLine() : String;
    external fun  sendCommand(command: String);
    external fun  main();
  }

  private var isReady = false
  private lateinit var readerThread: Thread

  init {
    loadStockfish()
  }

  private var reactContext: ReactApplicationContext = reactContext

  override fun getName(): String {
    return "Stockfish"
  }


  @ReactMethod
  fun startEngine(promise: Promise) {
    println("startEngine")
    try {
      val mainThread = Thread { main() }
      readerThread = Thread {readStockfishOutput()}

      mainThread.start()
      readerThread.start()
      
      sendCommand("uci")
      sendCommand("isready")
      promise.resolve("Successfully launched Stockfish")
    }
    catch (ex: Exception) {
      promise.reject("Error when launching Stockfish", ex)
    }
  }

  protected fun readStockfishOutput() {
    while (true) {
      if (Thread.currentThread().isInterrupted) return
      val output = readNextOutputLine();
      if (output.startsWith("#ERROR")) continue;
      if (Thread.currentThread().isInterrupted) return
      processOutputAsCommand(output)
    }
  }

  protected fun processOutputAsCommand(output: String) {
    println("Output from stockfish: $output");
    if (output == "readyok") isReady = true;
      reactContext
        .getJSModule(RCTDeviceEventEmitter::class.java)
        .emit("engine_data", output)
  }

  @ReactMethod
  fun launchCommand(command: String) {
    println("Sending command '${command}'")
    sendCommand(command)
  }

  @ReactMethod
  fun stopEngine() {
    println("stopEngine")
    readerThread.interrupt()
    sendCommand("quit")
  }

}
