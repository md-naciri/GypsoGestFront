import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpaymentReversalComponent } from './addpayment-reversal.component';

describe('AddpaymentReversalComponent', () => {
  let component: AddpaymentReversalComponent;
  let fixture: ComponentFixture<AddpaymentReversalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddpaymentReversalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddpaymentReversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
