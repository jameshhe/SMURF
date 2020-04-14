export class Integer{
	constructor(value){
		this.value = value
	}
	accept(visitor){
		return visitor.visitInteger(this)
	}
}