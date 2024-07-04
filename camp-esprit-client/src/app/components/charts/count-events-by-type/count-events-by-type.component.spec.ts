import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountEventsByTypeComponent } from './count-events-by-type.component';

describe('CountEventsByTypeComponent', () => {
  let component: CountEventsByTypeComponent;
  let fixture: ComponentFixture<CountEventsByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountEventsByTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountEventsByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
