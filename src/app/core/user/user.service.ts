import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IUser } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    constructor(private http: HttpClient) {}
    
    getById(id: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/api/v1/auth/user/' + id.toString());
    }
    
    getByLogin(login: string): Observable<any> {
        return this.http.get(environment.apiUrl + '/api/v1/auth/get-user-by-login/' + login);
    }
    
    getUsersPage(pageNumber: number, size: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/api/v1/auth/users', {
            params: new HttpParams()
                .set('page', pageNumber.toString())
                .set('size', size.toString())
        });
    }

    save(user: IUser): Observable<any> {
        return this.http.post(environment.apiUrl + "/api/v1/auth/user/save", user);
    }

    delete(id: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/api/v1/auth/user/delete-by-id/' + id.toString());
    }
    
    
} 