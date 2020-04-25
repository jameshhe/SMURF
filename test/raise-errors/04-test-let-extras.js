import test from "ava"
import loadGrammar from "../../src/util/load_grammar.js"
import compileAndRun from "../../src/compiler.js"

const tests = [
  [`let a
    let a`,
    "error"
  ],

  ["let a = a + 123", "error"],

]


let grammar = loadGrammar()
let dummyPrint = () => { throw ("shouldn't call this") }

tests.forEach(([code, expected]) => {
  test(code, t => {
    let result = compileAndRun(grammar, code, dummyPrint)
    t.is(result, expected, "given: " + code)
  })
})
