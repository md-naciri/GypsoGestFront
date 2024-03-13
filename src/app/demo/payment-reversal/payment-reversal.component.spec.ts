import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReversalComponent } from './payment-reversal.component';

describe('PaymentReversalComponent', () => {
  let component: PaymentReversalComponent;
  let fixture: ComponentFixture<PaymentReversalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentReversalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentReversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
