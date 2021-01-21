cmake_minimum_required(VERSION 3.10.0)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 17)

add_library(stockfish
            SHARED
            ./stockfish/benchmark.cpp
            ./stockfish/bitbase.cpp
            ./stockfish/bitboard.cpp
            ./stockfish/endgame.cpp
            ./stockfish/evaluate.cpp
            ./stockfish/main.cpp
            ./stockfish/material.cpp
            ./stockfish/misc.cpp
            ./stockfish/movegen.cpp
            ./stockfish/movepick.cpp
            ./stockfish/pawns.cpp
            ./stockfish/position.cpp
            ./stockfish/psqt.cpp
            ./stockfish/search.cpp
            ./stockfish/thread.cpp
            ./stockfish/timeman.cpp
            ./stockfish/tt.cpp
            ./stockfish/tune.cpp
            ./stockfish/uci.cpp
            ./stockfish/ucioption.cpp
            ./stockfish/nnue/evaluate_nnue.cpp
            ./stockfish/nnue/features/half_kp.cpp
            ./stockfish/syzygy/tbprobe.cpp
)

set_target_properties(stockfish PROPERTIES LINKER_LANGUAGE CXX)

# Specifies a path to native header files.
include_directories(
            ./stockfish
            ./stockfish/incbin
            ./stockfish/nnue
            ./stockfish/nnue/architectures
            ./stockfish/nnue/features
            ./stockfish/nnue/layers
            ./stockfish/syzygy
)