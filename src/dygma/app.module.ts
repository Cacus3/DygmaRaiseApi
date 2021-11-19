import { DynamicModule, Module } from '@nestjs/common';
import { APP_OPTIONS } from './consts';
import { AppModuleOptions } from './interfaces';
import { LedControllModule } from './ledControl/ledControll.module';
import { SerialModule } from './serial/serial.module';
  
@Module({})
export class DygmaModule {
	static register(options: AppModuleOptions): DynamicModule {
		return {
		  module: DygmaModule,
		  providers: [
			{
			  provide: APP_OPTIONS,
			  useValue: options,
			},
		  ],
		  imports:[
			  LedControllModule.register(options),
			  SerialModule.register(options),
		  ]
		};
	  }
}
