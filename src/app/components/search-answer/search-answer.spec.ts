import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAnswer } from './search-answer';

describe('SearchAnswer', () => {
  let component: SearchAnswer;
  let fixture: ComponentFixture<SearchAnswer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAnswer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAnswer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
