import { TestBed } from '@angular/core/testing';

import { ChaincodeService } from './chaincode.service';

describe('ChaincodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChaincodeService = TestBed.get(ChaincodeService);
    expect(service).toBeTruthy();
  });
});
