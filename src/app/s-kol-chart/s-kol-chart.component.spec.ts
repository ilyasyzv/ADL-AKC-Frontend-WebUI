import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SKolChartComponent } from './s-kol-chart.component';

describe('SKolChartComponent', () => {
  let component: SKolChartComponent;
  let fixture: ComponentFixture<SKolChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SKolChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SKolChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
