import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountCredsByTypeComponent } from './count-creds-by-type.component';

describe('CountCredsByTypeComponent', () => {
  let component: CountCredsByTypeComponent;
  let fixture: ComponentFixture<CountCredsByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountCredsByTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountCredsByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
