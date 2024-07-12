import { Module } from '@nestjs/common';
import { JestTestService } from './jest-test.service';
import { JestTestController } from './jest-test.controller';

@Module({
  controllers: [JestTestController],
  providers: [JestTestService],
})
export class JestTestModule {}
