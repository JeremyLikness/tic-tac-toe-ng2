import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { MatrixService } from './matrix.service';

describe('Matrix Service', () => {
  beforeEachProviders(() => [MatrixService]);

  it('should ...',
      inject([MatrixService], (service: MatrixService) => {
    expect(service).toBeTruthy();
  }));
});
