import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterOccupationComponent } from './master-occupation.component';

describe('MasterOccupationComponent', () => {
  let component: MasterOccupationComponent;
  let fixture: ComponentFixture<MasterOccupationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterOccupationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterOccupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
