project(stockfish)

add_library(stockfish SHARED
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

include_directories(
    ./stockfish
    ./stockfish/incbin
    ./stockfish/nnue
    ./stockfish/nnue/architectures
    ./stockfish/nnue/features
    ./stockfish/nnue/layers
    ./stockfish/syzygy
)