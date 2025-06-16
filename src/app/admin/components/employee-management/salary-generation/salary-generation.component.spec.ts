import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryGenerationComponent } from './salary-generation.component';

describe('SalaryGenerationComponent', () => {
  let component: SalaryGenerationComponent;
  let fixture: ComponentFixture<SalaryGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryGenerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
