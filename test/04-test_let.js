import test from "ava"
import loadGrammar from "../src/util/load_grammar.js"
import compileAndRun from "../src/compiler.js"

const tests = [
  ["let a", 0],
  ["let a = 123", 123],
  [`let
       a
       =
       1 + 2*3`, 7],
]


let grammar = loadGrammar()
let dummyPrint = () => { throw ("shouldn't call this") }

tests.forEach(([code, expected]) => {
  test(code, t => {
    let result = compileAndRun(grammar, code, dummyPrint)
    t.is(result, expected, "given: " + code)
  })
})
