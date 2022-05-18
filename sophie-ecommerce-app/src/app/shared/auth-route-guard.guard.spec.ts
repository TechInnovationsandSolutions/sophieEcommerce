import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { AuthRouteGuardGuard } from './auth-route-guard.guard';

describe('AuthRouteGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRouteGuardGuard]
    });
  });

  it('should ...', inject([AuthRouteGuardGuard], (guard: AuthRouteGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
