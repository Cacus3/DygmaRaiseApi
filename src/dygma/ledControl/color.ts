export class Color {
	red: number;
	green: number;
	blue: number;
	//prettier-ignore
	constructor({ red, green, blue }: { red: number; green: number; blue: number; }) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

	isDark() {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		const yiq =
			(this.red * 299 + this.green * 587 + this.blue * 114) / 1000;
		return yiq < 128;
	}

	isLight() {
		return !this.isDark();
	}

	negate() {
		const red = 255 - this.red;
		const green = 255 - this.green;
		const blue = 255 - this.blue;

		return new Color({ red, green, blue });
	}
}
