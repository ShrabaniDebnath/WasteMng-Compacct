import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAssetComponent } from './master-asset.component';

describe('MasterAssetComponent', () => {
  let component: MasterAssetComponent;
  let fixture: ComponentFixture<MasterAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
