import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAttendanceComponent } from './pending-attendance.component';

describe('PendingAttendanceComponent', () => {
  let component: PendingAttendanceComponent;
  let fixture: ComponentFixture<PendingAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
