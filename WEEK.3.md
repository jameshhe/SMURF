# SMURF WEEK THREE

Your mission is to get the tests to run (`npm test`). These tests
include everything from weeks 1 and 2. They also test functions with
parameters, and the correct use of bindings to implement function calls.

You'll be expanding your existing code. Currently, bindings are simply a
map in the interpreter. Now you'll be writing a binding class, creating
new instances when needed.

I'm also tightening up the tests.

- the standard tests will now expect you to raise an exception if a
  SMURF program

  - declares the same variable twice in the same binding
  - tries to use the value of a variable that hasn't been declared

- if a SMURF program has an `if` statement with no `else` clause, it
  should evaluate to `0` if the predicate is false.

## Details

You're now supporting the full grammar from the README.
The grammar that you are supporting is now bigger:

Your job is to:

* get tests 00 to 06 working. Some will likely fail because of the
  tightening up above.

* update your grammar to the new syntax requirements

* you can check your progress by running the tests: `npm test`

The suggestions from week 1 are still valid:

* Don't panic

* Take it step by step.

* Commit often.

* Use me if you get stuck.

In addition, you might want to write a trivial helper function that
dumps out a binding and all its ancestors. This will help you visualize
what's going on.

Remember, you can run tests with

~~~ session
$ npx ava test/«file name»
~~~
