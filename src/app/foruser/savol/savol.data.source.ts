import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Savol } from "src/app/core/savol/savol.model";
import { SavolService } from "src/app/core/savol/savol.service";

export class SavolDataSource implements DataSource<Savol> {
    
    private savolsSubject = new BehaviorSubject<Savol[]>([]);
    private savolsCountSubject = new BehaviorSubject<number>(0);

    public savolsCount = this.savolsCountSubject.asObservable();

    constructor(private savolService: SavolService) {}

    connect(): Observable<readonly Savol[]> {
        return this.savolsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.savolsSubject.complete();
        this.savolsCountSubject.complete();
    }

    loadSavols(filterCurrentUserSavols:boolean, filterFani: string, filterRazdel: string, pageNumber: number, size: number) {
        // Shu joyda muammo !!!!!!!!!!!!!!
        // subscribe dan to'g'ri foydalanish kerak 
        this.savolService.getSavolPageByCrit(filterCurrentUserSavols, filterFani, filterRazdel,pageNumber, size)
            .pipe(map((data: any) => {
                    this.savolsCountSubject.next(data["totalElements"]);
                    return data["savols"];
                }))
            .pipe(catchError(() => of([])))
            .subscribe((savols: Savol[]) => {
                this.savolsSubject.next(savols);
            });
    }

    deleteSavol(id: number): Observable<any> {
        return this.savolService.delete(id);
    }
    
}