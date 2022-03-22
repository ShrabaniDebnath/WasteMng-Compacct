import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPostOfficeComponent } from './master-post-office.component';

describe('MasterPostOfficeComponent', () => {
  let component: MasterPostOfficeComponent;
  let fixture: ComponentFixture<MasterPostOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterPostOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPostOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
