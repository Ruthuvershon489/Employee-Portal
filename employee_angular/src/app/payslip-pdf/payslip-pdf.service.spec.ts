import { TestBed } from '@angular/core/testing';

import { PayslipPdfService } from './payslip-pdf.service';

describe('PayslipPdfService', () => {
  let service: PayslipPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayslipPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
