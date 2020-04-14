export default class Interpreter {
	visit(ast) {
		return ast.accept(this)
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
		}
	}

	visitInteger(ast) {
		return ast.value
	}
}