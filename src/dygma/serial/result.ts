export class Result {
	data: string[];
	date: Date;

	constructor(date: Date, data: string[]) {
		this.date = date;
		this.data = data;
	}
}
