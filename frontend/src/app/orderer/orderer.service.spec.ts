import { TestBed } from '@angular/core/testing';

import { OrdererService } from './orderer.service';

describe('OrdererService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdererService = TestBed.get(OrdererService);
    expect(service).toBeTruthy();
  });
});
