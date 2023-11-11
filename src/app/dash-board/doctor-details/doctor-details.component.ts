import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DoctorManager } from 'src/app/shared/services/restcontroller/bizservice/doctor.service';
import { ToastService } from 'src/app/shared/services/restcontroller/callout/toast.service';
import { Doctor001mb } from 'src/app/shared/services/restcontroller/entities/Doctor001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss']
})


export class DoctorDetailsComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  slNo: number;
  unitslno: number;
  dFirstName: string;
  dLastName: string;
  specialist: string;
  dateOfBirth: Date;
  email: string;
  contact: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  doctorForm: FormGroup | any;
  doctor001mb: Doctor001mb[] | any;
  user?: Login001mb | any;

  displayedColumns: string[] = [
    'dFirstName',
    'dLastName',
    'dateOfBirth',
    'email',
    'contact',
    'action'
  ];
  dataSource: MatTableDataSource<any>;


  constructor(
    private formBuilder: FormBuilder,
    private doctorManager: DoctorManager,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.doctorForm = this.formBuilder.group({
      dfname: ['', Validators.required],
      dlname: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      specialist: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required],
    })
    this.loadData();
  }
  loadData() {
    this.doctorManager.alldoctor(this.user.unitslno).subscribe(response => {
      this.doctor001mb = deserialize<Doctor001mb[]>(Doctor001mb, response);
      if (this.doctor001mb.length > 0) {
        this.dataSource = new MatTableDataSource(this.doctor001mb);
      } else {
        this.dataSource = new MatTableDataSource([]);
      }
    });
  }
  get f() { return this.doctorForm.controls }

  editable(element) {
    this.slNo = element.slNo;
    this.unitslno = element.unitslno;
    this.insertUser = element.insertUser;
    this.insertDatetime = element.insertDatetime;
    this.doctorForm.patchValue({
      'dfname': element.dFirstName,
      'dlname': element.dLastName,
      'date_of_birth': new Date(element.dateOfBirth),
      'specialist': element.specialist,
      'email': element.email,
      'contact': element.contact
    });
  }

  onDeleteButtonClick(element) {
    this.doctorManager.doctordelete(element.slNo).subscribe((response) => {
      for (let i = 0; i < this.doctor001mb.length; i++) {
        if (this.doctor001mb[i].slNo == element.slNo) {
          this.doctor001mb?.splice(i, 1);
          break;
        }
      }
      this.loadData();
      this.calloutService.showSuccess("Purchase Request Removed Successfully");
    });
  }

  onUserPostMethod(event: any, doctorForm: any) {
    let doctor001mb = new Doctor001mb();

    doctor001mb.dFirstName = this.f.dfname.value;
    doctor001mb.dLastName = this.f.dlname.value;
    doctor001mb.specialist = this.f.specialist.value;
    doctor001mb.dateOfBirth = this.f.date_of_birth.value;
    doctor001mb.email = this.f.email.value;
    doctor001mb.contact = this.f.contact.value;

    if (this.slNo) {
      doctor001mb.slNo = this.slNo;
      doctor001mb.unitslno = this.unitslno;
      doctor001mb.insertUser = this.insertUser;
      doctor001mb.insertDatetime = this.insertDatetime;
      doctor001mb.updatedUser = this.authManager.getcurrentUser.username;
      doctor001mb.updatedDatetime = new Date();
      this.doctorManager.doctorupdate(doctor001mb).subscribe((response) => {
        this.toast.updateSnackBar('Doctor Details Updated Successfully');
        this.doctorForm.reset();
        this.loadData();
        this.slNo = null;
      });
    } else {
      doctor001mb.unitslno = this.user.unitslno;
      doctor001mb.insertUser = this.authManager.getcurrentUser.username;
      doctor001mb.insertDatetime = new Date();
      this.doctorManager.doctorsave(doctor001mb).subscribe((response) => {
        this.toast.saveSnackBar('Doctor Details Saved Successfully');
        this.doctorForm.reset();
        this.loadData()
      })
    }
  }

  onCansel() {
    this.doctorForm.reset();
  }

}
