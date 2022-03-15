import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPoliceStationComponent } from './master-police-station.component';

describe('MasterPoliceStationComponent', () => {
  let component: MasterPoliceStationComponent;
  let fixture: ComponentFixture<MasterPoliceStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterPoliceStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPoliceStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
