import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { deserialize } from 'serializer.ts/Serializer';
import { TreatmentManager } from 'src/app/shared/services/restcontroller/bizservice/Treatment.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ToastService } from 'src/app/shared/services/restcontroller/callout/toast.service';
import { Diagnosis001mb } from 'src/app/shared/services/restcontroller/entities/Diagnosis001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Treatment001mb } from 'src/app/shared/services/restcontroller/entities/Treatment001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-master-treatment',
  templateUrl: './master-treatment.component.html',
  styleUrls: ['./master-treatment.component.scss']
})
export class MasterTreatmentComponent implements OnInit {
  treatmentForm: FormGroup | any;
  slNo: number;
  unitslno: number;
  treatment: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  treatment001mb: Treatment001mb[] | any;
  user?: Login001mb | any;
  displayedColumns: string[] = [
    'slNo',
    'treatment',
    'action'
  ];
  dataSource: MatTableDataSource<any>;

  constructor(
    private formBuilder: FormBuilder,
    private TreatmentManager: TreatmentManager,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.treatmentForm = this.formBuilder.group({
      treatment: ['', Validators.required],
    })
    this.loadData();
  }
  loadData() {
    this.TreatmentManager.alltreatment(this.user.unitslno).subscribe(response => {
      this.treatment001mb = deserialize<Treatment001mb[]>(Treatment001mb, response);
      if (this.treatment001mb.length > 0) {
        this.dataSource = new MatTableDataSource(this.treatment001mb);
      } else {
        this.dataSource = new MatTableDataSource([]);
      }
    });
  }
  get f() { return this.treatmentForm.controls }

  editable(element) {
    this.slNo = element.slNo;
    this.unitslno = element.unitslno;
    this.insertUser = element.insertUser;
    this.insertDatetime = element.insertDatetime;
    this.treatmentForm.patchValue({
      'treatment': element.treatment,
    });
  }

  onDeleteButtonClick(element) {
    this.TreatmentManager.treatmentdelete(element.slNo).subscribe((response) => {
      for (let i = 0; i < this.treatment001mb.length; i++) {
        if (this.treatment001mb[i].slNo == element.slNo) {
          this.treatment001mb?.splice(i, 1);
          break;
        }
      }
      this.loadData();
      this.calloutService.showSuccess("Purchase Request Removed Successfully");
    });
  }


  ontreatmentForm(event: any, treatmentForm: any) {
    let treatment001mb = new Treatment001mb();

    treatment001mb.treatment = this.f.treatment.value;


    if (this.slNo) {
      treatment001mb.slNo = this.slNo;
      treatment001mb.unitslno = this.unitslno;
      treatment001mb.insertUser = this.insertUser;
      treatment001mb.insertDatetime = this.insertDatetime;
      treatment001mb.updatedUser = this.authManager.getcurrentUser.username;
      treatment001mb.updatedDatetime = new Date();
      this.TreatmentManager.treatmentupdate(treatment001mb).subscribe((response) => {
        this.toast.updateSnackBar('Treatment Updated Successfully');
        this.treatmentForm.reset();
        this.loadData();
        this.slNo = null;
      });
    } else {
      treatment001mb.unitslno = this.user.unitslno;
      treatment001mb.insertUser = this.authManager.getcurrentUser.username;
      treatment001mb.insertDatetime = new Date();
      this.TreatmentManager.treatmentsave(treatment001mb).subscribe((response) => {
        this.toast.saveSnackBar('Treatment Saved Successfully');
        this.treatmentForm.reset();
        this.loadData()
      })
    }
  }

  onCansel() {
    this.treatmentForm.reset();
  }
}
