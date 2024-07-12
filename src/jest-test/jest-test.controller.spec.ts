import { Test, TestingModule } from '@nestjs/testing';
import { JestTestController } from './jest-test.controller';
import { JestTestService } from './jest-test.service';

describe('JestTestController', () => {
  let controller: JestTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JestTestController],
      providers: [JestTestService],
    }).compile();

    controller = module.get<JestTestController>(JestTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
