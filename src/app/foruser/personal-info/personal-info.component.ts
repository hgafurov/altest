import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/user/user.model';
import { UserService } from 'src/app/core/user/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
  
  private drSubscrib: Subscription | undefined;
  private currUserName: string | undefined;
  public currentUser: User = new User();
  
  constructor(private authService: AuthService,
              private userService: UserService) {

    this.drSubscrib = this.authService.user.subscribe(us => {
      console.log("======PersonalInfo======= ");
      this.currUserName = us.username;
    });               
  }

  ngOnDestroy(): void {
    if (this.drSubscrib) {
      this.drSubscrib.unsubscribe();
    }
  }
  
  ngOnInit(): void {
    if (this.currUserName) {
      this.userService.getByLogin(this.currUserName).subscribe((user:User) => this.currentUser = user);               
    }
  }

  
}
