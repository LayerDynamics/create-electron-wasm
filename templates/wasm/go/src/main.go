package main

import (
	"syscall/js"
)

// Exported function to be called from JavaScript
func greet(this js.Value, p []js.Value) interface{} {
	name := p[0].String()
	println("Hello, " + name)
	return js.ValueOf("Hello, " + name)
}

func main() {
	c := make(chan struct{}, 0)

	println("Go WebAssembly Initialized")

	// Register the greet function to be callable from JavaScript
	js.Global().Set("greet", js.FuncOf(greet))

	<-c
}
