import { Injectable } from '@nestjs/common';
import { SerialService } from '../serial/serial.service';

import { Color } from './color';
import { Led } from './led';
import { LedMap } from './ledMap';

@Injectable()
export class LedControllService {
	LedMaps: LedMap[] = [];
	constructor(private serialService: SerialService) {
		const backlight = [];
		for (let i = 69; i <= 130; i++) {
			backlight.push(i);
		}
		this.LedMaps.push(new LedMap('backlight', backlight));
		this.LedMaps.push(new LedMap('neuron', [131]));
	}

	setLeds(color: Color, ledIDs: number[]) {
		// prettier-ignore
		const command = `led.setMultiple ${color.red} ${color.green} ${color.blue} ${ledIDs.join(' ')}\n`;
		this.serialService.write(command);
	}

	setLed(color: Color, ledID: number) {
		// prettier-ignore
		const command = `led.at ${ledID} ${color.red} ${color.green} ${color.blue}\n`;
		this.serialService.write(command);
	}

	async getLeds(ledIDs: number[]): Promise<Led[]> {
		const rtn: Led[] = [];
		// prettier-ignore
		const lastResult = this.serialService.lastResult;
		const command = `led.getMultiple ${ledIDs.join(' ')}\n`;
		await this.serialService.write(command);
		const r = await this.serialService.getLastResult(lastResult);
		for (const led of r.data) {
			if (led.includes('#')) {
				const split = led.split(' # ');
				const c = split[1].split(' ');
				rtn.push(new Led(+split[0], c));
			}
		}
		return rtn;
	}

	getLedMap(name: string): LedMap {
		return this.LedMaps.filter(
			(ledMap) => ledMap.name === name.toLocaleLowerCase(),
		)[0];
	}
}
