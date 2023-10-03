import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipPdfComponent } from './payslip-pdf.component';

describe('PayslipPdfComponent', () => {
  let component: PayslipPdfComponent;
  let fixture: ComponentFixture<PayslipPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayslipPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayslipPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
