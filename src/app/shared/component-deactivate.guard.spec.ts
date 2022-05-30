import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { ComponentDeactivateGuard } from './component-deactivate.guard';

describe('ComponentDeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentDeactivateGuard]
    });
  });

  it('should ...', inject([ComponentDeactivateGuard], (guard: ComponentDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
