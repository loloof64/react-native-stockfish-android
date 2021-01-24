cmake_minimum_required(VERSION 3.10.0)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 17)

include("${CMAKE_SOURCE_DIR}/cpp/nativeutil/CMakeLists.txt")
include("${CMAKE_SOURCE_DIR}/cpp/stockfish/CMakeLists.txt")
