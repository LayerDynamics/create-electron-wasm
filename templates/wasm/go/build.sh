#!/bin/sh

# Ensure we have the wasm_exec.js file
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" ./assets/wasm_exec.js

# Build the Go code to WebAssembly
GOOS=js GOARCH=wasm go build -o build/main.wasm ./src/main.go
