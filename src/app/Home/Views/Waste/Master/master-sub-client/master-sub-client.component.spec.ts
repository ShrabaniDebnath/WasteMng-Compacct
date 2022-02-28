import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSubClientComponent } from './master-sub-client.component';

describe('MasterSubClientComponent', () => {
  let component: MasterSubClientComponent;
  let fixture: ComponentFixture<MasterSubClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterSubClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSubClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
