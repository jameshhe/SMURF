# Week 2

| Part           | Comments    | Points |
|----------------|-------------|--------|
| provided tests | All passed  |     65 |
| extras         | 3 failures  |      2 |
| Coding         |             |     22 |
| **TOTAL**      |             |     89 |

Looking at the code, I see:

    visitIfStatement(ast){
      let predicate = ast.predicate.accept(this)
      let thenCode = ast.thenCode.accept(this)
      if(predicate == 1){
        return thenCode
      }
      else{
        if(ast.elseCode != null){
          let elseCode = ast.elseCode.accept(this)
          return elseCode
        }
      }
    }
I deal with the fact that the return value is undefined if the predicate
is false and there's no else block below. The other issue is that the
code always evaluates the then block: it should defer this until it
knows it needs it.



Failures in my torture tests:

- all expressions in SMURF must return a value, but the interpreter
  returns `undefined` for `if 0 { 99 }`. It should either raise an error
  or return 0.

- your binding code doesn't check for duplicate definitions of a
  variable (two `let`s for the same variable)

- your binding code doesn't check for attempts to access a
  variable that hasn't been defined.

- the grammar accepts "1 + 123" but gives a syntax error for "a + 123"
  (which is weird...)



# Week 1

| Part           | Comments    | Points |
|----------------|-------------|--------|
| 00-test_values | All passed  |     75 |
| 00-test_extras | All passed  |     10 |
| Coding         |             |     25 |
| **TOTAL**      |             |    100 |

I really have nothing to say about this. Very nice all around.