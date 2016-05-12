import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { StrategyService } from './strategy.service';

describe('Strategy Service', () => {
  beforeEachProviders(() => [StrategyService]);

  it('should ...',
      inject([StrategyService], (service: StrategyService) => {
    expect(service).toBeTruthy();
  }));
});
