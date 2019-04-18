import { TestBed } from '@angular/core/testing';

import { PeerServiceService } from './peer-service.service';

describe('PeerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeerServiceService = TestBed.get(PeerServiceService);
    expect(service).toBeTruthy();
  });
});
