import { HttpClient } from "@angular/common/http";
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
}