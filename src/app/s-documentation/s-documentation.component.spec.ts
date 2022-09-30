import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SDocumentationComponent } from './s-documentation.component';

describe('SDocumentationComponent', () => {
  let component: SDocumentationComponent;
  let fixture: ComponentFixture<SDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SDocumentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
