import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
    
    constructor(private authService: AuthService,
                private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        const roles = route.data['roles'];
        let result = false;
        if (this.authService.userValue.token) {
            roles.forEach((role: string) => {
                if (this.authService.userValue.roles?.indexOf(role) != -1) {
                    result = true;
                }
            });
            return of(result);
        }
        this.router.navigate(["/"], {
            queryParams: {
                accessDenied: true
            }
        });
        return of(false);    
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }
}