import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCustomerTypeComponent } from './master-customer-type.component';

describe('MasterCustomerTypeComponent', () => {
  let component: MasterCustomerTypeComponent;
  let fixture: ComponentFixture<MasterCustomerTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterCustomerTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCustomerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
