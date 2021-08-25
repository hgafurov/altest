import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/user/user.model';
import { UserService } from 'src/app/core/user/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-personal-info-edit',
  templateUrl: './personal-info-edit.component.html',
  styleUrls: ['./personal-info-edit.component.scss']
})
export class PersonalInfoEditComponent implements OnInit, OnDestroy {

  private drSubscrib: Subscription | undefined;
  private httpSubscrib: Subscription | undefined;
  private currUserName: string | undefined;
  userForm!: FormGroup;
  
  roleList: string[] = ["ROLE_ADMIN", "ROLE_USER"];
  
  constructor(private userService: UserService,
              private authService: AuthService,
              private location: Location) {

    this.drSubscrib = this.authService.user.subscribe(us => {
      console.log("======PersonalInfoEdit======= ");
      this.currUserName = us.username;
    });
  }

  ngOnDestroy(): void {
    if (this.drSubscrib) {
      this.drSubscrib.unsubscribe();
    }
    if (this.httpSubscrib) {
      this.httpSubscrib.unsubscribe();
    }
  }

  ngOnInit(): void {   
    if (this.currUserName) {
      this.httpSubscrib = this.userService.getByLogin(this.currUserName).subscribe((user:User) => this.updateUserFormFromUser(user));               
    }

    this.userForm = new FormGroup({
      id: new FormControl(null),
      login: new FormControl(null),
      ismi: new FormControl(null, [Validators.required]),
      familiya: new FormControl(null, [Validators.required]),
      otaIsmi: new FormControl(null),
      tugSana: new FormControl(null),
      email: new FormControl(null, [Validators.email]),
      telNum: new FormControl(null),
      activated: new FormControl(null),
      roles: new FormControl(null, [Validators.required])
    }); 
  }

  saveUser():void {
    let user: User = this.userFormToUser();
    console.log(user);
    this.userService.save(user).subscribe(us => this.updateUserFormFromUser(us));
  }

  public checkError(controlName: string, errorName: string): boolean {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  updateUserFormFromUser(user: User): void  {   
    console.log(user);
    this.userForm?.controls['id'].setValue(user.id);
    this.userForm?.controls['login'].setValue(user.login);
    this.userForm?.controls['ismi'].setValue(user.ismi);
    this.userForm?.controls['familiya'].setValue(user.familiya);
    this.userForm?.controls['otaIsmi'].setValue(user.otaIsmi);
    this.userForm?.controls['tugSana'].setValue(user.tugSana?.toString().slice(0,10));
    this.userForm?.controls['email'].setValue(user.email);
    this.userForm?.controls['telNum'].setValue(user.telNum);
    this.userForm?.controls['roles'].setValue(user.roles);
    this.userForm?.controls['activated'].setValue(user.activated);
  }

  userFormToUser(): User {
    let user: User = new User(
      this.userForm?.controls['id'].value,
      this.userForm?.controls['login'].value,
      this.userForm?.controls['ismi'].value,
      this.userForm?.controls['familiya'].value,
      this.userForm?.controls['otaIsmi'].value,
      this.userForm?.controls['tugSana'].value,
      this.userForm?.controls['email'].value,
      this.userForm?.controls['telNum'].value,
      this.userForm?.controls['activated'].value,
      this.userForm?.controls['roles'].value
    )
    return user;
  }
  
  backClick() {
    this.location.back()
  }
}
