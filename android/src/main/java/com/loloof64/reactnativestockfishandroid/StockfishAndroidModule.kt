package com.loloof64.reactnativestockfishandroid

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

import org.petero.droidfish.engine.ExternalEngine
import org.petero.droidfish.engine.UCIEngineBase
import org.petero.droidfish.engine.UCIEngine

import android.util.Log


class StockfishAndroidModule(val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  protected lateinit var engineMonitor: Thread

  private lateinit var engine: UCIEngine

  override fun getName(): String {
    return "Stockfish"
  }

  @ReactMethod
  fun createEngine(promise: Promise) {
    Log.d("SStockfish", "startEngine")
    engine = UCIEngineBase.getEngine(reactContext.getApplicationContext(), "stockfish", object : UCIEngine.Report {
      override fun reportError(errMsg: String?) {
        Log.d("SStockfish", errMsg ?: "")
      }

      override fun reportStdOut(stdOutLine: String?) {
        Log.d("SStockfish", stdOutLine ?: "")
      }
    })
    Log.d("SStockfish", "startEngine preinit")
    engine.initialize()
    engineMonitor = Thread(object : Runnable {
      override fun run() {
        monitorLoop(engine)
      }
    })
    engineMonitor.start()
    promise.resolve(null)
  }

  protected fun monitorLoop(engine: UCIEngine) {
    while (true) {
      val timeout: Int = getReadTimeout()
      if (java.lang.Thread.currentThread().isInterrupted()) return
      val s: String? = engine.readLineFromEngine(timeout)
      if (s == null || java.lang.Thread.currentThread().isInterrupted()) return
      if (s.length > 0) {
        Log.d("SStockfish", s)
        reactContext
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
          .emit("engine_data", s)
      }
      if (java.lang.Thread.currentThread().isInterrupted()) return
      // notifyGUI();
      if (java.lang.Thread.currentThread().isInterrupted()) return
    }
  }

  @kotlin.jvm.Synchronized
  private fun getReadTimeout(): Int {
    return 400
  }

  @kotlin.jvm.Synchronized
  fun shutdownEngine() {
      engineMonitor.interrupt()
      engine.shutDown()
  }

  @ReactMethod
  fun sendCommand(command: String?) {
    engine.writeLineToEngine(command)
  }

  @ReactMethod
  fun stop() {
    shutdownEngine()
  }

}
