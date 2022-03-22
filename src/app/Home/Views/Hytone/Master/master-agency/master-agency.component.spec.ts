import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAgencyComponent } from './master-agency.component';

describe('MasterAgencyComponent', () => {
  let component: MasterAgencyComponent;
  let fixture: ComponentFixture<MasterAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterAgencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
