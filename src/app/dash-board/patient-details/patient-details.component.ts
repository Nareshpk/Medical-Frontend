import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { deserialize } from 'serializer.ts/Serializer';
import { PatientManager } from 'src/app/shared/services/restcontroller/bizservice/Patient.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ToastService } from 'src/app/shared/services/restcontroller/callout/toast.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Patient001mb } from 'src/app/shared/services/restcontroller/entities/Patient001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {

  patientForm: FormGroup | any;
  user?: Login001mb | any;
  patient001mb: Patient001mb[] | any;
  dataSource: MatTableDataSource<any>;
  slNo: number;
  unitslno: number;
  patientId: string;
  patientFname: string;
  patientLname: string;
  age: number;
  sex: string;
  diagnosis: string;
  treatment: string;
  address: string;
  phone: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  displayedColumns: string[] = [
    'slNo',
    'patientId',
    'patientFname',
    'patientLname',
    'age',
    'sex',
    'address',
    'phone',
    'action'
  ];
  count: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private patientManager: PatientManager,
    private calloutService: CalloutService,
    private datepipe: DatePipe,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.patientForm = this.formBuilder.group({
      patientId: ['', Validators.required],
      patientFname: ['', Validators.required],
      patientLname: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]

    })
    this.loadData();
  }

  loadData() {
    this.patientManager.allpatient(this.user.unitslno).subscribe(response => {
      this.patient001mb = deserialize<Patient001mb[]>(Patient001mb, response);
      if (this.patient001mb.length > 0) {
        this.dataSource = new MatTableDataSource(this.patient001mb);
      } else {
        this.dataSource = new MatTableDataSource([]);
      }
    });

    this.patientManager.getCount().subscribe(response => {
      let date = this.datepipe.transform(new Date, 'MM-yy')
      this.count = response[0].row == 0 ? 1 : parseInt(response[0].row) + 1;
      this.patientForm.patchValue({
        patientId: String(`AMK-op/${date}/`) + String(this.count).padStart(4, '0')
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
      'patientId':element.patientId,
      'patientFname':element.patientFname,
      'patientLname':element.patientLname,
      'age':element.age,
      'sex':element.sex,
      'address':element.address,
      'phone':element.phone,
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
    let patient001mb = new Patient001mb();

    patient001mb.patientId = this.f.patientId.value;
    patient001mb.patientFname = this.f.patientFname.value;
    patient001mb.patientLname = this.f.patientLname.value;
    patient001mb.age = this.f.age.value;
    patient001mb.sex = this.f.sex.value;
    patient001mb.address = this.f.address.value;
    patient001mb.phone = this.f.phone.value;


    if (this.slNo) {
      patient001mb.slNo = this.slNo;
      patient001mb.unitslno = this.unitslno;
      patient001mb.insertUser = this.insertUser;
      patient001mb.insertDatetime = this.insertDatetime;
      patient001mb.updatedUser = this.authManager.getcurrentUser.username;
      patient001mb.updatedDatetime = new Date();
      this.patientManager.patientupdate(patient001mb).subscribe((response) => {
        this.toast.updateSnackBar('Patient Updated Successfully');
        this.patientForm.reset();
        this.loadData();
        this.slNo = null;
      });
    } else {
      patient001mb.unitslno = this.user.unitslno;
      patient001mb.insertUser = this.authManager.getcurrentUser.username;
      patient001mb.insertDatetime = new Date();
      this.patientManager.patientsave(patient001mb).subscribe((response) => {
        this.toast.saveSnackBar('Patient Saved Successfully');
        this.patientForm.reset();
        this.loadData()
      })
    }
  }

  onCansel() {
    this.patientForm.reset();
  }
}
