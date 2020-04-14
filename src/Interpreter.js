export default class Interpreter {
	visit(ast) {
		return ast.accept(this)
	}


	visitInteger(node) {
		return node.value
	}
}