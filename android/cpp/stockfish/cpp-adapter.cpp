#include <jni.h>
#include "mainIO.h"
#include "main.h"

extern "C" JNIEXPORT jstring JNICALL
Java_com_loloof64_reactnativestockfishandroid_StockfishAndroidModule_00024Library_readNextOutputLine(JNIEnv *env)
{
    std::string result = readNextOutputLine();

    return env->NewString(
        (const jchar *)result.c_str(),
        (jsize)result.length());
}

extern "C" JNIEXPORT void JNICALL
Java_com_loloof64_reactnativestockfishandroid_StockfishAndroidModule_00024Library_sendCommand(JNIEnv *env, jobject thiz, jstring command)
{
    jboolean madeCopy;
    const char *str = env->GetStringUTFChars(command, &madeCopy);
    std::string commandString(str);

    sendCommand(commandString);
}

extern "C" JNIEXPORT jint JNICALL
Java_com_loloof64_reactnativestockfishandroid_StockfishAndroidModule_00024Library_main(JNIEnv *env)
{
    return main();
}