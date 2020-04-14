export class BinOp{
	constructor(l, op, r){
		this.left = l
		this.op = op
		this.right = r
	}

	accept(visitor){
		return visitor.visitBinOp(this)
	}
}

export class Integer{
	constructor(value){
		this.value = value
	}
	accept(visitor){
		return visitor.visitInteger(this)
	}
}
