import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ISavol } from "./savol.model";

@Injectable({
    providedIn: 'root'
})
export class SavolService {
    
    constructor(private http: HttpClient) {}
    
    getByArray(ids: number[]): Observable<any> {
        return this.http.post(environment.apiUrl + '/api/v1/savol/get-by-array', ids);
    }

    getById(id: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/api/v1/savol/' + id.toString());
    }
    
    getSavolPage(pageNumber: number, size: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/api/v1/savol/get-all', {
            params: new HttpParams()
                .set('page', pageNumber.toString())
                .set('size', size.toString())
        });
    }

    getSavolPageByCrit(filterCurrentUserSavols: boolean, filterFani:string, filterRazdel:string, pageNumber: number, size: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/api/v1/savol/get-all-by-crit', {
            params: new HttpParams()
                .set('filterCurrentUserSavols', filterCurrentUserSavols ? "true" : "false")
                .set('filterFani', filterFani)
                .set('filterRazdel', filterRazdel)
                .set('page', pageNumber.toString())
                .set('size', size.toString())
        });
    }

    save(savol: ISavol): Observable<any> {
        return this.http.post(environment.apiUrl + "/api/v1/savol/save", savol);
    }

    delete(id: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/api/v1/savol/delete/' + id.toString());
    }
    
    
} 