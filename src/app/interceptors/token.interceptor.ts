import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthService } from '../services/auth.service';
import { environment } from "src/environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const user = this.authService.userValue;
        const isAuth = user && user.token; 
        const isApiUrl = req.url.startsWith(environment.apiUrl);
        if (isAuth && isApiUrl) (
            req = req.clone( {
                setHeaders: {
                    Authorization: 'Bearer ' + user.token
                }
            })
        )
        return next.handle(req);
    }
    
}