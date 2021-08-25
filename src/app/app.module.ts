import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlmLayoutComponent } from './layouts/alm-layout/alm-layout.component';
import { GuestHelloComponent } from './guest/guest-hello/guest-hello.component';
import { LoginComponent } from './guest/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RegisterComponent } from './guest/register/register.component';
import { LogoutDialogComponent } from './layouts/logout-dialog/logout-dialog.component';
import { UserProfileComponent } from './foruser/user-profile/user-profile.component';
import { PersonalInfoComponent } from './foruser/personal-info/personal-info.component';
import { TestInfoComponent } from './foruser/test-info/test-info.component';
import { PersonalInfoEditComponent } from './foruser/personal-info-edit/personal-info-edit.component';
import { P404Component } from './guest/p404/p404.component';
import { SavolCardListComponent } from './foruser/savol/savol-card-list/savol-card-list.component';
import { KatexModule } from 'ng-katex';
import { SavolEditComponent } from './foruser/savol/savol-edit/savol-edit.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgDompurifyModule } from '@tinkoff/ng-dompurify';
import { StrForKatexPipe } from './pipes/str-for-katex.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TestTableComponent } from './foruser/tests/test-table/test-table.component';
import { TestEditComponent } from './foruser/tests/test-edit/test-edit.component';
import { TestListComponent } from './foruser/tests/test-list/test-list.component';
import { TestingComponent } from './foruser/tests/testing/testing.component';

@NgModule({
  declarations: [
    AppComponent,
    AlmLayoutComponent,
    GuestHelloComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    PersonalInfoComponent,
    PersonalInfoEditComponent,
    TestInfoComponent,
    SavolCardListComponent,
    SavolEditComponent,
    TestTableComponent,
    TestListComponent,
    TestEditComponent,
    TestingComponent,
    LogoutDialogComponent,
    StrForKatexPipe,
    P404Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppMaterialModule,
    AppRoutingModule,
    KatexModule,
    AngularEditorModule,
    FontAwesomeModule,
    NgDompurifyModule   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
