import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterProductPricingPlanComponent } from './master-product-pricing-plan.component';

describe('MasterProductPricingPlanComponent', () => {
  let component: MasterProductPricingPlanComponent;
  let fixture: ComponentFixture<MasterProductPricingPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterProductPricingPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterProductPricingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
