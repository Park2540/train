import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BuilderComponent } from './builder.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        BuilderComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BuilderComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'aform2'`, () => {
    const fixture = TestBed.createComponent(BuilderComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('aform2');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(BuilderComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('aform2 app is running!');
  });
});