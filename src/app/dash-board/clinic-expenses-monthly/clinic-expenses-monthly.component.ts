import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { MonthlyexpensesManager } from 'src/app/shared/services/restcontroller/bizservice/Monthlyexpenses.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ToastService } from 'src/app/shared/services/restcontroller/callout/toast.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Monthlyexpenses001mb } from 'src/app/shared/services/restcontroller/entities/Monthlyexpenses001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-clinic-expenses-monthly',
  templateUrl: './clinic-expenses-monthly.component.html',
  styleUrls: ['./clinic-expenses-monthly.component.scss']
})
export class ClinicExpensesMonthlyComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  monthlyExpensesForm: FormGroup | any;
  slNo: number;
  unitslno: number;
  name: string;
  amount: number;
  notes: string;
  date: Date | any;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  monthlyexpenses001mb?: Monthlyexpenses001mb[] | any;
  user?: Login001mb | any;

  constructor(
    private monthlyexpensesManager: MonthlyexpensesManager,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private toast: ToastService,
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    let date =
      this.monthlyExpensesForm = this.formBuilder.group({
        mname: ['', Validators.required],
        mamount: ['', Validators.required],
        mnotes: ['', Validators.required],
        mdate: [this.datePipe.transform(new Date(), "yyyy-MM-dd")],
      })
    this.loadData();
    this.createDataGrid001()
  }

  loadData() {
    this.monthlyexpensesManager.allmonthlyexpenses(this.user.unitslno).subscribe(response => {
      this.monthlyexpenses001mb = deserialize<Monthlyexpenses001mb[]>(Monthlyexpenses001mb, response);
      if (this.monthlyexpenses001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.monthlyexpenses001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

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
        headerName: 'date',
        field: 'mdate',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.mdate ? this.datePipe.transform(params.data.mdate, 'dd-MM-yyyy') : '';
        }
      },

      {
        headerName: 'name',
        field: 'mname',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setPatientNo.bind(this)
      },
      {
        headerName: 'notes',
        field: 'mnotes',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'amount',
        field: 'mamount',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
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

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitslno = params.data.unitslno;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.monthlyExpensesForm.patchValue({
      'mname': params.data.mname,
      'mdate': this.datePipe.transform(params.data.mdate, "yyyy-MM-dd"),
      'mamount': params.data.mamount,
      'mnotes': params.data.mnotes,
    });
  }

  onDeleteButtonClick(params: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: { title: 'Delete', content: 'Do you want to delete?' },
      panelClass: 'custom-dialog-panel', // Add this line to apply the custom styles
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "confirm") {
        this.monthlyexpensesManager.monthlyexpensesdelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.monthlyexpenses001mb.length; i++) {
            if (this.monthlyexpenses001mb[i].slNo == params.data.slNo) {
              this.monthlyexpenses001mb?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Purchase Request Removed Successfully");
        });
      }
    });
  }

  rowClicked(params: any) {
    params.node.setData({
      ...params.data,
      name: true,
    });
  }

  get f() { return this.monthlyExpensesForm.controls; }


  onMonthlyExpensesClick(event: any, monthlyExpensesForm: any) {
    let monthlyexpenses001mb = new Monthlyexpenses001mb();
    monthlyexpenses001mb.mname = this.f.mname.value ? this.f.mname.value : "";
    monthlyexpenses001mb.mamount = this.f.mamount.value ? this.f.mamount.value : "";
    monthlyexpenses001mb.mnotes = this.f.mnotes.value ? this.f.mnotes.value : "";
    monthlyexpenses001mb.mdate = this.f.mdate.value ? new Date(this.f.mdate.value) : "";
    if (this.slNo) {
      monthlyexpenses001mb.slNo = this.slNo;
      monthlyexpenses001mb.unitslno = this.user.unitslno;
      monthlyexpenses001mb.insertUser = this.insertUser;
      monthlyexpenses001mb.insertDatetime = this.insertDatetime;
      monthlyexpenses001mb.updatedUser = this.authManager.getcurrentUser.username;
      monthlyexpenses001mb.updatedDatetime = new Date();
      this.monthlyexpensesManager.monthlyexpensesupdate(monthlyexpenses001mb).subscribe((response) => {
        this.toast.updateSnackBar('Monthly Expenses update Successfully');
        this.loadData();
        this.monthlyExpensesForm.reset();
        this.slNo = null;
        // this.submitted = false;
      });

    }
    else {
      monthlyexpenses001mb.unitslno = this.user.unitslno;
      monthlyexpenses001mb.insertUser = this.authManager.getcurrentUser.username;
      monthlyexpenses001mb.insertDatetime = new Date();
      this.monthlyexpensesManager.monthlyexpensessave(monthlyexpenses001mb).subscribe((response) => {
        this.toast.saveSnackBar('Monthly Expenses Saved Successfully');
        this.loadData();
        this.monthlyExpensesForm.reset();
        // this.submitted = false;
      });
    }
  }

}
