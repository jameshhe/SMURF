import * as AST from "./AST.js"


export default class Interpreter {
	constructor(target, printFunction){
		this.binding = new Binding()
	}


	visit(ast) {
		return ast.accept(this)
	}

	visitFunctionCall(ast){
		let thunk = ast.name.accept(this)
		// create new binding whose parent is thunk binding
		let funcBinding = thunk.binding.push()

		let argNames = thunk.formals
		let argVals = ast.args

		// verify the length of the arguments
		if(argNames.length != argVals.length){
			throw new Error(`Function requires ${argNames.length} arguments but ${argVals.length} passed in`)
		}

		// for each argument
		argNames.forEach((argName, index)=>{
			const argVal = argVals[index]
			funcBinding.declareVariable(argName.name, argVal.value)
		})
		
	}

	visitFunctionDefinition(ast) {
		return new AST.Thunk(ast.formals, ast.code, this.binding)
	}

	visitThunk(ast){
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
			else{
				return 0
			}
		}
	}

	visitDeclaration(ast){
		let variable = ast.variable.accept(this)
		let expr = ast.expr.accept(this)
		// if a variable already exists
		if(this.binding.hasVariable(variable)){
			throw new Error("Duplicate variable name not allowed!")
		}
		//console.log("In declaration", variable, expr)
		this.binding.declareVariable(variable, expr)
		return expr
	}

	visitAssignment(ast){
		let variable = ast.variable.accept(this)
		let expr = ast.expr.accept(this)
		//console.log("In assigning", variable, expr)
		this.binding.updateVariable(variable, expr)
		return expr
	}

	visitVariableName(ast){
		return ast.name
	}

	visitVariableValue(ast){
		// check if the value was defined first
		if(this.binding.hasVariable(ast.name)){
			return this.binding.getVariable(ast.name)
		}
		else{
			throw new Error(`Variable name ${ast.name} is not defined!`)
		}
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

class Binding{
	constructor(parent = null){
		this.binding = new Map()
		this.parent = parent
	}
	// return new binding whose parent is this binding
	push(){
		return new Binding(this)
	}
	//return parent of this binding
	pop(){
		return this.parent
	}
	// add or update this.binding with name/value
	declareVariable(name, value){
		this.binding.set(name, value)
	}
	// add or update this or parent bindings with name/value
	updateVariable(name, value){
		// find where the name is at in the binding
		// keep going up to the parents until the name has been found in a binding
		if(!this.binding.has(name)){
			if(this.parent == null){
				// if we've gone all the way up to the root and still haven't found the name
				throw new Error(`Variable name ${name} not found!`)
			}
			return this.parent.updateVariable(name, value)
		}
		// if we've found the name
		this.binding.set(name, value)
	}
	// if this binding has name, return value
	// otherwise, return parent.getVariable
	getVariable(name){
		// find where the name is at in the binding
		// keep going up to the parents until the name has been found in a binding
		if(!this.binding.has(name)){
			if(this.parent == null){
				// if we've gone all the way up to the root and still haven't found the name
				throw new Error(`Variable name ${name} not found!`)
			}
			return this.parent.getVariable(name)
		}
		// if we've found the name
		// return the value
		return this.binding.get(name)
	}
	//check the entire tree to see if a variable exists 
	hasVariable(name){
		if(!this.binding.has(name)){
			// if this binding doesn't have the variable and it's the root already
			// return false
			if(this.parent == null){
				return false
			}
			return this.parent.hasVariable(name)
		}
		// if this binding does have the variable, return true
		return true
	}
}