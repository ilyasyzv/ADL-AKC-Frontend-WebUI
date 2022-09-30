import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AMapLocationComponent } from './a-map-location.component';

describe('AMapLocationComponent', () => {
  let component: AMapLocationComponent;
  let fixture: ComponentFixture<AMapLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AMapLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AMapLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
