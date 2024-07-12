import { Controller } from '@nestjs/common';
import { JestTestService } from './jest-test.service';

@Controller('jest-test')
export class JestTestController {
  constructor(private readonly jestTestService: JestTestService) {}
}
