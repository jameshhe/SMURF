{
	const AST = options.AST 
}

term = digits:[0-9]+{return new AST.Integer(parseInt(digits.join(""), 10))}

