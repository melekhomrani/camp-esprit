import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRoomComponent } from './chatroom.component';

describe('ChartRoomComponent', () => {
  let component: ChartRoomComponent;
  let fixture: ComponentFixture<ChartroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartroomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
