import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { deserialize } from 'serializer.ts/Serializer';
import { DiagnosisManager } from 'src/app/shared/services/restcontroller/bizservice/Diagnosis.service';
import { PatientManager } from 'src/app/shared/services/restcontroller/bizservice/Patient.service';
import { PatientOpManager } from 'src/app/shared/services/restcontroller/bizservice/Patientop.service';
import { TreatmentManager } from 'src/app/shared/services/restcontroller/bizservice/Treatment.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DoctorManager } from 'src/app/shared/services/restcontroller/bizservice/doctor.service';
import { Diagnosis001mb } from 'src/app/shared/services/restcontroller/entities/Diagnosis001mb';
import { Doctor001mb } from 'src/app/shared/services/restcontroller/entities/Doctor001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Patient001mb } from 'src/app/shared/services/restcontroller/entities/Patient001mb';
import { Patientop001mb } from 'src/app/shared/services/restcontroller/entities/Patientop001mb';
import { Treatment001mb } from 'src/app/shared/services/restcontroller/entities/Treatment001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-patient-consultation',
  templateUrl: './patient-consultation.component.html',
  styleUrls: ['./patient-consultation.component.scss']
})
export class PatientConsultationComponent implements OnInit {
  patientdetailsForm: FormGroup | any;
  todaysDate = new Date();
  slNo: number;
  unitslno: number;
  pslno: number;
  dslno: number;
  pname: string;
  age: number;
  sex: string;
  address: string;
  phone: string;
  diagnosis: string;
  fees: number;
  balance: number;
  fstatus: string;
  cdate: Date;
  rdate: Date;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  user?: Login001mb | any;
  patient001mb: Patient001mb[] | any;
  doctor001mb: Doctor001mb[] | any;
  diagnosis001mb: Diagnosis001mb[] | any;
  treatment001mb: Treatment001mb[] | any;
  patientop001mb: Patientop001mb | any;
  constructor(
    private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private patientManager: PatientManager,
    private calloutService: CalloutService,
    private doctorManager: DoctorManager,
    private diagnosisManager: DiagnosisManager,
    private TreatmentManager: TreatmentManager,
    private patientOpManager: PatientOpManager,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log("this.route", this.route.snapshot.params.id);

    this.user = this.authManager.getcurrentUser;
    let id = Number(this.route.snapshot.params.id)
    this.patientdetailsForm = this.formBuilder.group({
      pslno: ['', Validators.required],
      dslno: ['', Validators.required],
      pname: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['', Validators.required],
      treatment: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      diagnosis: ['', Validators.required],
      fees: ['', Validators.required],
      balance: ['', Validators.required],
      fstatus: ['', Validators.required],
      cdate: ['', Validators.required],
      rdate: ['', Validators.required],
    })
    console.log("id", id);

    this.patientOpManager.findOne(id).subscribe(response => {
      this.patientop001mb = deserialize<Patientop001mb>(Patientop001mb, response);
      console.log("this.patientop001mb", this.patientop001mb);
      this.slNo = this.patientop001mb.slNo;
      this.unitslno = this.patientop001mb.unitslno;
      this.insertUser = this.patientop001mb.insertUser;
      this.insertDatetime = this.patientop001mb.insertDatetime;
      this.patientdetailsForm.patchValue({
        'pslno': this.patientop001mb.pslno,
        'dslno': this.patientop001mb.dslno,
        'pname': this.patientop001mb.pname,
        'age': this.patientop001mb.age,
        'sex': this.patientop001mb.sex,
        'treatment': this.patientop001mb.treatment,
        'address': this.patientop001mb.address,
        'phone': this.patientop001mb.phone,
        'diagnosis': this.patientop001mb.diagnosis,
        'fees': this.patientop001mb.fees,
        'balance': this.patientop001mb.balance,
        'fstatus': this.patientop001mb.fstatus,
        'cdate': this.patientop001mb.cdate,
        'rdate': this.patientop001mb.rdate,
      });
    });
    this.loadData();
  }
  loadData() {
    this.patientManager.allpatient(this.user.unitslno).subscribe(response => {
      this.patient001mb = deserialize<Patient001mb[]>(Patient001mb, response);
    });
    this.doctorManager.alldoctor(this.user.unitslno).subscribe(response => {
      this.doctor001mb = deserialize<Doctor001mb[]>(Doctor001mb, response);
    });
    this.diagnosisManager.alldiagnosis(this.user.unitslno).subscribe(response => {
      this.diagnosis001mb = deserialize<Diagnosis001mb[]>(Diagnosis001mb, response);
    });
    this.TreatmentManager.alltreatment(this.user.unitslno).subscribe(response => {
      this.treatment001mb = deserialize<Treatment001mb[]>(Treatment001mb, response);
    });
  }

  get f() { return this.patientdetailsForm.controls }

  onChange(event) {
    let details = this.patient001mb.find((x) => x.slNo == event)
    this.patientdetailsForm.patchValue({
      'pname': details.patientFname,
      'age': details.age,
      'sex': details.sex,
      'address': details.address,
      'phone': details.phone,
    });
  }

  resetAwardLevelOnDobChange(): void { }

  onPatientdetails(event: any, patientdetailsForm) {
    let value = this.f.treatment.value.join(', ')
    let patientop001mb = new Patientop001mb();
    patientop001mb.pslno = this.f.pslno.value;
    patientop001mb.dslno = this.f.dslno.value;
    patientop001mb.pname = this.f.pname.value;
    patientop001mb.age = this.f.age.value;
    patientop001mb.sex = this.f.sex.value;
    patientop001mb.address = this.f.address.value;
    patientop001mb.phone = this.f.phone.value;
    patientop001mb.diagnosis = this.f.diagnosis.value;
    patientop001mb.treatment = value;
    patientop001mb.fees = this.f.fees.value;
    patientop001mb.balance = this.f.balance.value;
    patientop001mb.fstatus = this.f.fstatus.value;
    patientop001mb.cdate = this.f.cdate.value;
    patientop001mb.rdate = this.f.rdate.value;

    if (this.slNo) {
      patientop001mb.slNo = this.slNo;
      patientop001mb.unitslno = this.unitslno;
      patientop001mb.insertUser = this.insertUser;
      patientop001mb.insertDatetime = this.insertDatetime;
      patientop001mb.updatedUser = this.authManager.getcurrentUser.username;
      patientop001mb.updatedDatetime = new Date();
      this.patientOpManager.patientopupdate(patientop001mb).subscribe((response) => {
        this.router.navigate(['./app-dash-board/app-home-consultation']);
        this.loadData();
        this.slNo = null;
      });
    } else {
      patientop001mb.unitslno = this.user.unitslno;
      patientop001mb.insertUser = this.authManager.getcurrentUser.username;
      patientop001mb.insertDatetime = new Date();
      this.patientOpManager.patientopsave(patientop001mb).subscribe((response) => {
        this.router.navigate(['./app-dash-board/app-home-consultation']);
        this.loadData()
      })
    }
  }

}
