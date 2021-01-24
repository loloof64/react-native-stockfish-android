package com.loloof64.reactnativestockfishandroid

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import org.petero.droidfish.EngineOptions
import org.petero.droidfish.engine.UCIEngine
import org.petero.droidfish.engine.UCIEngine.Report
import org.petero.droidfish.engine.UCIEngineBase


class StockfishAndroidModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  protected var engineMonitor: Thread? = null

  private var engine: UCIEngine? = null

  private var reactContext: ReactApplicationContext = reactContext

  override fun getName(): String {
    return "Stockfish"
  }


  @ReactMethod
  fun createEngine(promise: Promise) {
    Log.d("SStockfish", "startEngine")
    engine = UCIEngineBase.getEngine(reactContext, "stockfish", EngineOptions(), object : Report {
      override fun reportError(errMsg: String) {
        var errMsg: String? = errMsg
        if (errMsg == null) errMsg = ""
        Log.d("SStockfish", errMsg)
      }

      fun reportStdOut(stdOutLine: String?) {
        var stdOutLine = stdOutLine
        if (stdOutLine == null) stdOutLine = ""
        Log.d("SStockfish", stdOutLine)
      }
    })
    Log.d("SStockfish", "startEngine preinit")
    engine!!.initialize()
    engineMonitor = Thread { monitorLoop(engine!!) }
    engineMonitor!!.start()
    promise.resolve(null)
  }

  protected fun monitorLoop(engine: UCIEngine) {
    while (true) {
      val timeout = getReadTimeout()
      if (Thread.currentThread().isInterrupted) return
      val s = engine.readLineFromEngine(timeout)
      if (s == null || Thread.currentThread().isInterrupted) return
      if (s.length > 0) {
        Log.d("SStockfish", s)
        reactContext
          .getJSModule(RCTDeviceEventEmitter::class.java)
          .emit("engine_data", s)
      }
      if (Thread.currentThread().isInterrupted) return
      // notifyGUI();
      if (Thread.currentThread().isInterrupted) return
    }
  }

  @Synchronized
  private fun getReadTimeout(): Int {
    return 400
  }

  @Synchronized
  fun shutdownEngine() {
    if (engine != null) {
      engineMonitor!!.interrupt()
      engineMonitor = null
      engine!!.shutDown()
      engine = null
    }
  }

  @ReactMethod
  fun sendCommand(command: String?) {
    engine!!.writeLineToEngine(command)
  }

  @ReactMethod
  fun commit() {
  } // for ios compat


  @ReactMethod
  fun stop() {
  }

}
