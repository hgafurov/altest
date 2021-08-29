import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IRndSavol, RndSavol } from "../savol/rnd-savol.model";
import { RndTest } from "./rnd-test.model";
import { ITest, Test } from "./test.model";

@Injectable({
    providedIn: 'root'
})
export class TestService {
    
    constructor(private http: HttpClient) {}

    getRndTest(id: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/api/v1/test/' + id.toString())
            .pipe(map((test: Test) => {
                let sc = test.savols?.length;
                let nsavs: IRndSavol[] = [];
                test.savols?.forEach(savol => {
                    let jav: string[] = [];
                    if (savol.tj) {jav.push(savol.tj)}
                    if (savol.j1) {jav.push(savol.j1)}
                    if (savol.j2) {jav.push(savol.j2)}
                    if (savol.j3) {jav.push(savol.j3)}
                    if (savol.j4) {jav.push(savol.j4)}
                    nsavs.push(new RndSavol(
                        savol.id, savol.savol, 0, jav, savol.fani, savol.razdel, savol.muallifi
                    )); 
                });
                return new RndTest(test.id, test.nomi, test.fani, test.razdel, nsavs!, test.muallifi);
            }));
    }

    getById(id: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/api/v1/test/' + id.toString());
    }

    getTestPage(pageNumber: number, size: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/api/v1/test/get-all', {
            params: new HttpParams()
                .set('page', pageNumber.toString())
                .set('size', size.toString())
        });
    }

    getTestPageByCrit(filterCurrentUserTest: boolean, filterNomi: string, filterFani:string, filterRazdel:string, pageNumber: number, size: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/api/v1/test/get-all-by-crit', {
            params: new HttpParams()
                .set('filterCurrentUserTest', filterCurrentUserTest ? "true" : "false")
                .set('filterNomi', filterNomi)
                .set('filterFani', filterFani)
                .set('filterRazdel', filterRazdel)
                .set('page', pageNumber.toString())
                .set('size', size.toString())
        });
    }

    save(test: ITest): Observable<any> {
        return this.http.post(environment.apiUrl + "/api/v1/test/save", test);
    }

    delete(id: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/api/v1/test/delete/' + id.toString());
    }
}