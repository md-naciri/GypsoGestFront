import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDebitComponent } from './client-debit.component';

describe('ClientDebitComponent', () => {
  let component: ClientDebitComponent;
  let fixture: ComponentFixture<ClientDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDebitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
