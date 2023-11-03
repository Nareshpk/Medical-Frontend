import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { deserialize } from 'serializer.ts/Serializer';
import { DiagnosisManager } from 'src/app/shared/services/restcontroller/bizservice/Diagnosis.service';
import { PatientManager } from 'src/app/shared/services/restcontroller/bizservice/Patient.service';
import { PatientmasterManager } from 'src/app/shared/services/restcontroller/bizservice/Patientmaster.service';
import { PatientOpManager } from 'src/app/shared/services/restcontroller/bizservice/Patientop.service';
import { PatientPcManager } from 'src/app/shared/services/restcontroller/bizservice/Patientpc.service';
import { TreatmentManager } from 'src/app/shared/services/restcontroller/bizservice/Treatment.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DoctorManager } from 'src/app/shared/services/restcontroller/bizservice/doctor.service';
import { Diagnosis001mb } from 'src/app/shared/services/restcontroller/entities/Diagnosis001mb';
import { Doctor001mb } from 'src/app/shared/services/restcontroller/entities/Doctor001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Patient001mb } from 'src/app/shared/services/restcontroller/entities/Patient001mb';
import { Patientmaster001mb } from 'src/app/shared/services/restcontroller/entities/Patientmaster001mb';
import { Patientpc001mb } from 'src/app/shared/services/restcontroller/entities/Patientpc001mb';
import { Treatment001mb } from 'src/app/shared/services/restcontroller/entities/Treatment001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-pc-patient-consultation',
  templateUrl: './pc-patient-consultation.component.html',
  styleUrls: ['./pc-patient-consultation.component.scss']
})
export class PcPatientConsultationComponent implements OnInit {
  patientPcForm: FormGroup | any;
  patientPcFormArry: FormArray | any;
  doctorslno = new FormControl();
  dateslno = new FormControl(new Date());
  slNo: number;
  unitslno: number;
  pcslno: number;
  dcslno: number;
  pname: string;
  age: number;
  sex: string;
  address: string;
  phone: string;
  diagnosis: string;
  treatment: string;
  fees: number;
  balance: number;
  fstatus: string;
  cdate: Date;
  rdate: Date;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  patient001mb: Patient001mb[] | any;
  doctor001mb: Doctor001mb[] | any;
  diagnosis001mb: Diagnosis001mb[] | any;
  treatment001mb: Treatment001mb[] | any;
  patientmaster001mb: Patientmaster001mb[] | any;
  user?: Login001mb | any;
  arrayslno: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private patientManager: PatientManager,
    private calloutService: CalloutService,
    private doctorManager: DoctorManager,
    private diagnosisManager: DiagnosisManager,
    private treatmentManager: TreatmentManager,
    private patientOpManager: PatientOpManager,
    private patientPcManager: PatientPcManager,
    private patientmasterManager: PatientmasterManager,
  ) { }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.patientPcForm = this.formBuilder.group({
      patientPcFormArry: this.formBuilder.array([this.createItem()])
    });
    this.loadData();

  }

  loadData() {
    this.patientmasterManager.allpatientmaster(this.user.unitslno).subscribe(response => {
      this.patientmaster001mb = deserialize<Patientmaster001mb[]>(Patientmaster001mb, response);
    });
    this.patientManager.allpatient(this.user.unitslno).subscribe(response => {
      this.patient001mb = deserialize<Patient001mb[]>(Patient001mb, response);
    });
    this.doctorManager.alldoctor(this.user.unitslno).subscribe(response => {
      this.doctor001mb = deserialize<Doctor001mb[]>(Doctor001mb, response);
    });
    this.diagnosisManager.alldiagnosis(this.user.unitslno).subscribe(response => {
      this.diagnosis001mb = deserialize<Diagnosis001mb[]>(Diagnosis001mb, response);
    });
    this.treatmentManager.alltreatment(this.user.unitslno).subscribe(response => {
      this.treatment001mb = deserialize<Treatment001mb[]>(Treatment001mb, response);
    });
  }

  get f() {
    return this.patientPcForm.controls;
  }

  createItem() {
    return this.formBuilder.group({
      pcslno: ['', Validators.required],

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
      visit: ['1', Validators.required],
    })
  }

  onChange(event, index: any) {

    for (let i = 0; i < this.arrayslno.length; i++) {
      if (this.arrayslno[i] == event) {
        this.calloutService.showWarning("Already selected");
        event = "";
        break;
      }
    }
    this.arrayslno.push(event);
    let details = this.patientmaster001mb.find((x) => x.slNo == event)
    this.patientPcFormArry = this.f['patientPcFormArry'] as FormArray;
    this.patientPcFormArry.controls[index].controls['pname'].setValue(details?.displayLname);
    this.patientPcFormArry.controls[index].controls['age'].setValue(details.age);
    this.patientPcFormArry.controls[index].controls['sex'].setValue(details.sex);
    this.patientPcFormArry.controls[index].controls['address'].setValue(details.address);
    this.patientPcFormArry.controls[index].controls['phone'].setValue(details.phone);
    this.patientPcFormArry.controls[index].controls['treatment'].setValue(details.treatment);
    this.patientPcFormArry.controls[index].controls['diagnosis'].setValue(details.diagnosis);
    // this.patientPcForm.patchValue({
    //   'pname': details.patientFname,
    //   'age': details.age,
    //   'sex': details.sex,
    //   'address': details.address,
    //   'phone': details.phone,
    // });
  }
  addItem() {
    this.patientPcFormArry = this.f['patientPcFormArry'] as FormArray;
    this.patientPcFormArry.push(this.createItem());
  }

  removeItem(idx: number): void {
    (this.f['patientPcFormArry'] as FormArray).removeAt(idx);
  }

  onpatientPcForm(event: any, patientPcForm: any) {
console.log("doc_and_date",this.dateslno);

    let doc_and_date = [{
      dcslno: this.doctorslno.value,
      date: this.dateslno.value
    }]
    console.log("this.f", doc_and_date);
    let patientpc001mbs: Patientpc001mb[] = [];
    for (let i = 0; i < this.patientPcForm.controls.patientPcFormArry.controls.length; i++) {
      let patientpc001mb = new Patientpc001mb();
      patientpc001mb.pcslno = this.f.patientPcFormArry.value[i].pcslno ? this.f.patientPcFormArry.value[i].pcslno : null;
      patientpc001mb.dcslno = this.doctorslno.value;
      patientpc001mb.pname = this.f.patientPcFormArry.value[i].pname ? this.f.patientPcFormArry.value[i].pname : null;
      patientpc001mb.age = this.f.patientPcFormArry.value[i].age ? this.f.patientPcFormArry.value[i].age : null;
      patientpc001mb.sex = this.f.patientPcFormArry.value[i].sex ? this.f.patientPcFormArry.value[i].sex : null;
      patientpc001mb.treatment = this.f.patientPcFormArry.value[i].treatment ? this.f.patientPcFormArry.value[i].treatment : null;
      patientpc001mb.address = this.f.patientPcFormArry.value[i].address ? this.f.patientPcFormArry.value[i].address : null;
      patientpc001mb.phone = this.f.patientPcFormArry.value[i].phone ? this.f.patientPcFormArry.value[i].phone : null;
      patientpc001mb.diagnosis = this.f.patientPcFormArry.value[i].diagnosis ? this.f.patientPcFormArry.value[i].diagnosis : null;
      patientpc001mb.fees = this.f.patientPcFormArry.value[i].fees ? this.f.patientPcFormArry.value[i].fees : null;
      patientpc001mb.balance = this.f.patientPcFormArry.value[i].balance ? this.f.patientPcFormArry.value[i].balance : null;
      patientpc001mb.fstatus = this.f.patientPcFormArry.value[i].fstatus ? this.f.patientPcFormArry.value[i].fstatus : null;
      patientpc001mb.visit = this.f.patientPcFormArry.value[i].visit ? this.f.patientPcFormArry.value[i].visit : null;
      patientpc001mb.date = this.dateslno.value;
      if (this.slNo) {
        patientpc001mb.slNo = this.slNo;
        patientpc001mb.unitslno = this.unitslno;
        patientpc001mb.insertUser = this.insertUser;
        patientpc001mb.insertDatetime = this.insertDatetime;
        patientpc001mb.updatedUser = this.authManager.getcurrentUser.username;
        patientpc001mb.updatedDatetime = new Date();
      } else {
        patientpc001mb.unitslno = this.user.unitslno;
        patientpc001mb.insertUser = this.authManager.getcurrentUser.username;
        patientpc001mb.insertDatetime = new Date();
      }

      patientpc001mbs.push(patientpc001mb)
    }
    console.log("patientpc001mbs", patientpc001mbs);

    if (this.slNo) {
      this.patientPcManager.patientpcupdate(patientpc001mbs).subscribe((response) => {
        this.ngOnInit();
        this.slNo = null;
      });
    } else {
      this.patientPcManager.patientpcsave(patientpc001mbs).subscribe((response) => {
        this.ngOnInit();
      })
    }
  }

}
