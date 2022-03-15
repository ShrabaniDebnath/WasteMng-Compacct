import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetalisComponent } from './request-detalis.component';

describe('RequestDetalisComponent', () => {
  let component: RequestDetalisComponent;
  let fixture: ComponentFixture<RequestDetalisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDetalisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
