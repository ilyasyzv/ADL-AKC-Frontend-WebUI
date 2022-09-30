import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SChartTabsComponent } from './s-chart-tabs.component';

describe('SChartTabsComponent', () => {
  let component: SChartTabsComponent;
  let fixture: ComponentFixture<SChartTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SChartTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SChartTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
