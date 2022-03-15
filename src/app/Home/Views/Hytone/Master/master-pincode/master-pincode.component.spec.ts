import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPincodeComponent } from './master-pincode.component';

describe('MasterPincodeComponent', () => {
  let component: MasterPincodeComponent;
  let fixture: ComponentFixture<MasterPincodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterPincodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
