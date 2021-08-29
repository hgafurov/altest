import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalInfoEditComponent } from './foruser/personal-info-edit/personal-info-edit.component';
import { SavolCardListComponent } from './foruser/savol/savol-card-list/savol-card-list.component';
import { SavolEditComponent } from './foruser/savol/savol-edit/savol-edit.component';
import { NatijaListComponent } from './foruser/tests/natija-list/natija-list.component';
import { TestEditComponent } from './foruser/tests/test-edit/test-edit.component';
import { TestListComponent } from './foruser/tests/test-list/test-list.component';
import { TestTableComponent } from './foruser/tests/test-table/test-table.component';
import { TestingComponent } from './foruser/tests/testing/testing.component';
import { UserProfileComponent } from './foruser/user-profile/user-profile.component';
import { GuestGuard } from './guards/guest.guard';
import { RoleGuard } from './guards/role.guard';
import { GuestHelloComponent } from './guest/guest-hello/guest-hello.component';
import { LoginComponent } from './guest/login/login.component';
import { P404Component } from './guest/p404/p404.component';
import { RegisterComponent } from './guest/register/register.component';
import { AlmLayoutComponent } from './layouts/alm-layout/alm-layout.component';

const routes: Routes = [
  {
    path: '', component: AlmLayoutComponent, children: [
      {path: '', redirectTo: '/guest-hello', pathMatch: 'full'},
      {path: 'p404', component: P404Component},
      {path: 'guest-hello', component: GuestHelloComponent},
      {path: 'login', component: LoginComponent, canActivate:[GuestGuard]},
      {path: 'register', component: RegisterComponent, canActivate:[GuestGuard]},
      
      {path: 'user-profile', 
        data: {roles: ['ROLE_ADMIN', 'ROLE_USER']}, canActivate:[RoleGuard],
        children:[
          {path: '', component: UserProfileComponent},
          {path: 'personal-info-edit', component: PersonalInfoEditComponent}
        ]
      },
      {path: 'savol', 
        data: {roles: ['ROLE_ADMIN', 'ROLE_USER']}, canActivate:[RoleGuard],
        children:[
          {path: 'cards', component: SavolCardListComponent},
          {path: 'edit/:id', component: SavolEditComponent}
        ]
      },
      {path: 'test', 
        data: {roles: ['ROLE_ADMIN', 'ROLE_USER']}, canActivate:[RoleGuard],
        children:[
          {path: 'table', component: TestTableComponent},
          {path: 'edit/:id', component: TestEditComponent},
          {path: 'testlist', component: TestListComponent},
          {path: 'testing/:id', component: TestingComponent},
          {path: 'natijalar', component: NatijaListComponent}
        ]
      },
      {path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
      },
      {path: '**', redirectTo: '/p404'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
