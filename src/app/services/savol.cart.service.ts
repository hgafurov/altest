import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SavolCartService {
    private savolIds: number[] = [];
    private savolCountSubject = new BehaviorSubject<number>(0);
    
    public savolCount = this.savolCountSubject.asObservable();

    public addSavolId(id: number): boolean {
        if (!this.savolIds.find(xid => xid == id)){
            this.savolIds.push(id);
            this.savolCountSubject.next(this.savolIds.length);
            return true;
        }
        return false;    
    }

    public getSavolIds(): number[] {
        return this.savolIds;
    }

    public deleteId(id: number) {
        const index = this.savolIds.indexOf(id);
        if (index > -1) {
            this.savolIds.splice(index, 1);
        }
        this.savolCountSubject.next(this.savolIds.length);
    }

    public clearSavolIds(): any {
        this.savolIds = [];
        this.savolCountSubject.next(this.savolIds.length);
        return this.savolIds;
    }
}