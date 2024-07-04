import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountEventsByUseridComponent } from './count-events-by-userid.component';

describe('CountEventsByUseridComponent', () => {
  let component: CountEventsByUseridComponent;
  let fixture: ComponentFixture<CountEventsByUseridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountEventsByUseridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountEventsByUseridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
