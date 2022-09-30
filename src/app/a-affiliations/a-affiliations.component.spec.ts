import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AAffiliationsComponent } from './a-affiliations.component';

describe('AAffiliationsComponent', () => {
  let component: AAffiliationsComponent;
  let fixture: ComponentFixture<AAffiliationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AAffiliationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AAffiliationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
