import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog'
import { map, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';
import { UsersDataSource } from './users.data.source';
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'login', 'ismi', 'familiya', 'otaIsmi', 'email', 'roles', 'action'];
  dataSource!: UsersDataSource;

  @ViewChild(MatPaginator) 
  paginator: MatPaginator | undefined;
  
  constructor(public dialog: MatDialog,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.userService);
    this.dataSource.loadUsers(0,5);
  }

  ngAfterViewInit(): void {
    this.paginator?.page.pipe(
      map(() => this.loadUserPage())
    ).subscribe();
  }

  loadUserPage() {
    this.dataSource.loadUsers(this.paginator?.pageIndex!, this.paginator?.pageSize!)
  }

  openDelDialog(id: number): void {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(result);
        this.dataSource.deleteUser(id).subscribe(() => this.loadUserPage());
      }
    });
  }

  openEditDialog(id: number): void {
    // const dialogRef = this.dialog.open(UserEditComponent, {data: {userId: id}});

    // dialogRef.afterClosed().subscribe(result => {
    //   if(result) {
    //     console.log(result);
    //     this.loadUserPage();
    //   }
    // });
    console.log(id);
    this.router.navigate(["admin/user/" + id]);

  }
}
