#!/bin/sh

# Create the build directory if it doesn't exist
mkdir -p build

# Compile the C code to WebAssembly
emcc -O3 --no-entry -o build/main.wasm src/main.c src/utils.c \
    -s EXPORTED_FUNCTIONS='["_main", "_greet"]' \
    -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]'
