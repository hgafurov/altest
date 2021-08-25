import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  loginForm!: FormGroup;
  lSub!: Subscription; // bu http stream uchun
  authErr: boolean = false;
  hide: boolean = true;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });

    this.route.queryParams.subscribe(params => {
      if (params['registered']) {
        // Ro'yhatdan o'tgan bo'lsa
      } else if (params['accessDenied']) {
        // Ro'yhatdan o'tish lozim
      }
    })
  }  

  ngOnDestroy(): void {
    if (this.lSub != null) { // agar http stream bo'lsa uni yo'qotamiz
      this.lSub.unsubscribe();
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  login() {
    this.loginForm.disable();
    this.lSub = this.authService.login(this.loginForm.value).subscribe(
      () => {
        this.authErr=false;
        this.router.navigate(['/']);
      },
      error => {
        console.warn(error);
        alert(environment.apiUrl)
        this.authErr=true;
        this.loginForm.enable();
      }
    )      
  }

  register() {
    this.router.navigate(['/register']);
  }

} 
