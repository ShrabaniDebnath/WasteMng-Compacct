import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterIfscComponent } from './master-ifsc.component';

describe('MasterIfscComponent', () => {
  let component: MasterIfscComponent;
  let fixture: ComponentFixture<MasterIfscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterIfscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterIfscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
