#include <jni.h>

extern "C" JNIEXPORT jstring JNICALL
Java_com_loloof64_reactnativestockfishandroid_StockfishAndroidModule_00024Library_readNextOutputLine(JNIEnv *env)
{
    std::string result = readNextOutputLine();

    return env->NewStringUTF(
        result.c_str()
    );
}

extern "C" JNIEXPORT void JNICALL
Java_com_loloof64_reactnativestockfishandroid_StockfishAndroidModule_00024Library_sendCommand(JNIEnv *env, jobject thiz, jstring command)
{
    jboolean isCopy;
    const char *str = env->GetStringUTFChars(command, &isCopy);
    if (str == NULL) return;
    std::string commandString(str);
    env->ReleaseStringUTFChars(command, str);

    sendCommand(commandString);
}

extern "C" JNIEXPORT jint JNICALL
Java_com_loloof64_reactnativestockfishandroid_StockfishAndroidModule_00024Library_main(JNIEnv *env)
{
    return main();
}