export default class Interpreter{
	visit(node){
		return node.accept(this)
	}
}

visitInteger(node){
	return node.value
}