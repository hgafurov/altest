import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserStoreg } from 'src/app/services/user-storeg';
import { AuthService } from 'src/app/services/auth.service';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-alm-layout',
  templateUrl: './alm-layout.component.html',
  styleUrls: ['./alm-layout.component.scss']
})
export class AlmLayoutComponent implements OnInit {

  public user: UserStoreg = new UserStoreg;
  
  isAuth: boolean = false;
  isAdmin: boolean = false;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
 
  constructor(private observer: BreakpointObserver,
              private authService: AuthService,
              public dialog: MatDialog,
              private router: Router) {
    
    this.authService.user.subscribe(us => {
      this.user = us;
      this.isAuth = this.isAuthCalc();
      this.isAdmin = this.isAdminCalc();
    });
  }
  
  ngOnInit(): void {
    this.isAuth = this.isAuthCalc();
    this.isAdmin = this.isAdminCalc();
  }
  
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  logout() {
    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(result);
        this.authService.logout();
        this.router.navigate(["/"]);
      }
    });
    
  }

  closeSideNav() {
    if (this.sidenav.mode == 'over') {
      this.sidenav.close();
    }
  }

  isAuthCalc(): boolean { 
    return !!this.user.token;
  }
  
  isAdminCalc(): boolean { 
    return !!this.user.roles && (this.user.roles?.indexOf("ROLE_ADMIN") != -1)
  }
  
}
