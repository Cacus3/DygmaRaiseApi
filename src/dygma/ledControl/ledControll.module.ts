import { Module } from '@nestjs/common';
import { SerialModule } from '../serial/serial.module';
import { LedControllService } from './ledControll.service';

@Module({
	imports: [SerialModule.register({portName:'COM3'})],
	controllers: [],
	providers: [LedControllService],
})
export class LedControllModule {}
