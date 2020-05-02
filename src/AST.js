function makeNode(name, ...attributes) {
	const constructor = function (...args) {
		attributes.forEach((att, i) => {
			this[att] = args[i]
		})
		
		this.accept = (visitor) => visitor["visit" + name](this)
	}
	
	Object.defineProperty(constructor, "name", {value: name})
	
	return constructor
}

export const Print = makeNode("Print", "code")
export const FunctionCall = makeNode("FunctionCall", "name", "args") 
export const FunctionDefinition = makeNode("FunctionDefinition", "formals", "code")
export const Thunk = makeNode("Thunk", "formals", "code", "binding")
export const StatementList = makeNode("StatementList", "statements")
export const Assignment = makeNode("Assignment", "variable", "expr")
export const Declaration = makeNode("Declaration", "variable", "expr")
export const IfStatement = makeNode("IfStatement", "predicate", "thenCode", "elseCode")
export const VariableValue = makeNode("VariableValue", "name")
export const VariableName = makeNode("VariableName", "name")
export const BinOp = makeNode("BinOp", "left", "op", "right")
export const Integer = makeNode("Integer", "value")



