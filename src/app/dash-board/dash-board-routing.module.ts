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
import { AccountDeportmentComponent } from './account-deportment/account-deportment.component';
import { HistoryPcPatientComponent } from './history-pc-patient/history-pc-patient.component';
import { HistoryOpPatientComponent } from './history-op-patient/history-op-patient.component';
import { AllowanceComponent } from './allowance/allowance.component';
import { StockComponent } from './stock/stock.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockProductDetailsComponent } from './stock-product-details/stock-product-details.component';
import { StockProductDistributionComponent } from './stock-product-distribution/stock-product-distribution.component';
import { StockProductSalesComponent } from './stock-product-sales/stock-product-sales.component';

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
        children: [
          {
            path: "app-list-op-patient",
            component: ListOpPatientComponent,
          },
          {
            path: "app-list-pc-patient",
            component: ListPcPatientComponent,

          },
        ]
      },
      {
        path: "app-profile",
        component: ProfileComponent,
      },
      {
        path: "app-department-parent",
        component: DepartmentParentComponent,
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
        children: [{
          path: 'app-history-op-patient',
          component: HistoryOpPatientComponent,
        }, {
          path: 'app-history-pc-patient',
          component: HistoryPcPatientComponent,
        }]
      },
      {
        path: 'app-clinic-expenses',
        component: ClinicExpensesComponent,
      },
      {
        path: 'app-allowance',
        component: AllowanceComponent,
      },
      {
        path: 'app-stock',
        component: StockComponent,
        children: [
          {
            path: 'app-stock-details',
            component: StockDetailsComponent,
          },
          {
            path: 'app-stock-product-details',
            component: StockProductDetailsComponent,
          },
          {
            path: 'app-stock-product-distribution',
            component: StockProductDistributionComponent,
          },
          {
            path: 'app-stock-product-sales',
            component: StockProductSalesComponent,
          },
        ]
      },
      {
        path: 'app-account-deportment',
        component: AccountDeportmentComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
