import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDocMasterComponent } from './company-doc-master.component';

describe('CompanyDocMasterComponent', () => {
  let component: CompanyDocMasterComponent;
  let fixture: ComponentFixture<CompanyDocMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDocMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDocMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
