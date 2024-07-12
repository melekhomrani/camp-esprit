import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampingStatsComponent } from './camping-stats.component';

describe('CampingStatsComponent', () => {
  let component: CampingStatsComponent;
  let fixture: ComponentFixture<CampingStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampingStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
