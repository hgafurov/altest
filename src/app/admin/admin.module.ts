import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AppMaterialModule } from "../app-material.module";
import { RoleGuard } from "../guards/role.guard";
import { UserDeleteDialogComponent, UserEditComponent, UsersComponent } from "./";
import { UserEdit2Component } from "./user-edit2/user-edit2.component";

const adminRoute: Routes = [
    {
        path: '',
        data: {
            roles: ['ROLE_ADMIN']
        },
        canActivate: [RoleGuard],
        children: [
          {path: 'users', component: UsersComponent},
          {path: 'user/:id', component: UserEdit2Component}
        ]
    }
];

@NgModule({
    declarations: [
        UsersComponent,
        UserDeleteDialogComponent,
        UserEditComponent,
        UserEdit2Component
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        RouterModule.forChild(adminRoute)
    ], 
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })

export class AdminModule { }
