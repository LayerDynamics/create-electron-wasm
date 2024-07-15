CC = emcc
CFLAGS = -O3 --no-entry -s EXPORTED_FUNCTIONS='[_main,_greet]' -s EXTRA_EXPORTED_RUNTIME_METHODS='[cwrap]'
SRC = src/main.c src/utils.c
OBJ = $(SRC:.c=.o)
OUT = build/main.wasm

all: $(OUT)

$(OUT): $(OBJ)
    $(CC) $(CFLAGS) -o $@ $^

%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@

clean:
    rm -f $(OBJ) $(OUT)
