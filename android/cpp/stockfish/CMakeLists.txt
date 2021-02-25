cmake_minimum_required(VERSION 3.6.0)

project("stockfish")

add_executable("${PROJECT_NAME}"    
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/cpp-adapter.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/mainIO.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/benchmark.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/bitbase.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/bitboard.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/endgame.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/evaluate.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/main.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/material.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/misc.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/movegen.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/movepick.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/pawns.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/position.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/psqt.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/search.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/thread.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/timeman.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/tt.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/tune.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/uci.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/ucioption.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/nnue/evaluate_nnue.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/nnue/features/half_kp.cpp
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/syzygy/tbprobe.cpp
)

set_target_properties(stockfish PROPERTIES LINKER_LANGUAGE CXX)

# Specifies a path to native header files.
target_include_directories(
    "${PROJECT_NAME}"
    PRIVATE
    ${CMAKE_SOURCE_DIR}/cpp/stockfish
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/incbin
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/nnue
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/nnue/architectures
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/nnue/features
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/nnue/layers
    ${CMAKE_SOURCE_DIR}/cpp/stockfish/syzygy
)

target_compile_options("${PROJECT_NAME}" PRIVATE -Wall)