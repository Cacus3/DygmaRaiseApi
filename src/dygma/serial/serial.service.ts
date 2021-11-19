import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as SerialPort from 'serialport';
import { createInterface as createInterface } from 'readline';
import { Result } from './result';
import { APP_OPTIONS } from '../app.module';

export interface AppOptions {
	portName: string;
  }

@Injectable()
export class SerialService {
	port;
	actualLines: string[] = [];
	lastResult: Result = new Result(new Date(), []);

	constructor(@Inject(APP_OPTIONS) options: AppOptions) {
		console.log(options.portName)
		this.port = new SerialPort(options.portName, {
			baudRate: 115200,
		});

		const lineReader = createInterface({
			input: this.port,
		});

		lineReader.on('line', async (line) => {
			line = line.trim();
			this.actualLines.push(line);
			if (line === '.') {
				const data = this.actualLines.filter((s) => s !== '');
				data.pop();
				this.lastResult = new Result(new Date(), data);
				this.actualLines = [];
			}
		});
	}

	waitFor = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
	async getLastResult(oldValue): Promise<Result> {
		return new Promise(async (resolve, reject) => {
			while (oldValue === this.lastResult) {
				await this.waitFor(0.1);
			}
			resolve(this.lastResult);
		});
	}

	write(command: string) {
		this.port.write(command);
	}
}
