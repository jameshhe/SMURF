import test from "ava"
import loadGrammar from "../../src/util/load_grammar.js"
import compileAndRun from "../../src/compiler.js"


let grammar = loadGrammar()
let dummyPrint = () => { throw ("shouldn't call this") }

test("failing if with no `else` returns something", t => {
  let result = compileAndRun(grammar, "if 0 { 123 }", dummyPrint)
  t.is(result, "should raise exception or be zero")
})