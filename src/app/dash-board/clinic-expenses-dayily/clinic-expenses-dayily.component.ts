import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { DayilyexpensesManager } from 'src/app/shared/services/restcontroller/bizservice/Dayilyexpenses.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Dayilyexpenses001mb } from 'src/app/shared/services/restcontroller/entities/Dayilyexpenses001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';


@Component({
  selector: 'app-clinic-expenses-dayily',
  templateUrl: './clinic-expenses-dayily.component.html',
  styleUrls: ['./clinic-expenses-dayily.component.scss']
})
export class ClinicExpensesDayilyComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  dayilyExpensesForm: FormGroup | any;
  slNo: number;
  unitslno: number;
  name: string;
  amount: number;
  notes: string;
  date: Date |any;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  dayilyexpenses001mb?: Dayilyexpenses001mb[] | any;
  user?: Login001mb | any;

  constructor(
    private dayilyexpensesManager: DayilyexpensesManager,
    private datePipe: DatePipe,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authManager: AuthManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    let date =
      this.dayilyExpensesForm = this.formBuilder.group({
        name: ['', Validators.required],
        amount: ['', Validators.required],
        notes: ['', Validators.required],
        date: [this.datePipe.transform(new Date(), "yyyy-MM-dd")],
      })
    this.loadData();
    this.createDataGrid001()
  }

  loadData() {
    this.dayilyexpensesManager.allDayilyexpenses(this.user.unitslno).subscribe(response => {
      this.dayilyexpenses001mb = deserialize<Dayilyexpenses001mb[]>(Dayilyexpenses001mb, response);
      if (this.dayilyexpenses001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.dayilyexpenses001mb);
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
        field: 'date',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.date ? this.datePipe.transform(params.data.date, 'dd-MM-yyyy') : '';
        }
      },

      {
        headerName: 'name',
        field: 'name',
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
        field: 'notes',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'amount',
        field: 'amount',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 85,
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          // onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },

    ];
  }

  rowClicked(params: any) {
    params.node.setData({
      ...params.data,
      name: true,
    });
  }

  get f() { return this.dayilyExpensesForm.controls; }


  onDayilyExpensesClick(event: any, dayilyExpensesForm: any) {
    let dayilyexpenses001mb = new Dayilyexpenses001mb();
    dayilyexpenses001mb.name = this.f.name.value ? this.f.name.value : "";
    dayilyexpenses001mb.amount = this.f.amount.value ? this.f.amount.value : "";
    dayilyexpenses001mb.notes = this.f.notes.value ? this.f.notes.value : "";
    dayilyexpenses001mb.date = this.f.date.value ? new Date(this.f.date.value) : "";
    if (this.slNo) {
      dayilyexpenses001mb.slNo = this.slNo;
      dayilyexpenses001mb.unitslno = this.user.unitslno;
      dayilyexpenses001mb.insertUser = this.insertUser;
      dayilyexpenses001mb.insertDatetime = this.insertDatetime;
      dayilyexpenses001mb.updatedUser = this.authManager.getcurrentUser.username;
      dayilyexpenses001mb.updatedDatetime = new Date();
      this.dayilyexpensesManager.dayilyexpensesupdate(dayilyexpenses001mb).subscribe((response) => {
        this.calloutService.showSuccess("Department Details Updated Successfully");
        this.loadData();
        this.dayilyExpensesForm.reset();
        this.slNo = null;
        // this.submitted = false;
      });

    }
    else {
      dayilyexpenses001mb.unitslno = this.user.unitslno;
      dayilyexpenses001mb.insertUser = this.authManager.getcurrentUser.username;
      dayilyexpenses001mb.insertDatetime = new Date();
      this.dayilyexpensesManager.dayilyexpensessave(dayilyexpenses001mb).subscribe((response) => {
        this.calloutService.showSuccess("Department Details Saved Successfully");
        this.loadData();
        this.dayilyExpensesForm.reset();
        // this.submitted = false;
      });
    }
  }

}
