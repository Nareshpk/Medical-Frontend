import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { DayilyexpensesManager } from 'src/app/shared/services/restcontroller/bizservice/Dayilyexpenses.service';
import { ExcelsheetManager } from 'src/app/shared/services/restcontroller/bizservice/Excelsheet.service';
import { MonthlyexpensesManager } from 'src/app/shared/services/restcontroller/bizservice/Monthlyexpenses.service';
import { PatientOpManager } from 'src/app/shared/services/restcontroller/bizservice/Patientop.service';
import { PatientPcManager } from 'src/app/shared/services/restcontroller/bizservice/Patientpc.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Dayilyexpenses001mb } from 'src/app/shared/services/restcontroller/entities/Dayilyexpenses001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Monthlyexpenses001mb } from 'src/app/shared/services/restcontroller/entities/Monthlyexpenses001mb';
import { Patientop001mb } from 'src/app/shared/services/restcontroller/entities/Patientop001mb';
import { Patientpc001mb } from 'src/app/shared/services/restcontroller/entities/Patientpc001mb';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-account-deportment',
  templateUrl: './account-deportment.component.html',
  styleUrls: ['./account-deportment.component.scss'],
})
export class AccountDeportmentComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  public gridOptionspc: GridOptions | any;
  public gridOptionsdayily: GridOptions | any;
  public gridOptionsmonthly: GridOptions | any;
  patientop001mb: Patientop001mb[] | any;
  patientpc001mb: Patientpc001mb[] | any;
  dayilyexpenses001mb?: Dayilyexpenses001mb[] | any;
  monthlyexpenses001mb?: Monthlyexpenses001mb[] | any;
  user?: Login001mb | any;
  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  })

  constructor(
    private patientOpManager: PatientOpManager,
    private authManager: AuthManager,
    private datePipe: DatePipe,
    private patientPcManager: PatientPcManager,
    private dayilyexpensesManager: DayilyexpensesManager,
    private monthlyexpensesManager: MonthlyexpensesManager,
    private excelsheetManager:ExcelsheetManager
  ) { }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.loadData()
    this.createDataGrid001();
    this.createDataGrid001pc();
    this.createDataGriddayily001();
    this.createDataGridmonthly001();
  }

  loadData() {
    this.patientOpManager.allpatientop(this.user.unitslno).subscribe(response => {
      this.patientop001mb = deserialize<Patientop001mb[]>(Patientop001mb, response);
      if (this.patientop001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.patientop001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

    this.patientPcManager.allpatientpc(this.user.unitslno).subscribe(response => {
      this.patientpc001mb = deserialize<Patientpc001mb[]>(Patientpc001mb, response);
      if (this.patientpc001mb.length > 0) {
        this.gridOptionspc?.api?.setRowData(this.patientpc001mb);
      } else {
        this.gridOptionspc?.api?.setRowData([]);
      }
    });

    this.dayilyexpensesManager.allDayilyexpenses(this.user.unitslno).subscribe(response => {
      this.dayilyexpenses001mb = deserialize<Dayilyexpenses001mb[]>(Dayilyexpenses001mb, response);
      if (this.dayilyexpenses001mb.length > 0) {
        this.gridOptionsdayily?.api?.setRowData(this.dayilyexpenses001mb);
      } else {
        this.gridOptionsdayily?.api?.setRowData([]);
      }
    });

    this.monthlyexpensesManager.allmonthlyexpenses(this.user.unitslno).subscribe(response => {
      this.monthlyexpenses001mb = deserialize<Monthlyexpenses001mb[]>(Monthlyexpenses001mb, response);
      if (this.monthlyexpenses001mb.length > 0) {
        this.gridOptionsmonthly?.api?.setRowData(this.monthlyexpenses001mb);
      } else {
        this.gridOptionsmonthly?.api?.setRowData([]);
      }
    });
  }

  createDataGrid001() {
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
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Consultant Date',
        field: 'date',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.cdate ? this.datePipe.transform(params.data.cdate, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Doctor Name',
        field: 'dslno',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setDoctorNo.bind(this)
      },
      {
        headerName: 'Patient Name',
        field: 'pname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setPatientNo.bind(this)
      },

      {
        headerName: 'Fees',
        field: 'fees',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Balance',
        field: 'balance',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Fees Status',
        field: 'fstatus',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      }
    ];
  }

  setDoctorNo(params: any) {
    return params.data.dslno2.dFirstName
  }

  createDataGrid001pc(): void {
    this.gridOptionspc = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptionspc.editType = 'fullRow';
    this.gridOptionspc.enableRangeSelection = true;
    this.gridOptionspc.animateRows = true;
    this.gridOptionspc.columnDefs = [
      {
        headerName: 'slNo',
        field: 'slNo',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Date',
        field: 'date',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.date ? this.datePipe.transform(params.data.date, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Doctor Name',
        field: 'dcslno',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setDoctorNopc.bind(this)
      },
      {
        headerName: 'Patient Name',
        field: 'pcslno',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setPatientNopc.bind(this)
      },

      {
        headerName: 'Fees',
        field: 'fees',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Balance',
        field: 'balance',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Fees Status',
        field: 'fstatus',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
    ];
  }

  setDoctorNopc(params: any) {
    return params.data.dcslno2.dFirstName
  }

  setPatientNopc(params: any) {
    return params.data.pcslno2.displayLname

  }

  createDataGriddayily001(): void {
    this.gridOptionsdayily = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptionsdayily.editType = 'fullRow';
    this.gridOptionsdayily.enableRangeSelection = true;
    this.gridOptionsdayily.animateRows = true;
    this.gridOptionsdayily.columnDefs = [
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

    ];
  }


  createDataGridmonthly001(): void {
    this.gridOptionsmonthly = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptionsmonthly.editType = 'fullRow';
    this.gridOptionsmonthly.enableRangeSelection = true;
    this.gridOptionsmonthly.animateRows = true;
    this.gridOptionsmonthly.columnDefs = [
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
    ];
  }

  onStartDatefilter(event) {

  }

  downloadExcel() {
    console.log("range----->>", this.range.value.start,this.range.value.end);
    let startdate = this.datePipe.transform(this.range.value.start, 'yyyy-MM-dd');
    let enddate = this.datePipe.transform(this.range.value.end, 'yyyy-MM-dd');
    this.excelsheetManager.downExcel(startdate, enddate,this.user.unitslno).subscribe((response) => {
      let date = new Date();
      // let newdate = this.datepipe.transform(date, 'dd-MM-yyyy');
      saveAs(response, "AudtiInvoice");
    })
  }
}
