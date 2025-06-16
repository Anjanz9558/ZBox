import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceConsolidationComponent } from './attendance-consolidation.component';

describe('AttendanceConsolidationComponent', () => {
  let component: AttendanceConsolidationComponent;
  let fixture: ComponentFixture<AttendanceConsolidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceConsolidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceConsolidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
