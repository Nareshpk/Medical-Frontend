import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'material.module';
import { DepartmentsManager } from '../shared/services/restcontroller/bizservice/Departments.service';
import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeConsultationComponent } from './home-consultation/home-consultation.component';
import { MasterDiagnosisComponent } from './master-diagnosis/master-diagnosis.component';
import { MasterTreatmentComponent } from './master-treatment/master-treatment.component';
import { PatientConsultationComponent } from './patient-consultation/patient-consultation.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PcPatientConsultationComponent } from './pc-patient-consultation/pc-patient-consultation.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { AgGridModule } from 'ag-grid-angular';
import { DiagnosisManager } from '../shared/services/restcontroller/bizservice/Diagnosis.service';
import { PatientManager } from '../shared/services/restcontroller/bizservice/Patient.service';
import { PatientmasterManager } from '../shared/services/restcontroller/bizservice/Patientmaster.service';
import { PatientOpManager } from '../shared/services/restcontroller/bizservice/Patientop.service';
import { PatientPcManager } from '../shared/services/restcontroller/bizservice/Patientpc.service';
import { TreatmentManager } from '../shared/services/restcontroller/bizservice/Treatment.service';
import { AuthManager } from '../shared/services/restcontroller/bizservice/auth-manager.service';
import { DoctorManager } from '../shared/services/restcontroller/bizservice/doctor.service';
import { LoginManager } from '../shared/services/restcontroller/bizservice/login.service';
import { PersonManager } from '../shared/services/restcontroller/bizservice/person.service';
import { UserManager } from '../shared/services/restcontroller/bizservice/user.service';
import { CalloutService } from '../shared/services/services/callout.service';
import { DepartmentParentComponent } from './department-parent/department-parent.component';
import { DepartmentSettingComponent } from './department-setting/department-setting.component';
import { HistoryOpPatientComponent } from './history-op-patient/history-op-patient.component';
import { HistoryPcPatientComponent } from './history-pc-patient/history-pc-patient.component';
import { HistoryComponent } from './history/history.component';
import { ListOpPatientComponent } from './list-op-patient/list-op-patient.component';
import { ListPcPatientComponent } from './list-pc-patient/list-pc-patient.component';
import { PasswordComponent } from './password/password.component';
import { PcPatientDetailsComponent } from './pc-patient-details/pc-patient-details.component';
import { RegistrationComponent } from './registration/registration.component';
import { UnitDeptMasterComponent } from './unit-dept-master/unit-dept-master.component';
import { UnitmasterComponent } from './unitmaster/unitmaster.component';
import { UsernameComponent } from './username/username.component';
import { ClinicExpensesComponent } from './clinic-expenses/clinic-expenses.component';
import { ClinicExpensesDayilyComponent } from './clinic-expenses-dayily/clinic-expenses-dayily.component';
import { ClinicExpensesMonthlyComponent } from './clinic-expenses-monthly/clinic-expenses-monthly.component';
import { MonthlyexpensesManager } from '../shared/services/restcontroller/bizservice/Monthlyexpenses.service';
import { DayilyexpensesManager } from '../shared/services/restcontroller/bizservice/Dayilyexpenses.service';
import { AgrenderercomponentModule } from '../shared/services/agrenderercomponent/agrenderercomponent.module';
import { MatIconModule } from '@angular/material/icon';
import { ToastService } from '../shared/services/restcontroller/callout/toast.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AccountDeportmentComponent } from './account-deportment/account-deportment.component';
import { ExcelsheetManager } from '../shared/services/restcontroller/bizservice/Excelsheet.service';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [DashBoardComponent, SidebarComponent, HeaderComponent, FooterComponent, DoctorDetailsComponent, PatientDetailsComponent, MasterDiagnosisComponent, MasterTreatmentComponent, HomeConsultationComponent, PatientConsultationComponent, PcPatientConsultationComponent, ProfileComponent, RegistrationComponent, UsernameComponent, PasswordComponent, UnitmasterComponent, UnitDeptMasterComponent, DepartmentSettingComponent, DepartmentParentComponent, ListOpPatientComponent, ListPcPatientComponent, PcPatientDetailsComponent, HistoryComponent, HistoryOpPatientComponent, HistoryPcPatientComponent, ClinicExpensesComponent, ClinicExpensesDayilyComponent, ClinicExpensesMonthlyComponent, AccountDeportmentComponent],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    FlexLayoutModule,
    AgGridModule.withComponents([]),
    AgrenderercomponentModule,
    MatAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatBadgeModule
  ],
  providers: [
    LoginManager,
    AuthManager,
    UserManager,
    PersonManager,
    DoctorManager,
    DepartmentsManager,
    TreatmentManager,
    DiagnosisManager,
    PatientManager,
    PatientOpManager,
    PatientPcManager,
    PatientmasterManager,
    DatePipe,
    CalloutService,
    MonthlyexpensesManager,
    DayilyexpensesManager,
    ToastService,
    ExcelsheetManager,
    
  ],
  // exports: [NgbCollapseModule],
  bootstrap: [DashBoardComponent,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class DashBoardModule { }
