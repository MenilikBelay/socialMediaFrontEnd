import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnhealthyWordComponent } from './unhealthy-word.component';

describe('UnhealthyWordComponent', () => {
  let component: UnhealthyWordComponent;
  let fixture: ComponentFixture<UnhealthyWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnhealthyWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnhealthyWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
