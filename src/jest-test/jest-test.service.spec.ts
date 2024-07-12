import { Test, TestingModule } from '@nestjs/testing';
import { JestTestService } from './jest-test.service';

describe('JestTestService', () => {
  let service: JestTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JestTestService],
    }).compile();

    service = module.get<JestTestService>(JestTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
