#!/bin/sh

# Ensure wasm-bindgen-cli is installed
cargo install -f wasm-bindgen-cli

# Build the Rust project targeting WebAssembly
cargo build --release --target wasm32-unknown-unknown

# Generate the Wasm bindings and JavaScript glue code
wasm-bindgen --out-dir ./out --target web ./target/wasm32-unknown-unknown/release/my_rust_wasm_app.wasm
