set(NATIVEUTIL_SRC
${CMAKE_SOURCE_DIR}/cpp/nativeutil/nativeutil.cpp
${CMAKE_SOURCE_DIR}/cpp/nativeutil/cpu_features/src/filesystem.c
${CMAKE_SOURCE_DIR}/cpp/nativeutil/cpu_features/src/hwcaps.c
${CMAKE_SOURCE_DIR}/cpp/nativeutil/cpu_features/src/stack_line_reader.c
${CMAKE_SOURCE_DIR}/cpp/nativeutil/cpu_features/src/string_view.c
${CMAKE_SOURCE_DIR}/cpp/nativeutil/cpu_features/src/unix_features_aggregator.c
)

if (CMAKE_ANDROID_ARCH_ABI STREQUAL "armeabi-v7a")
    list(APPEND NATIVEUTIL_SRC
        ${CMAKE_SOURCE_DIR}/cpp/nativeutil/cpu_features/src/cpuinfo_arm.c
    )
    #set(LOCAL_ARM_NEON FALSE)
elseif(CMAKE_ANDROID_ARCH_ABI STREQUAL "arm64-v8a")
    list(APPEND NATIVEUTIL_SRC
        ${CMAKE_SOURCE_DIR}/cpp/nativeutil/cpu_features/src/cpuinfo_aarch64.c
    )
elseif(CMAKE_ANDROID_ARCH_ABI STREQUAL "x86")
    list(APPEND NATIVEUTIL_SRC
        ${CMAKE_SOURCE_DIR}/cpp/nativeutil/cpu_features/src/cpuinfo_x86.c
    )
elseif(CMAKE_ANDROID_ARCH_ABI STREQUAL "x86_64")
    list(APPEND NATIVEUTIL_SRC
        ${CMAKE_SOURCE_DIR}/cpp/nativeutil/cpu_features/src/cpuinfo_x86.c
    )
endif()

add_library(
    nativeutil
    SHARED
    ${NATIVEUTIL_SRC}
)

set_target_properties(nativeutil PROPERTIES LINKER_LANGUAGE  C)
set(CMAKE_C_FLAGS "-DHAVE_DLFCN_H=1 -DSTACK_LINE_READER_BUFFER_SIZE=1024  -fPIC -s")
set_property(TARGET nativeutil APPEND_STRING PROPERTY LINK_FLAGS "-fPIC -s")

# Specifies a path to native header files.
include_directories(
    ${CMAKE_SOURCE_DIR}/cpp/nativeutil/cpu_features/include
    ${CMAKE_SOURCE_DIR}/cpp/nativeutil/cpu_features/include/internal
)