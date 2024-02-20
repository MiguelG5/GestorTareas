import { TestBed } from '@angular/core/testing';

import { TareaFactoryService } from './tarea-factory.service';

describe('TareaFactoryService', () => {
  let service: TareaFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
