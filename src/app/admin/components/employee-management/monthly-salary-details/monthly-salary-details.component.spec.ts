import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySalaryDetailsComponent } from './monthly-salary-details.component';

describe('MonthlySalaryDetailsComponent', () => {
  let component: MonthlySalaryDetailsComponent;
  let fixture: ComponentFixture<MonthlySalaryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlySalaryDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlySalaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
