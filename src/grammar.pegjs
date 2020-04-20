{
	const AST = options.AST
}

start
	= code

code
	= statements:(statement+)
	  {
	  	return new AST.StatementList(statements)
	  }

statement
	= "let" __ assign:variable_declaration {return assign} / assignment / expr

variable_declaration
	= assignment 
	/ l:variable_name 
	{
		let zero = new AST.Integer(0)
		return new AST.Assignment(l,zero)
	}

assignment
	= l:variable_name _ "="  _ r:expr
	  {
	  	return new AST.Assignment(l,r)
	  }

variable_value
	= id:identifier
	  {
	  	return new AST.VariableValue(id)
	  }

variable_name
	= id:identifier
	  {
	  	return new AST.VariableName(id)
	  }

expr
	= "if" __ expr:if_expression {return expr} / boolean_expression / arithmetic_expression

if_expression
	= elements: (expr brace_block "else" brace_block) 
	  {	
	  	return new AST.IfStatement(elements[0],elements[1],elements[3])
	  } /
	  elements:(expr brace_block)
	  {
	  	return new AST.IfStatement(elements[0],elements[1],null)
	  }

boolean_expression
	= expr:(arithmetic_expression relop arithmetic_expression)
	  {
	  	return new AST.BinOp(expr[0], expr[1], expr[2])
	  }

arithmetic_expression
	= head:mult_term rest:(addop mult_term)*
	  { 
	  	return rest.reduce(
	  		(result, element) => new AST.BinOp(result, element[0], element[1]),
	  		head
	  		)
	  }

mult_term
	= head:primary rest:(mulop primary)*
	  {	
	  	return rest.reduce(
			(result, element) => new AST.BinOp(result, element[0], element[1]),
			head
		)
	  }

primary
	=  integer / variable_value / _ "(" _ expr:arithmetic_expression _ ")" _ {return expr} 

identifier
	= [a-z][a-zA-Z_0-9]*

integer
	= _ ("+" / "-")?[0-9]+ _
	  { 
	  	return new AST.Integer(parseInt(text(), 10)) 
	  }
addop
	=  ('+' / '-')

mulop
	= ('*' / '/')

__
	= [ \t\r\n]+

_ 
	= [ \t\r\n]*

relop
	= ('==' / '!=' / '>=' / '>' / '<=' / '<')

param_list
   = "(" ")"

brace_block
	= _ "{" _ c:code _ "}" _
	  {
	  	return c
	  }