#include <stdio.h>
#include <emscripten/emscripten.h>
#include "utils.h"

#ifdef __cplusplus
extern "C" {
#endif

EMSCRIPTEN_KEEPALIVE
void greet(const char* name) {
    printf("Hello, %s!\n", name);
}

#ifdef __cplusplus
}
#endif

int main() {
    printf("WebAssembly module loaded\n");
    return 0;
}
