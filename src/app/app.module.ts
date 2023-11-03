import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'material.module';
import { JwtInterceptor } from './_helpers';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { DashBoardModule } from './dash-board/dash-board.module';
import { LoginComponent } from './login/login.component';
import { CustemerAddManager } from './shared/services/restcontroller/bizservice/Custemer-wb.service';
import { DepartmentsManager } from './shared/services/restcontroller/bizservice/Departments.service';
import { PurchaseInvoicePayItemManager } from './shared/services/restcontroller/bizservice/PurchaseInvoicesItems.service';
import { AuthManager } from './shared/services/restcontroller/bizservice/auth-manager.service';
import { CustomerPoitemManager } from './shared/services/restcontroller/bizservice/customerPoItem.service';
import { LoginManager } from './shared/services/restcontroller/bizservice/login.service';
import { PersonManager } from './shared/services/restcontroller/bizservice/person.service';
import { RoleManager } from './shared/services/restcontroller/bizservice/role.service';
import { StatusSettingManager } from './shared/services/restcontroller/bizservice/status-setting.service';
import { UnitDepartManager } from './shared/services/restcontroller/bizservice/unitdepartmaster.service';
import { UnitManagerManager } from './shared/services/restcontroller/bizservice/unitmaster.service';
import { UserManager } from './shared/services/restcontroller/bizservice/user.service';
import { BaseService } from './shared/services/services/base.service';
import { CalloutService } from './shared/services/services/callout.service';
import { DataSharedService } from './shared/services/services/datashared.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  // exports: [NgbCollapseModule],
  providers: [AuthManager, CalloutService, DataSharedService, LoginManager,
    BaseService, UserManager, UnitManagerManager,UnitDepartManager,DepartmentsManager,
     PersonManager, RoleManager,PurchaseInvoicePayItemManager,StatusSettingManager,CustomerPoitemManager,CustemerAddManager,

   { provide: LocationStrategy, useClass: PathLocationStrategy },
   { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
 bootstrap: [AppComponent],
//  entryComponents: [ResetPasswordComponent],
 schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
