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
})
export class AppModule {
	static register(options: AppModuleOptions): DynamicModule {
		return {
		  module: AppModule,
		  providers: [
			{
			  provide: APP_OPTIONS,
			  useValue: options,
			},
		  ],
		};
	  }
}
