import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnhealthyWordComponent } from './add-unhealthy-word.component';

describe('AddUnhealthyWordComponent', () => {
  let component: AddUnhealthyWordComponent;
  let fixture: ComponentFixture<AddUnhealthyWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUnhealthyWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUnhealthyWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
