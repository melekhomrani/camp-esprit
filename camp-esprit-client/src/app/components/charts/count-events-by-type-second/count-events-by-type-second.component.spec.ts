import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountEventsByTypeSecondComponent } from './count-events-by-type-second.component';

describe('CountEventsByTypeSecondComponent', () => {
  let component: CountEventsByTypeSecondComponent;
  let fixture: ComponentFixture<CountEventsByTypeSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountEventsByTypeSecondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountEventsByTypeSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
