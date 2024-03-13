import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSoldComponent } from './client-sold.component';

describe('ClientSoldComponent', () => {
  let component: ClientSoldComponent;
  let fixture: ComponentFixture<ClientSoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSoldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientSoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
