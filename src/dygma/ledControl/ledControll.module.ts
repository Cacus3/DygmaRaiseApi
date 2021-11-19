import { DynamicModule, Module } from '@nestjs/common';
import { APP_OPTIONS } from '../consts';
import { AppModuleOptions } from '../interfaces';
import { SerialModule } from '../serial/serial.module';
import { LedControllService } from './ledControll.service';

@Module({})
export class LedControllModule {
	static register(options: AppModuleOptions): DynamicModule {
		return {
		  module: LedControllModule,
		  providers: [
			{
			  provide: APP_OPTIONS,
			  useValue: options,
			},
			LedControllService,
		  ],
		  imports:[SerialModule.register(options)],
		  exports: [LedControllService],
		};
	  }
}
