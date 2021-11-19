import { DynamicModule, Module } from '@nestjs/common';
import { LedControllModule } from './ledControl/ledControll.module';
import { SerialModule } from './serial/serial.module';

export interface AppModuleOptions {
	portName: string;
  }

export const APP_OPTIONS = 'APP_OPTIONS';

@Module({
	imports: [
		SerialModule,
		LedControllModule,
	],
	providers: [],
	exports:[SerialModule,LedControllModule]
})
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
		};
	  }
}
