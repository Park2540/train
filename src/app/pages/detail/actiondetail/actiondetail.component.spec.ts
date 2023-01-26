import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiondetailComponent } from './actiondetail.component';

describe('ActiondetailComponent', () => {
  let component: ActiondetailComponent;
  let fixture: ComponentFixture<ActiondetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiondetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
