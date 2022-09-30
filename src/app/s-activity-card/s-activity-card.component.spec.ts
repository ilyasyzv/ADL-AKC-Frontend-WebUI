import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SActivityCardComponent } from './s-activity-card.component';

describe('SActivityCardComponent', () => {
  let component: SActivityCardComponent;
  let fixture: ComponentFixture<SActivityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SActivityCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SActivityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
