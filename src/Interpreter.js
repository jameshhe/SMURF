

export default class Interpreter {
	constructor(target, printFunction){
		this.binding = new Map()
	}


	visit(ast) {
		return ast.accept(this)
	}

	visitFunctionCall(ast){
		let bodyAst = ast.name.accept(this)
		if(ast.args != null){
			let argsToPass = ast.args.accept(this)
		}
		return bodyAst.accept(this)
	}

	visitFunctionDefinition(ast) {
		return ast.code 
	}

	visitStatementList(ast){
		let statements = ast.statements
		let result
		for(let statement of statements){
			result = statement.accept(this)
		}
		return result
	}

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


	visitAssignment(ast){
		let variable = ast.variable.accept(this)
		let expr = ast.expr.accept(this)
		this.setVariable(variable[0], expr)
		return expr
	}

	visitVariableName(ast){
		return ast.name
	}

	visitVariableValue(ast){
		return this.binding.get(ast.name[0])
	}

	setVariable(name, value){
		this.binding.set(name, value)
	}


	visitBinOp(ast){
		let left = ast.left.accept(this)
		let right = ast.right.accept(this)
		switch(ast.op){
			case "+":
				return left + right
			case "-":
				return left - right
			case "*":
				return left * right
			case "/":
				return Math.round(left / right)
			case "==":
				return left == right ? 1 : 0
			case "!=":
				return left != right ? 1 : 0
			case ">=":
				return left >= right ? 1 : 0
			case ">":
				return left > right ? 1 : 0
			case "<=":
				return left <= right ? 1 : 0
			case "<":
				return left < right ? 1 : 0
		}
	}

	visitInteger(ast) {
		return ast.value
	}
}