import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { deserialize } from 'serializer.ts/Serializer';
import { DiagnosisManager } from 'src/app/shared/services/restcontroller/bizservice/Diagnosis.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ToastService } from 'src/app/shared/services/restcontroller/callout/toast.service';
import { Diagnosis001mb } from 'src/app/shared/services/restcontroller/entities/Diagnosis001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-master-diagnosis',
  templateUrl: './master-diagnosis.component.html',
  styleUrls: ['./master-diagnosis.component.scss']
})
export class MasterDiagnosisComponent implements OnInit {

  diagnosisForm: FormGroup | any;
  slNo: number;
  unitslno: number;
  diagnosis: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  diagnosis001mb: Diagnosis001mb[] | any;
  user?: Login001mb | any;
  displayedColumns: string[] = [
    'slNo',
    'diagnosis',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  constructor(
    private formBuilder: FormBuilder,
    private diagnosisManager: DiagnosisManager,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {

    this.user = this.authManager.getcurrentUser;
    this.diagnosisForm = this.formBuilder.group({
      diagnosis: ['', Validators.required],
    })
    this.loadData();
  }

  loadData() {
    this.diagnosisManager.alldiagnosis(this.user.unitslno).subscribe(response => {
      this.diagnosis001mb = deserialize<Diagnosis001mb[]>(Diagnosis001mb, response);
      if (this.diagnosis001mb.length > 0) {
        this.dataSource = new MatTableDataSource(this.diagnosis001mb);
      } else {
        this.dataSource = new MatTableDataSource([]);
      }
    });
  }
  get f() { return this.diagnosisForm.controls }

  editable(element) {
    this.slNo = element.slNo;
    this.unitslno = element.unitslno;
    this.insertUser = element.insertUser;
    this.insertDatetime = element.insertDatetime;
    this.diagnosisForm.patchValue({
      'diagnosis': element.diagnosis,
    });
  }

  onDeleteButtonClick(element) {
    this.diagnosisManager.diagnosisdelete(element.slNo).subscribe((response) => {
      for (let i = 0; i < this.diagnosis001mb.length; i++) {
        if (this.diagnosis001mb[i].slNo == element.slNo) {
          this.diagnosis001mb?.splice(i, 1);
          break;
        }
      }
      this.loadData();
      this.calloutService.showSuccess("Purchase Request Removed Successfully");
    });
  }


  ondiagnosisForm(event: any, diagnosisForm: any) {
    let diagnosis001mb = new Diagnosis001mb();

    diagnosis001mb.diagnosis = this.f.diagnosis.value;


    if (this.slNo) {
      diagnosis001mb.slNo = this.slNo;
      diagnosis001mb.unitslno = this.unitslno;
      diagnosis001mb.insertUser = this.insertUser;
      diagnosis001mb.insertDatetime = this.insertDatetime;
      diagnosis001mb.updatedUser = this.authManager.getcurrentUser.username;
      diagnosis001mb.updatedDatetime = new Date();
      this.diagnosisManager.diagnosisupdate(diagnosis001mb).subscribe((response) => {
        this.toast.updateSnackBar('Doctor Details Updated Successfully');
        this.diagnosisForm.reset();
        this.loadData();
        this.slNo = null;
      });
    } else {
      diagnosis001mb.unitslno = this.user.unitslno;
      diagnosis001mb.insertUser = this.authManager.getcurrentUser.username;
      diagnosis001mb.insertDatetime = new Date();
      this.diagnosisManager.diagnosissave(diagnosis001mb).subscribe((response) => {
        this.toast.saveSnackBar('Doctor Details Saved Successfully');
        this.ngOnInit()
        this.loadData()
      })
    }
  }

  onCansel() {
    this.diagnosisForm.reset();
  }
}
