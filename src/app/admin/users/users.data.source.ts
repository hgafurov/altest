import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { User } from "src/app/core/user/user.model";
import { UserService } from "src/app/core/user/user.service";

export class UsersDataSource implements DataSource<User> {
    
    private usersSubject = new BehaviorSubject<User[]>([]);
    private usersCountSubject = new BehaviorSubject<number>(0);

    public usersCount = this.usersCountSubject.asObservable();

    constructor(private userService: UserService) {}

    connect(collectionViewer: CollectionViewer): Observable<readonly User[]> {
        return this.usersSubject.asObservable();
    }
    
    disconnect(collectionViewer: CollectionViewer): void {
        this.usersSubject.complete();
        this.usersCountSubject.complete();
    }
    
    loadUsers(pageNumber: number, size: number) {

        this.userService.getUsersPage(pageNumber, size)
            .pipe(map((data: any) => {
                this.usersCountSubject.next(data["totalElements"]);
                return data["users"];
            })).pipe(
                catchError(() => of([])),
            ).subscribe(users => this.usersSubject.next(users));
    }

    deleteUser(id: number): Observable<any> {
        return this.userService.delete(id);
    }
}