project(nativeutil)

add_library(nativeutil SHARED
    ./nativeutil/nativeutil.cpp
  ./nativeutil/cpu_features/src/cpuinfo_aarch64.c
  ./nativeutil/cpu_features/src/cpuinfo_arm.c
  ./nativeutil/cpu_features/src/cpuinfo_x86.c
  ./nativeutil/cpu_features/src/filesystem.c
  ./nativeutil/cpu_features/src/hwcaps.c
  ./nativeutil/cpu_features/src/stack_line_reader.c
  ./nativeutil/cpu_features/src/string_view.c
  ./nativeutil/cpu_features/src/unix_features_aggregator.c
)

include_directories(
   ./nativeutil/cpu_features/include
   ./nativeutil/cpu_features/include/internal
)