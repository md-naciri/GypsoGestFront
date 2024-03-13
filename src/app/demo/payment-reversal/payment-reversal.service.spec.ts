import { TestBed } from '@angular/core/testing';

import { PaymentReversalService } from './payment-reversal.service';

describe('PaymentReversalService', () => {
  let service: PaymentReversalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentReversalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
