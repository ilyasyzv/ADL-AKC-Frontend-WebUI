import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APageTitleComponent } from './a-page-title.component';

describe('APageTitleComponent', () => {
  let component: APageTitleComponent;
  let fixture: ComponentFixture<APageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ APageTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(APageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
