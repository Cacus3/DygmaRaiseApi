export class LedMap{
	name: string;
	ledIds: number[];

	constructor(name: string, ledIds: number[]){
		this.name = name;
		this.ledIds = ledIds;
	}
}
