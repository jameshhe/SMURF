# SMURF WEEK TWO

Your mission is to get the tests to run (`npm test`). These tests include the
expression tests from last week, and add new tests for variables and for
functions without parameters, as well as if statements and blocks of code.

You'll be expanding your existing code, adding a binding for variables and
correctly distinguishing between lvalues and rvalues.


## Details

The grammar that you are supporting is now bigger:

~~~ ebnf
start
  = code

identifier
  = <lowercase letter> <letter or digit or _>*

///////////////////////// blocks (lists of statements) /////////////////////////

code
  = statement+

statement
  = "let" __ variable_declaration
  | assignment
  | expr

//////////////// variables & variable declaration /////////////////////////////

variable_declaration
  = variable_name "=" expr
  | variable_name

variable_value             // as rvalue
  =  identifier

variable_name              // as lvalue
  =  identifier

//////////////////////////////// if/then/else /////////////////////////////

if_expression
  = expr brace_block "else" brace_block
  | expr brace_block

//////////////////////////////// assignment /////////////////////////////

assignment
  = variable_name "=" expr

//////////////////////////////// expression /////////////////////////////

expr
  = "fn" _ function_definition
  | "if" _ if_expression
  | boolean_expression
  | arithmetic_expression


/////////////////////// boolean expression /////////////////////////////

boolean_expression
  = arithmetic_expression relop arithmetic_expression

//////////////////// arithmetic expression /////////////////////////////

arithmetic_expression
  = mult_term (addop mult_term)*

mult_term
  = primary (mulop primary)*

primary
  = integer
  | function_call                   // this was commented out last week
  | variable_value                  // as was this
  | "(" arithmetic_expression ")"


integer
  = ("+" | "-") digits

digits
  = ("0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9")+

addop
  = '+' | '-'

mulop
  = '*' | '/'

relop
  = '==' | '!=' | '>=' | '>' | '<=' | '<'


//////////////////////////////// function call /////////////////////////////

function_call
  = variable_value "(" ")"     // note: no parameters

//////////////////////// function definition /////////////////////////////

function_definition
  = param_list brace_block

param_list
   = "(" ")"

brace_block
  = "{" code "}"
~~~

Your job is to:

* update your grammar to the new syntax requirements

* you can check your progress by running the tests: `npm test`

The suggestions from week 1 are still valid:

* Don't panic

* Take it step by step.

* Commit often.

* Use me if you get stuck.

In addition: I've numbered the test files in the order I recommend you
tackle them. You can run a particular test file using:

~~~ session
$ npx ava test/«file name»
~~~
