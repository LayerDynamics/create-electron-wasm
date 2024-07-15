cmake_minimum_required(VERSION 3.0)
project(my_c_wasm_app)

set(CMAKE_C_STANDARD 99)

include_directories(src)

add_executable(my_c_wasm_app src/main.c src/utils.c)

set_target_properties(my_c_wasm_app PROPERTIES
    OUTPUT_NAME "main"
    SUFFIX ".wasm"
    LINK_FLAGS "-s EXPORTED_FUNCTIONS='[_main,_greet]' -s EXTRA_EXPORTED_RUNTIME_METHODS='[cwrap]'"
)
