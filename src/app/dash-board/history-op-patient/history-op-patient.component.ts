import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { PatientOpManager } from 'src/app/shared/services/restcontroller/bizservice/Patientop.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Patientop001mb } from 'src/app/shared/services/restcontroller/entities/Patientop001mb';

@Component({
  selector: 'app-history-op-patient',
  templateUrl: './history-op-patient.component.html',
  styleUrls: ['./history-op-patient.component.scss']
})
export class HistoryOpPatientComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  searchText: string = '';
  pslno: number;
  dslno: number;
  pname: string;
  age: number;
  sex: string;
  treatment: string;
  address: string;
  phone: string;
  diagnosis: string;
  fees: number;
  balance: number;
  fstatus: string;
  cdate: Date;
  rdate: Date;
  user?: Login001mb | any;
  patientop001mb: Patientop001mb[] | any;
  patientop: any[] = [];
  selectedDate = new Date();
  previewWeek = new FormControl();
  displayedColumns: string[] = [
    'slNo',
    'pslno',
    'dslno',
    'pname',
    'age',
    'sex',
    'treatment',
    'address',
    'phone',
    'diagnosis',
    'fees',
    'balance',
    'fstatus',
    'cdate',
    'rdate',
    'action'
  ];
  dataSource: MatTableDataSource<any>;

  constructor(
    private authManager: AuthManager,
    private patientOpManager: PatientOpManager,
    private router: Router,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.dataSource = new MatTableDataSource([]);
    this.patientop = []
    this.patientOpManager.allpatientop(this.user.unitslno).subscribe(response => {
      this.patientop001mb = deserialize<Patientop001mb[]>(Patientop001mb, response);
      if (this.patientop001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.patientop001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
    this.createDataGrid001();
  }


  filteredItems() {
    return this.patientop001mb?.filter(item =>
      item.dslno2.dFirstName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  rowClicked(params: any) {
    params.node.setData({
      ...params.data,
      name: true,
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
        headerName: 'Consultant Date',
        field: 'date',
        width: 200,
        // flex: 1,
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
        // flex: 1,
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
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setPatientNo.bind(this)
      },
      {
        headerName: 'Age',
        field: 'age',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Sex',
        field: 'sex',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Address',
        field: 'address',
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
        headerName: 'Phone',
        field: 'phone',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Diagnosis',
        field: 'diagnosis',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Treatment',
        field: 'treatment',
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
        headerName: 'Fees',
        field: 'fees',
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
        headerName: 'Fees Status',
        field: 'fstatus',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Remainder Date',
        field: 'date',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.rdate ? this.datePipe.transform(params.data.rdate, 'dd-MM-yyyy') : '';
        }
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

  onDeleteButtonClick(params: any) {
    this.patientOpManager.patientopdelete(params.data.slNo).subscribe((response) => {
      for (let i = 0; i < this.patientop001mb.length; i++) {
        if (this.patientop001mb[i].slNo == params.data.slNo) {
          this.patientop001mb?.splice(i, 1);
          break;
        }
      }
      const selectedRows = params.api.getSelectedRows();
      params.api.applyTransaction({ remove: selectedRows });
      this.gridOptions.api.deselectAll();
      // this.calloutService.showSuccess("Purchase Request Removed Successfully");
    });
  }


  setDoctorNo(params: any) {
    return params.data.dslno2.dFirstName
  }
  addPatient() {
    this.router.navigate(['./app-dash-board/app-patient-consultation']);
  }
  editable(element) {
    this.router.navigate(['./app-dash-board/app-patient-consultation', element.slNo]);
  }

  filteredProducts: any[];
  clearSearch() {
    this.searchText = '';
  }

  onInput(event: Event) {
    let filteredName: any = this.filteredItems()
    if (filteredName.length > 0) {
      this.gridOptions?.api?.setRowData(filteredName);
    } else {
      this.gridOptions?.api?.setRowData([]);
    }
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Backspace' && this.searchText === '') {
      this.clearSearch();
    }
  }


 

  onStartDatefilter(event){
    this.patientop=[]
    this.patientOpManager.allpatientop(this.user.unitslno).subscribe(response => {
      this.patientop001mb = deserialize<Patientop001mb[]>(Patientop001mb, response);

      for (let i = 0; i < this.patientop001mb.length; i++) {
        let cdate = this.datePipe.transform(this.patientop001mb[i].cdate, "yyyy-MM-dd");
        let startdate = this.datePipe.transform(this.range.value.start, "yyyy-MM-dd");
        let endDate = this.datePipe.transform(this.range.value.end, "yyyy-MM-dd");
        if (cdate == startdate) {
          this.patientop.push(this.patientop001mb[i])
        }
      }
      if (this.patientop.length > 0) {
        this.gridOptions?.api?.setRowData(this.patientop);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
    
   }

   onEndDatefilter(event){
    this.patientop=[]
    this.patientOpManager.allpatientop(this.user.unitslno).subscribe(response => {
      this.patientop001mb = deserialize<Patientop001mb[]>(Patientop001mb, response);
      this.patientop=[]
      for (let i = 0; i < this.patientop001mb.length; i++) {
        let cdate = this.datePipe.transform(this.patientop001mb[i].cdate, "yyyy-MM-dd");
        let startdate = this.datePipe.transform(this.range.value.start, "yyyy-MM-dd");
        let endDate = this.datePipe.transform(this.range.value.end, "yyyy-MM-dd");
        if (startdate <= cdate &&endDate >= cdate) {          
          this.patientop.push(this.patientop001mb[i])
        }
      }      
      if (this.patientop.length > 0) {
        this.gridOptions?.api?.setRowData(this.patientop);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
    
   }

   clear(){
    this.clearSearch();
    this.range.reset()
    this.patientOpManager.allpatientop(this.user.unitslno).subscribe(response => {
      this.patientop001mb = deserialize<Patientop001mb[]>(Patientop001mb, response);
      if (this.patientop001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.patientop001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
   }

}
