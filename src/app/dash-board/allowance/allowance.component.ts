import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AllowanceManager } from 'src/app/shared/services/restcontroller/bizservice/Allowance.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DoctorManager } from 'src/app/shared/services/restcontroller/bizservice/doctor.service';
import { ToastService } from 'src/app/shared/services/restcontroller/callout/toast.service';
import { Allowance001mb } from 'src/app/shared/services/restcontroller/entities/Allowance001mb';
import { Doctor001mb } from 'src/app/shared/services/restcontroller/entities/Doctor001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-allowance',
  templateUrl: './allowance.component.html',
  styleUrls: ['./allowance.component.scss']
})
export class AllowanceComponent implements OnInit {
  allowanceForm: FormGroup | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  slNo: number;
  unitslno: number;
  sslno: number;
  staffName: string;
  bikeNo: string;
  travelDurection: string;
  km: string;
  petrolePaidAmount: string;
  byingPetroleAmount: string;
  balance: string;
  reBalanceAmount: string;
  date: Date;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  doctor001mb: Doctor001mb[] | any;
  allowance001mb: Allowance001mb[] | any;
  user?: Login001mb | any;

  constructor(
    private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private doctorManager: DoctorManager,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private datepipe: DatePipe,
    private allowanceManager: AllowanceManager,
    private modalService: NgbModal,
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.loadData();
    this.allowanceForm = this.formBuilder.group({
      sslno: ['', Validators.required],
      staff_Name: ['', Validators.required],
      bike_No: ['', Validators.required],
      travel_durection: ['', Validators.required],
      km: ['', Validators.required],
      petrole_paid_amount: ['', Validators.required],
      bying_petrole_amount: ['', Validators.required],
      balance: ['', Validators.required],
      Re_Balance_amount: ['', Validators.required],
      date: ['', new Date()],
    });
  }

  loadData() {
    this.doctorManager.alldoctor(this.user.unitslno).subscribe(response => {
      this.doctor001mb = deserialize<Doctor001mb[]>(Doctor001mb, response);
    });

    this.allowanceManager.allAllowance(this.user.unitslno).subscribe(response => {
      this.allowance001mb = deserialize<Allowance001mb[]>(Allowance001mb, response);
      if (this.allowance001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.allowance001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }

    });
    this.createDataGrid001();
  }

  get f() { return this.allowanceForm.controls }


  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
        headerName: 'slNo',
        field: 'slNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Consultant Date',
        field: 'date',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.date ? this.datepipe.transform(params.data.date, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Staff Name',
        field: 'staffName',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setDoctorNo.bind(this)
      },
      {
        headerName: 'Bike No',
        field: 'bikeNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setPatientNo.bind(this)
      },
      {
        headerName: 'Travel Durection',
        field: 'travelDurection',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'KM',
        field: 'km',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'petrole_paid_amount',
        field: 'petrolePaidAmount',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: (params: any) => {
        //   return params.data.reqDate ? this.datepipe.transform(params.data.reqDate, 'dd-MM-yyyy') : '';
        // }
      },
      {
        headerName: 'Bying Petrole Amount',
        field: 'byingPetroleAmount',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Balance',
        field: 'balance',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Re-Balance Amount',
        field: 'reBalanceAmount',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: (params: any) => {
        //   return params.data.poDate ? this.datepipe.transform(params.data.poDate, 'dd-MM-yyyy') : '';
        // }
      },
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 85,
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: 'Edit'
        },
      },

      {
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 85,
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },

    ];
  }

  onEditButtonClick(params) {
    this.slNo = params.data.slNo;
    this.unitslno = params.data.unitslno;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
   let getdate = this.datepipe.transform(params.data.date,"yyyy-MM-dd")
    this.allowanceForm.patchValue({
      'sslno': params.data.sslno,
      'staff_Name': params.data.staffName,
      'bike_No': params.data.bikeNo,
      'travel_durection': params.data.travelDurection,
      'km': params.data.km,
      'petrole_paid_amount': params.data.petrolePaidAmount,
      'bying_petrole_amount': params.data.byingPetroleAmount,
      'balance': params.data.balance,
      'Re_Balance_amount': params.data.reBalanceAmount,
      'date': new Date(getdate).toISOString().split('T')[0]
    });
  }

  onDeleteButtonClick(params) {
    // const modalRef = this.modalService.open(ConformationComponent);
    // modalRef.componentInstance.details = "Purchase Requisition Slip";
    // modalRef.result.then((data) => {
    //   if (data == "Yes") {
        this.allowanceManager.allowancedelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.allowance001mb.length; i++) {
            if (this.allowance001mb[i].slNo == params.data.slNo) {
              this.allowance001mb?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.toast.saveSnackBar("Removed Successfully");
        });
    //   }
    // })
  }
  useFilter: any[] = [];
  onChange(event: any) {
    this.useFilter = [];
    let name = this.doctor001mb.find((x: any) => x.slNo == event?.target?.value)?.dFirstName
    let balance
    for (let i = 0; i < this.allowance001mb.length; i++) {
      if (this.allowance001mb[i].sslno == event?.target?.value) {
        this.useFilter.push(this.allowance001mb[i])
      }
    }
    if (this.useFilter.length == 1) {
      balance = this.useFilter.find((x: any) => x.sslno == event?.target?.value)?.balance
    }
    if (this.useFilter.length > 0) {
      this.gridOptions?.api?.setRowData(this.useFilter);
    } else {
      this.gridOptions?.api?.setRowData([]);
    }

    let getbalance = parseInt(balance) + Number(this.f.petrolePaidAmount.value)

    this.allowanceForm.patchValue({
      "staff_Name": name,
      "Re_Balance_amount": getbalance
    })

  }

  onAllowance(event: any, allowanceForm: any) {
    let allowance001mb = new Allowance001mb();
    allowance001mb.sslno = this.f.sslno.value;
    allowance001mb.staffName = this.f.staff_Name.value;
    allowance001mb.bikeNo = this.f.bike_No.value;
    allowance001mb.travelDurection = this.f.travel_durection.value;
    allowance001mb.km = this.f.km.value;
    allowance001mb.petrolePaidAmount = this.f.petrole_paid_amount.value;
    allowance001mb.byingPetroleAmount = this.f.bying_petrole_amount.value;
    allowance001mb.balance = this.f.balance.value;
    allowance001mb.reBalanceAmount = this.f.Re_Balance_amount.value;
    allowance001mb.date = this.f.date.value;
    if (this.slNo) {
      allowance001mb.slNo = this.slNo;
      allowance001mb.unitslno = this.unitslno;
      allowance001mb.insertUser = this.insertUser;
      allowance001mb.insertDatetime = this.insertDatetime;
      allowance001mb.updatedUser = this.authManager.getcurrentUser.username;
      allowance001mb.updatedDatetime = new Date();
      this.allowanceManager.allowanceupdate(allowance001mb).subscribe((response) => {
        this.toast.updateSnackBar('Patientop Updated Successfully');
        this.router.navigate(['./app-dash-board/app-home-consultation/app-home-consultation/app-list-op-patient']);
        this.loadData();
        this.slNo = null;
      });
    } else {
      allowance001mb.unitslno = this.user.unitslno;
      allowance001mb.insertUser = this.authManager.getcurrentUser.username;
      allowance001mb.insertDatetime = new Date();
      this.allowanceManager.allowancesave(allowance001mb).subscribe((response) => {
        this.toast.saveSnackBar('Patientop Saved Successfully');
        this.loadData()
      })
    }
  }

}
