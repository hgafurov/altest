import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/user/user.model';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userForm!: FormGroup;
  
  roleList: string[] = ["ROLE_ADMIN", "ROLE_USER"];
  
  constructor(private userService: UserService,
              public dialogRef: MatDialogRef<UserEditComponent>,
              @Inject(MAT_DIALOG_DATA) 
              public data: any) { }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.userForm = new FormGroup({
      id: new FormControl(null),
      login: new FormControl(null),
      ismi: new FormControl(null, [Validators.required]),
      familiya: new FormControl(null, [Validators.required]),
      otaIsmi: new FormControl(null),
      email: new FormControl(null, [Validators.email]),
      roles: new FormControl(null, [Validators.required])
    });

    //user.roles = [new Role("ROLE_USER")];
    if (this.data.userId != 0) {
      this.userService.getById(this.data.userId)
        .subscribe((user: User) => this.updateUserFormFromUser(user));
    } else {
      this.updateUserFormFromUser(new User());
    }
    
  }
  public checkError(controlName: string, errorName: string): boolean {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  saveUser():void {
    let user: User = this.userFormToUser();
    console.log(user);
    this.userService.save(user).subscribe(us => this.updateUserFormFromUser(us));
  }

  updateUserFormFromUser(user: User): void  {   
    this.userForm?.controls['id'].setValue(user.id);
    this.userForm?.controls['login'].setValue(user.login);
    this.userForm?.controls['ismi'].setValue(user.ismi);
    this.userForm?.controls['familiya'].setValue(user.familiya);
    this.userForm?.controls['otaIsmi'].setValue(user.otaIsmi);
    this.userForm?.controls['email'].setValue(user.email);
    this.userForm?.controls['roles'].setValue(user.roles);
  }

  userFormToUser(): User {
    let user: User = new User(
      this.userForm?.controls['id'].value,
      this.userForm?.controls['login'].value,
      this.userForm?.controls['ismi'].value,
      this.userForm?.controls['familiya'].value,
      this.userForm?.controls['otaIsmi'].value,
      this.userForm?.controls['email'].value,
      this.userForm?.controls['roles'].value
    )
    return user;
  }
}
