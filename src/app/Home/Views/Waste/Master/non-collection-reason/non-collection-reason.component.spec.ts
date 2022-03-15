import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonCollectionReasonComponent } from './non-collection-reason.component';

describe('NonCollectionReasonComponent', () => {
  let component: NonCollectionReasonComponent;
  let fixture: ComponentFixture<NonCollectionReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonCollectionReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonCollectionReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
