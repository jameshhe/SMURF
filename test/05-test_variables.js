import test from "ava"
import loadGrammar from "../src/util/load_grammar.js"
import compileAndRun from "../src/compiler.js"

const tests = [
  ["let a  a+5", 5],
  ["let a = 123  a*a", 123 * 123],
  [`let a = 345
     let b = 654
     let c = a+b
     c+1`, 1000]
]


let grammar = loadGrammar()
let dummyPrint = () => { throw ("shouldn't call this") }

tests.forEach(([code, expected]) => {
  test(code, t => {
    let result = compileAndRun(grammar, code, dummyPrint)
    t.is(result, expected, "given: " + code)
  })
})
