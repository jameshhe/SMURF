import test from "ava"
import loadGrammar from "../src/util/load_grammar.js"
import compileAndRun from "../src/compiler.js"

let grammar = loadGrammar()
let dummyPrint = () => { throw ("shouldn't call this") }

const Expressions = [
  " ( ( 123 ) ) ",
  "1 + -2",
  "1 - -2",
  "-4 * -5",
  "+4 - +5",
  "2*3+ 4 * 5",
  "20 / 2 / 5",
]

Expressions.forEach(v => {
  test(v, t => {
    let result = compileAndRun(grammar, v, dummyPrint)
    t.is(result, Math.round(eval(v)), "given: " + v)
  })
})

test("rounding applied correctly", t => {
  let v = "(18 / 7) * 7"
  let result = compileAndRun(grammar, v, dummyPrint)
  t.is(result, 21, "given: " + v)
})