import { TestBed, inject } from '@angular/core/testing';

import { EnquireUniportService } from './enquire-uniport.service';

describe('EnquireUniportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnquireUniportService]
    });
  });

  it('should be created', inject([EnquireUniportService], (service: EnquireUniportService) => {
    expect(service).toBeTruthy();
  }));
});
