import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SActivityComponent } from './s-activity.component';

describe('SActivityComponent', () => {
  let component: SActivityComponent;
  let fixture: ComponentFixture<SActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
