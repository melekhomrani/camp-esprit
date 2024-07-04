import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountVerifiedEmailsComponent } from './count-verified-emails.component';

describe('CountVerifiedEmailsComponent', () => {
  let component: CountVerifiedEmailsComponent;
  let fixture: ComponentFixture<CountVerifiedEmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountVerifiedEmailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountVerifiedEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
