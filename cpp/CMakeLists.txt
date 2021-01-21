cmake_minimum_required(VERSION 3.10.0)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 17)

include(stockfish/CMakeLists.txt)

add_library(stockfish_cpp
            SHARED
            nativeutil
            stockfish
)

set_target_properties(stockfish_cpp PROPERTIES LINKER_LANGUAGE CXX)

# Specifies a path to native header files.
include_directories(
            .
)