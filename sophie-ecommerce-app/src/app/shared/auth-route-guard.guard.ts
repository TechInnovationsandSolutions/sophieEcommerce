import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRouteGuardGuard implements CanActivate {
  constructor(private serv: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const redirectUrl = next._routerState.url;

    // return this.serv.isAuthenticated().then(res=> {
    if (this.serv.isAuthenticated()) {
        return true;
      }

    this.router.navigateByUrl(
        this.router.createUrlTree(
          ['/user/login'], {
            queryParams: {
              redirectUrl
            }
          }
        )
      );

    return false;
    // })

  }

}
