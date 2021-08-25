import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  registerForm!: FormGroup;
  rSub: Subscription | undefined;

  hide: boolean = true;
  public invLogin: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { 

}
  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();    
    }
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      ismi: new FormControl(null, [Validators.required]),
      familiya: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password2: new FormControl(null, [Validators.required, Validators.minLength(4)])
    },
    { validators: identityPasswordError }); 
  }
  
  public checkError(controlName: string, errorName: string): boolean {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  register() {
    this.registerForm.disable();
    this.rSub = this.authService.register(this.registerForm.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }   
        });
      },
      error => {
        console.log(error);
        console.log(error.error);
        //alert(error.error.msg);
        
        this.registerForm.enable();
        this.invLogin = true;
      }      
    );
  }
}

export const identityPasswordError: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pass = control.get('password');
  const pass2 = control.get('password2');
  
  if (pass?.errors && !pass2?.errors?.identityPasswordError) {
    return null;
  }
  if (pass?.value !== pass2?.value) {
    pass2?.setErrors({ identityPasswordError: true});
  } else {
    pass2?.setErrors(null);
  }
  return null;
}
  
