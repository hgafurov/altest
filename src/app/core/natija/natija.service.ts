import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { INatija } from "./natija.model";

@Injectable({
    providedIn: 'root'
})
export class NatijaService {

    constructor(private http: HttpClient) {}

    save(natija: INatija): Observable<any> {
        return this.http.post(environment.apiUrl + "/api/v1/natija/save", natija);
    }

    getAllByCrit(filterCurrentUserTest: boolean, pageNumber: number, size: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/api/v1/natija/get-all-by-crit',{
            params: new HttpParams()
                .set('filterCurrentUser', filterCurrentUserTest ? "true" : "false")
                .set('page', pageNumber.toString())
                .set('size', size.toString())
        })
    }
}