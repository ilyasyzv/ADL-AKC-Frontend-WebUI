import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SRecentHistoryComponent } from './s-recent-history.component';

describe('SRecentHistoryComponent', () => {
  let component: SRecentHistoryComponent;
  let fixture: ComponentFixture<SRecentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SRecentHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SRecentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
