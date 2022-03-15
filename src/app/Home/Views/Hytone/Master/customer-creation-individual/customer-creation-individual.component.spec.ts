import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCreationIndividualComponent } from './customer-creation-individual.component';

describe('CustomerCreationIndividualComponent', () => {
  let component: CustomerCreationIndividualComponent;
  let fixture: ComponentFixture<CustomerCreationIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCreationIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCreationIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
