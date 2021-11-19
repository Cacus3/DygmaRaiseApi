import { Module } from '@nestjs/common';
import { SerialModule } from '../serial/serial.module';
import { LedControllService } from './ledControll.service';

@Module({
	imports: [SerialModule],
	controllers: [],
	providers: [LedControllService],
})
export class LedControllModule {}
