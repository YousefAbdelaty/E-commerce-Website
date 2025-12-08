import { TestBed } from '@angular/core/testing';

import { ProductsSharingServiceService } from './products.sharing.service.service';

describe('ProductsSharingServiceService', () => {
  let service: ProductsSharingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsSharingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
