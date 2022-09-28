import { TestBed } from '@angular/core/testing';

import { ProductItemDetailService } from './product-item-detail.service';

describe('ProductItemDetailService', () => {
  let service: ProductItemDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductItemDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
