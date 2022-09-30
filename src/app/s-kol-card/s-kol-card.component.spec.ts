import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SKolCardComponent } from './s-kol-card.component';

describe('SKolCardComponent', () => {
  let component: SKolCardComponent;
  let fixture: ComponentFixture<SKolCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SKolCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SKolCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'highlight-text'`, () => {
    const fixture = TestBed.createComponent(SKolCardComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('highlight-text');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(SKolCardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('highlight-text app is running!');
  });
});
