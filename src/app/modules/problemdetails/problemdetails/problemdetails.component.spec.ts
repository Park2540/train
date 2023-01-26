import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemdetailsComponent } from './problemdetails.component';

describe('ProblemdetailsComponent', () => {
  let component: ProblemdetailsComponent;
  let fixture: ComponentFixture<ProblemdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
