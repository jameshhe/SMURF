{
	const AST = options.AST
}

start
	= code

code
	= statements:(statement)+
	  {
	  	return new AST.StatementList(statements)
	  }

statement
	= _ "let" _ assign:(variable_declaration) _ {return assign} / assignment / expr

variable_declaration
	= _ l:(variable_name) _ "="  _ r:expr
	{
		return new AST.Declaration(l,r)
	}
	/ _ l:variable_name _
	{
		let zero = new AST.Integer(0)
		return new AST.Declaration(l,zero)
	}

assignment
	= _ l:(variable_name) _ "="  _ r:expr
	  {
	  	return new AST.Assignment(l,r)
	  }

variable_value
	= _ id:identifier _
	  {
	  	return new AST.VariableValue(id)
	  }

variable_name
	= _ id:identifier _
	  {
	  	return new AST.VariableName(id)
	  }

expr
	= "fn" _ expr:function_definition {return expr} 
	  / "if" __ expr:if_expression {return expr} 
	  / boolean_expression 
	  / arithmetic_expression

if_expression
	= elements: (expr brace_block "else" brace_block) 
	  {	
	  	return new AST.IfStatement(elements[0],elements[1],elements[3])
	  } 
	  /
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
	=  integer / print / function_call / variable_value / _ "(" _ expr:arithmetic_expression _ ")" _ {return expr}

identifier
	= [a-z][a-zA-Z_0-9]*
	  {
	  	return text()
	  }

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

print
	= _ "print" _ c:arg_list
	  {
	  	return new AST.Print(c)
	  }

function_call
	= _ name:variable_value _ argumentList:arg_list _
	  {
	  	return new AST.FunctionCall(name, argumentList)
	  }

arg_list
	= _ "(" argument:(args)* ")" _
	  {
	  	return argument
	  }


args
	= _ prim: primary (",")? _
	{
		return prim
	}

function_definition
	= params:param_list code:brace_block    
	  { 
	  	return new AST.FunctionDefinition(params, code) 
	  }

param_list
   =  _ "(" params:(parameters)* ")" _
   	  {
   	  	return params
   	  }

parameters
	= _ val:variable_value (",")? _
	  {
	  	return val
	  }

brace_block
	= _ "{" _ c:code _ "}" _
	  {
	  	return c
	  }