{
	const AST = options.AST
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
	=  integer / "(" expr:arithmetic_expression ")" {return expr} 

integer
	= (_) ("+" / "-")?[0-9]+ (_)
	  { 
	  	return new AST.Integer(parseInt(text(), 10)) 
	  }
addop
	=  ('+' / '-')

mulop
	= ('*' / '/')

_ 
	= [ \t\r\n]*


