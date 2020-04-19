import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnhealthyWordsListComponent } from './unhealthy-words-list.component';

describe('UnhealthyWordsListComponent', () => {
  let component: UnhealthyWordsListComponent;
  let fixture: ComponentFixture<UnhealthyWordsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnhealthyWordsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnhealthyWordsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
