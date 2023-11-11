import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { deserialize } from 'serializer.ts/Serializer';
import { DiagnosisManager } from 'src/app/shared/services/restcontroller/bizservice/Diagnosis.service';
import { PatientManager } from 'src/app/shared/services/restcontroller/bizservice/Patient.service';
import { PatientmasterManager } from 'src/app/shared/services/restcontroller/bizservice/Patientmaster.service';
import { TreatmentManager } from 'src/app/shared/services/restcontroller/bizservice/Treatment.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ToastService } from 'src/app/shared/services/restcontroller/callout/toast.service';
import { Diagnosis001mb } from 'src/app/shared/services/restcontroller/entities/Diagnosis001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Patient001mb } from 'src/app/shared/services/restcontroller/entities/Patient001mb';
import { Patientmaster001mb } from 'src/app/shared/services/restcontroller/entities/Patientmaster001mb';
import { Treatment001mb } from 'src/app/shared/services/restcontroller/entities/Treatment001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-pc-patient-details',
  templateUrl: './pc-patient-details.component.html',
  styleUrls: ['./pc-patient-details.component.scss']
})
export class PcPatientDetailsComponent implements OnInit {

  patientForm: FormGroup | any;
  user?: Login001mb | any;
  patient001mb: Patient001mb[] | any;
  dataSource: MatTableDataSource<any>;
  slNo: number;
  unitslno: number;
  pcPatientId: string;
  pcPatientFname: string;
  pcPatientLname: string;
  displayLname: string;
  treatment: string;
  diagnosis: string;
  age: number;
  sex: string;
  address: string;
  phone: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  patientmaster001mb: Patientmaster001mb[] | any;
  diagnosis001mb: Diagnosis001mb[] | any;
  treatment001mb: Treatment001mb[] | any;
  displayedColumns: string[] = [
    'slNo',
    'pcPatientId',
    'displayLname',
    'age',
    'sex',
    'address',
    'phone',
    'diagnosis',
    'treatment',
    'action'
  ];
  count: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private patientManager: PatientManager,
    private calloutService: CalloutService,
    private patientmasterManager: PatientmasterManager,
    private diagnosisManager: DiagnosisManager,
    private TreatmentManager: TreatmentManager,
    private datepipe: DatePipe,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.patientForm = this.formBuilder.group({
      pcPatientId: ['', Validators.required],
      pcPatientFname: ['', Validators.required],
      pcPatientLname: ['', Validators.required],
      treatment: ['', Validators.required],
      diagnosis: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]

    })
    this.diagnosisManager.alldiagnosis(this.user.unitslno).subscribe(response => {
      this.diagnosis001mb = deserialize<Diagnosis001mb[]>(Diagnosis001mb, response);
    });
    this.TreatmentManager.alltreatment(this.user.unitslno).subscribe(response => {
      this.treatment001mb = deserialize<Treatment001mb[]>(Treatment001mb, response);
    });
    this.loadData();
  }

  loadData() {
    this.patientmasterManager.allpatientmaster(this.user.unitslno).subscribe(response => {
      this.patientmaster001mb = deserialize<Patientmaster001mb[]>(Patientmaster001mb, response);
      if (this.patientmaster001mb.length > 0) {
        this.dataSource = new MatTableDataSource(this.patientmaster001mb);
      } else {
        this.dataSource = new MatTableDataSource([]);
      }
    });
    let date = this.datepipe.transform(new Date, 'MM-yy')
    this.patientmasterManager.getCount().subscribe(response => {
      this.count = response[0].row == 0 ? 1 : parseInt(response[0].row) + 1;
      this.patientForm.patchValue({
        pcPatientId: String(`AMK-pc/${date}/`) + String(this.count).padStart(4, '0')
      });
    });
  }

  get f() { return this.patientForm.controls }

  editable(element) {
    this.slNo = element.slNo;
    this.unitslno = element.unitslno;
    this.insertUser = element.insertUser;
    this.insertDatetime = element.insertDatetime;
    this.patientForm.patchValue({
      'patientId': element.patientId,
      'patientFname': element.patientFname,
      'patientLname': element.patientLname,
      'age': element.age,
      'sex': element.sex,
      'address': element.address,
      'phone': element.phone,
    });
  }

  onDeleteButtonClick(element) {
    this.patientManager.patientdelete(element.slNo).subscribe((response) => {
      for (let i = 0; i < this.patient001mb.length; i++) {
        if (this.patient001mb[i].slNo == element.slNo) {
          this.patient001mb?.splice(i, 1);
          break;
        }
      }
      this.loadData();
      this.calloutService.showSuccess("Purchase Request Removed Successfully");
    });
  }


  onpatientForm(event: any, patientForm: any) {
    let patientmaster001mb = new Patientmaster001mb();

    patientmaster001mb.pcPatientId = this.f.pcPatientId.value;
    patientmaster001mb.pcPatientFname = this.f.pcPatientFname.value;
    patientmaster001mb.pcPatientLname = this.f.pcPatientLname.value;
    patientmaster001mb.displayLname = this.f.pcPatientFname.value + "" + this.f.pcPatientLname.value;
    patientmaster001mb.treatment = this.f.treatment.value.join(', ');
    patientmaster001mb.diagnosis = this.f.diagnosis.value;
    patientmaster001mb.age = this.f.age.value;
    patientmaster001mb.sex = this.f.sex.value;
    patientmaster001mb.address = this.f.address.value;
    patientmaster001mb.phone = this.f.phone.value;


    if (this.slNo) {
      patientmaster001mb.slNo = this.slNo;
      patientmaster001mb.unitslno = this.unitslno;
      patientmaster001mb.insertUser = this.insertUser;
      patientmaster001mb.insertDatetime = this.insertDatetime;
      patientmaster001mb.updatedUser = this.authManager.getcurrentUser.username;
      patientmaster001mb.updatedDatetime = new Date();
      this.patientmasterManager.patientmasterupdate(patientmaster001mb).subscribe((response) => {
        this.toast.updateSnackBar('Patient Updated Successfully');
        this.patientForm.reset();
        this.loadData();
        this.slNo = null;
      });
    } else {
      patientmaster001mb.unitslno = this.user.unitslno;
      patientmaster001mb.insertUser = this.authManager.getcurrentUser.username;
      patientmaster001mb.insertDatetime = new Date();
      this.patientmasterManager.patientmastersave(patientmaster001mb).subscribe((response) => {
        this.toast.saveSnackBar('Patient Updated Successfully');
        this.patientForm.reset();
        this.loadData()
      })
    }
  }

  onCansel() {
    this.patientForm.reset();
  }
}
