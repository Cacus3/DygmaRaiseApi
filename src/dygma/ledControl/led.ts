import { Color } from './color';

export class Led {
	id: number;
	color: Color;

	constructor(id: number, c: string[]) {
		this.id = id;
		this.color = new Color({
			red: +c[0],
			green: +c[1],
			blue: +c[2],
		});
	}
}
