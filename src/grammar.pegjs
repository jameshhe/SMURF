{
	const AST = options.AST
}

arithmetic_expression
	= head:mult_term rest:(addop mult_term)*
	  { 
	  	return rest.reduce(
	  		(result, [op, right]) => new AST.BinOp(result, op, right),
	  		head
	  		)
	  }

mult_term
	= head:primary rest:(mulop primary)*
	  {	
	  	return rest.reduce(
			(result, [op, right]) => new AST.BinOp(result, op, right),
			head
		)
	  }

primary
	= integer / "(" _ expr:arithmetic_expression _ ")" {return expr} 

integer
	= _ ("+" / "-")?[0-9]+ _
	  { 
	  	return new AST.Integer(parseInt(text(), 10)) 
	  }
addop
	=  ('+' / '-')

mulop
	= ('*' / '/')

_ 
	= [ \t\r\n]*


