import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SLoginComponent } from './s-login.component';

describe('SLoginComponent', () => {
  let component: SLoginComponent;
  let fixture: ComponentFixture<SLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
