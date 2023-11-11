import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { deserialize } from 'serializer.ts/Serializer';
import { DiagnosisManager } from 'src/app/shared/services/restcontroller/bizservice/Diagnosis.service';
import { PatientManager } from 'src/app/shared/services/restcontroller/bizservice/Patient.service';
import { PatientmasterManager } from 'src/app/shared/services/restcontroller/bizservice/Patientmaster.service';
import { PatientOpManager } from 'src/app/shared/services/restcontroller/bizservice/Patientop.service';
import { PatientPcManager } from 'src/app/shared/services/restcontroller/bizservice/Patientpc.service';
import { TreatmentManager } from 'src/app/shared/services/restcontroller/bizservice/Treatment.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DoctorManager } from 'src/app/shared/services/restcontroller/bizservice/doctor.service';
import { ToastService } from 'src/app/shared/services/restcontroller/callout/toast.service';
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
  patientpc001mb: Patientpc001mb;
  user?: Login001mb | any;
  arrayslno: any = [];
  get_data: any = [];
  patientpc001mbs: Patientpc001mb[] | any;

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
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    let id = Number(this.route.snapshot.params.id)
    this.patientPcForm = this.formBuilder.group({
      patientPcFormArry: this.formBuilder.array([this.createItem()])
    });


    this.patientPcManager.findOne(id).subscribe(response => {
      this.patientpc001mb = deserialize<Patientpc001mb>(Patientpc001mb, response);
      this.doctorslno.setValue(this.patientpc001mb.dcslno)
      this.dateslno.setValue(this.patientpc001mb.date)

      this.get_data.push(this.patientpc001mb)
      for (let i = 0; i < this.get_data.length; i++) {
        this.slNo = this.get_data[i]?.slNo;
        this.patientPcFormArry = this.f['patientPcFormArry'] as FormArray;
        this.patientPcFormArry.controls[i].controls['pcslno'].setValue(this.get_data[i]?.pcslno);
        this.patientPcFormArry.controls[i].controls['pname'].setValue(this.get_data[i]?.pname);
        this.patientPcFormArry.controls[i].controls['age'].setValue(this.get_data[i].age);
        this.patientPcFormArry.controls[i].controls['sex'].setValue(this.get_data[i].sex);
        this.patientPcFormArry.controls[i].controls['address'].setValue(this.get_data[i].address);
        this.patientPcFormArry.controls[i].controls['phone'].setValue(this.get_data[i].phone);
        this.patientPcFormArry.controls[i].controls['treatment'].setValue(this.get_data[i].treatment);
        this.patientPcFormArry.controls[i].controls['diagnosis'].setValue(this.get_data[i].diagnosis);
        this.patientPcFormArry.controls[i].controls['fees'].setValue(this.get_data[i].fees);
        this.patientPcFormArry.controls[i].controls['balance'].setValue(this.get_data[i].balance);
        this.patientPcFormArry.controls[i].controls['fstatus'].setValue(this.get_data[i].fstatus);
        this.patientPcFormArry.controls[i].controls['visit'].setValue(this.get_data[i].visit);
      }
      // this.slNo = this.patientop001mb.slNo;
      // this.unitslno = this.patientop001mb.unitslno;
      // this.insertUser = this.patientop001mb.insertUser;
      // this.insertDatetime = this.patientop001mb.insertDatetime;
      // this.patientdetailsForm.patchValue({
      //   'pslno': this.patientop001mb.pslno,
      //   'dslno': this.patientop001mb.dslno,
      //   'pname': this.patientop001mb.pname,
      //   'age': this.patientop001mb.age,
      //   'sex': this.patientop001mb.sex,
      //   'treatment': this.patientop001mb.treatment,
      //   'address': this.patientop001mb.address,
      //   'phone': this.patientop001mb.phone,
      //   'diagnosis': this.patientop001mb.diagnosis,
      //   'fees': this.patientop001mb.fees,
      //   'balance': this.patientop001mb.balance,
      //   'fstatus': this.patientop001mb.fstatus,
      //   'cdate': this.patientop001mb.cdate,
      //   'rdate': this.patientop001mb.rdate,
      // });
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
    this.patientPcManager.allpatientpc(this.user.unitslno).subscribe(response => {
      this.patientpc001mbs = deserialize<Patientpc001mb[]>(Patientpc001mb, response);
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
      visit: ['', Validators.required],
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
    let patientpc = this.patientpc001mbs.filter((x) => { return x.pcslno == event })
    console.log("patientpc", patientpc);

    this.patientPcFormArry = this.f['patientPcFormArry'] as FormArray;
    this.patientPcFormArry.controls[index].controls['pname'].setValue(details?.displayLname);
    this.patientPcFormArry.controls[index].controls['age'].setValue(details.age);
    this.patientPcFormArry.controls[index].controls['sex'].setValue(details.sex);
    this.patientPcFormArry.controls[index].controls['address'].setValue(details.address);
    this.patientPcFormArry.controls[index].controls['phone'].setValue(details.phone);
    this.patientPcFormArry.controls[index].controls['treatment'].setValue(details.treatment);
    this.patientPcFormArry.controls[index].controls['diagnosis'].setValue(details.diagnosis);
    this.patientPcFormArry.controls[index].controls['visit'].setValue(patientpc.length + 1);
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
    let doc_and_date = [{
      dcslno: this.doctorslno.value,
      date: this.dateslno.value
    }]
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
        patientpc001mb.slNo = this.get_data[i]?.slNo;
        patientpc001mb.unitslno = this.user.unitslno;
        patientpc001mb.insertUser = this.authManager.getcurrentUser.username;
        patientpc001mb.insertDatetime = new Date();
        patientpc001mb.updatedUser = this.authManager.getcurrentUser.username;
        patientpc001mb.updatedDatetime = new Date();
      } else {
        patientpc001mb.unitslno = this.user.unitslno;
        patientpc001mb.insertUser = this.authManager.getcurrentUser.username;
        patientpc001mb.insertDatetime = new Date();
      }

      patientpc001mbs.push(patientpc001mb)
    }

    if (this.slNo) {
      this.patientPcManager.patientpcupdate(patientpc001mbs).subscribe((response) => {
        this.toast.updateSnackBar('Patient Updated Successfully');
        this.router.navigate(['./app-dash-board/app-home-consultation']);
        this.ngOnInit();
        this.slNo = null;
      });
    } else {
      this.patientPcManager.patientpcsave(patientpc001mbs).subscribe((response) => {
        this.toast.saveSnackBar('Patient Updated Successfully');
        this.router.navigate(['./app-dash-board/app-home-consultation']);
        this.ngOnInit();
      })
    }
  }

}
