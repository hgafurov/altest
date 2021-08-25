import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { User } from '../core/user/user.model';
import { ILogin } from '../interfaces/i.login';
import { IRegister } from '../interfaces/i.register';
import { UserStoreg } from './user-storeg';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<UserStoreg>;
  public user: Observable<UserStoreg>;
  public currentUser: User = new User(); 

  constructor(private http: HttpClient ) { 
    const userJson = localStorage.getItem('alcedo-token');   
    let user: any = null;
    if (userJson) {user = JSON.parse(!!userJson ? userJson : "")}
    if (!!user && (new Date()).getTime() < (JSON.parse(window.atob(user.token!.split('.')[1])).exp - 7200) * 1000) {
      this.userSubject = new BehaviorSubject<UserStoreg>(user);
    } else {
      localStorage.removeItem('alcedo-token');
      this.userSubject = new BehaviorSubject<UserStoreg>(new UserStoreg());
    }     
    this.user = this.userSubject.asObservable();
  } 

  public get userValue(): UserStoreg {
    return this.userSubject.value;
  }

  login(lp: ILogin):Observable<(UserStoreg)> {
    return this.http.post<UserStoreg>(environment.apiUrl + "/api/v1/auth/login", lp)
        .pipe(tap(user => {
            localStorage.setItem('alcedo-token', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
  }

  register(dtRegister: IRegister): Observable<UserStoreg> {
    return this.http.post<UserStoreg>(environment.apiUrl + "/api/v1/auth/register", dtRegister);
  }


  // isAuthenticated(): boolean {
  //   return !(this.token == "");
  // }
  
  // isRole(role: string): boolean {
  //   if (this.token) {
  //     let decodeJWT = JSON.parse(window.atob(this.token.split('.')[1]));
  //     return decodeJWT.roles.include(role);
  //   }
  //   return false;
    
  // }

   logout() {
    localStorage.removeItem('alcedo-token');
    this.userSubject.next(new UserStoreg());
   }

}
