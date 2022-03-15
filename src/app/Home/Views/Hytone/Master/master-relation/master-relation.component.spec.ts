import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRelationComponent } from './master-relation.component';

describe('MasterRelationComponent', () => {
  let component: MasterRelationComponent;
  let fixture: ComponentFixture<MasterRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterRelationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
