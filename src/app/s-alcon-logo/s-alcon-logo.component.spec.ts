import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SAlconLogoComponent } from './s-alcon-logo.component';

describe('SAlconLogoComponent', () => {
  let component: SAlconLogoComponent;
  let fixture: ComponentFixture<SAlconLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SAlconLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SAlconLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
