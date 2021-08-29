import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Test } from "src/app/core/test/test.model";
import { TestService } from "src/app/core/test/test.service";

export class TestDataSource implements DataSource<Test> {
    
    private testsSubject = new BehaviorSubject<Test[]>([]);
    private testsCountSubject = new BehaviorSubject<number>(0);

    public testsCount = this.testsCountSubject.asObservable();

    constructor(private testService: TestService) {}
    
    connect(): Observable<readonly Test[]> {
        return this.testsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.testsSubject.complete();
        this.testsCountSubject.complete();
    }

    loadTests(filterCurrentUserTest:boolean, 
              filterNomi: string, 
              filterFani: string, 
              filterRazdel: string, 
              pageNumber: number, 
              size: number) {
        
        // Shu joyda muammo bor !!!!!!!!!!!!!!
        this.testService.getTestPageByCrit(filterCurrentUserTest, filterNomi, filterFani, filterRazdel,pageNumber, size)
            .pipe(map((data: any) => {
                    this.testsCountSubject.next(data["totalElements"]);
                    return data["tests"];
                }))
            .pipe(catchError(() => of([])))
            .subscribe(tests => {
                this.testsSubject.next(tests);
            });
    }

    delete(id: number): Observable<any> {
        return this.testService.delete(id);
    }

}