import test from "ava"
import loadGrammar from "../src/util/load_grammar.js"
import compileAndRun from "../src/compiler.js"

let grammar = loadGrammar()
let dummyPrint = () => { throw ("shouldn't call this") }


test("True is 1", t => {
  let result = compileAndRun(grammar, "1 == 1", dummyPrint)
  t.is(typeof result, 'number')
  t.is(result, 1, "given: 1 == 1" )
})

test("false is 0", t => {
  let result = compileAndRun(grammar, "1 == 2", dummyPrint)
  t.is(typeof result, 'number')
  t.is(result, 0, "given: 1 == 2")
})
