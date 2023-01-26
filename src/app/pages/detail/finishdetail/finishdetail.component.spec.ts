import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishdetailComponent } from './finishdetail.component';

describe('FinishdetailComponent', () => {
  let component: FinishdetailComponent;
  let fixture: ComponentFixture<FinishdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
