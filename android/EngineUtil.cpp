#include <jni.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/time.h>
#include <sys/resource.h>

#if defined(__arm__)
  #include "cpuinfo_arm.h"
#elif defined(__i386__)
  #include "cpuinfo_x86.h"
#endif
#include "stockfish/main.cpp"

extern "C"
JNIEXPORT jint JNICALL
Java_org_petero_droidfish_engine_reNice(JNIEnv *env, jclass, jint pid, jint prio) {
    setpriority(PRIO_PROCESS, pid, prio);
}

extern "C"
JNIEXPORT jint JNICALL
Java_org_petero_droidfish_engine_chmod
  (JNIEnv *env, jclass, jstring jExePath) {
    const char* exePath = env->GetStringUTFChars(jExePath, NULL);
    if (!exePath)
        return static_cast<jboolean>(false);
    bool ret = chmod(exePath, 0744) == 0;
    env->ReleaseStringUTFChars(jExePath, exePath);
    return static_cast<jboolean>(ret);
}

extern "C"
JNIEXPORT jint JNICALL
Java_org_petero_droidfish_engine_isSimdSupported
    (JNIEnv *env, jclass) {
#if defined(__arm__)
    using namespace cpu_features;
    ArmFeatures features = GetArmInfo().features;
    return features.neon ? JNI_TRUE : JNI_FALSE;
#elif defined(__i386__)
    using namespace cpu_features;
    X86Features features = GetX86Info().features;
    return features.sse4_1 ? JNI_TRUE : JNI_FALSE;
#endif
    return true;
}