import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPriceAdjustorPanelComponent } from './admin-price-adjustor-panel.component';

describe('AdminPriceAdjustorPanelComponent', () => {
  let component: AdminPriceAdjustorPanelComponent;
  let fixture: ComponentFixture<AdminPriceAdjustorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPriceAdjustorPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPriceAdjustorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
