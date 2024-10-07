import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRouteImgComponent } from './search-route-img.component';

describe('SearchRouteImgComponent', () => {
  let component: SearchRouteImgComponent;
  let fixture: ComponentFixture<SearchRouteImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchRouteImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchRouteImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
