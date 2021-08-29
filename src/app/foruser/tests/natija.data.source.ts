import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of, pipe } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Natija } from "src/app/core/natija/natija.model";
import { NatijaService } from "src/app/core/natija/natija.service";

export class NatijaDataSource implements DataSource<Natija> {
    
    private natijaSubject = new BehaviorSubject<Natija []>([]);
    private natijaCountSubject = new BehaviorSubject<number>(0);
    public natijaCount = this.natijaCountSubject.asObservable();

    constructor(private natijaService: NatijaService) {}
    
    connect(): Observable<readonly Natija[]> {
        return this.natijaSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.natijaCountSubject.complete();
        this.natijaSubject.complete();
    }

    loadNatija(filterCurrentUser:boolean, 
               pageNumber: number, 
               size: number) {
        this.natijaService.getAllByCrit(filterCurrentUser, pageNumber, size)
            .pipe(map((data: any) => {
                this.natijaCountSubject.next(data["totalElements"]);
                return data["natija"];
            }))
            .pipe(catchError(() => of([])))
            .subscribe((natija) => {
                this.natijaSubject.next(natija)
            });
    }
    
}