import { DynamicModule, Module } from '@nestjs/common';
import { AppModuleOptions } from '../interfaces'
import { APP_OPTIONS } from '../consts';
import { SerialService } from './serial.service';




@Module({})
export class SerialModule {
	static register(options: AppModuleOptions): DynamicModule {
		return {
		  module: SerialModule,
		  providers: [
			{
			  provide: APP_OPTIONS,
			  useValue: options,
			},
			SerialService,
		  ],
		  exports: [SerialService],
		};
	  }
}
