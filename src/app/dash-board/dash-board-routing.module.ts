import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './dash-board.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { MasterTreatmentComponent } from './master-treatment/master-treatment.component';
import { MasterDiagnosisComponent } from './master-diagnosis/master-diagnosis.component';
import { HomeConsultationComponent } from './home-consultation/home-consultation.component';
import { ProfileComponent } from './profile/profile.component';
import { DepartmentParentComponent } from './department-parent/department-parent.component';
import { ListOpPatientComponent } from './list-op-patient/list-op-patient.component';
import { ListPcPatientComponent } from './list-pc-patient/list-pc-patient.component';
import { PatientConsultationComponent } from './patient-consultation/patient-consultation.component';
import { PcPatientConsultationComponent } from './pc-patient-consultation/pc-patient-consultation.component';
import { PcPatientDetailsComponent } from './pc-patient-details/pc-patient-details.component';
import { HistoryComponent } from './history/history.component';
import { ClinicExpensesComponent } from './clinic-expenses/clinic-expenses.component';

const routes: Routes = [
  {
    path: "",
    component: DashBoardComponent,
    children: [
      {
        path: "app-doctor-details",
        component: DoctorDetailsComponent,
      },
      {
        path: "app-patient-details",
        component: PatientDetailsComponent,
      },
      {
        path: "app-master-treatment",
        component: MasterTreatmentComponent,
      },
      {
        path: "app-master-diagnosis",
        component: MasterDiagnosisComponent,
      },
      {
        path: "app-home-consultation",
        component: HomeConsultationComponent,
      },
      {
        path: "app-profile",
        component: ProfileComponent,
      },
      {
        path: "app-department-parent",
        component: DepartmentParentComponent,
      }, {
        path: "app-list-pc-patient",
        component: ListPcPatientComponent,

      },
      {
        path: "app-list-op-patient",
        component: ListOpPatientComponent,
      },
      {
        path: 'app-patient-consultation',
        component: PatientConsultationComponent,
      },
      {
        path: 'app-patient-consultation/:id',
        component: PatientConsultationComponent,
      },
      {
        path: 'app-pc-patient-consultation',
        component: PcPatientConsultationComponent,
      },
      {
        path: 'app-pc-patient-consultation/:id',
        component: PcPatientConsultationComponent,
      },
      {
        path: 'app-pc-patient-details',
        component: PcPatientDetailsComponent,
      },
      {
        path: 'app-history',
        component: HistoryComponent,
      },
      {
        path: 'app-clinic-expenses',
        component: ClinicExpensesComponent,
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
