export default class Interpreter {
	constructor(target, printFunction){
		this.binding = new Map()
	}


	visit(ast) {
		return ast.accept(this)
	}

	visitStatementList(ast){
		let statements = ast.statements.accept(this)
		for(statement of statements){
			statement.accept(this)
		}
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
		this.setVariable(variable, expr)
		return expr
	}

	visitVariableName(ast){
		return ast.name
	}

	visitVariableValue(ast){
		return this.getVariable(ast.name)
	}

	setVariable(name, value){
		this.binding.set(name, value)
	}

	getVariable(name){
		this.binding.get(name)
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