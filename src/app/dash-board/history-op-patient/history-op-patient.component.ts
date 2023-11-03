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
    this.patientop=[]
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
          // onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },

    ];
  }

  setDoctorNo(params: any) {
    return params.data.dslno2.dFirstName
  }
  addPatient() {
    this.router.navigate(['./app-dash-board/app-patient-consultation']);
  }
  editable(element) {
    console.log("element", element);
    this.router.navigate(['./app-dash-board/app-patient-consultation', element.slNo]);
  }

  filteredProducts: any[];
  onSearchChange(searchValue: string): void {
    this.filteredProducts = [];
    console.log(searchValue.length);
    if (searchValue.length > 2) {
      this.patientOpManager.allpatientop(this.user.unitslno).subscribe(response => {
        this.patientop001mb = deserialize<Patientop001mb[]>(Patientop001mb, response);

        this.filteredProducts = this.patientop001mb.filter(product =>
          product.dcslno2.dFirstName.toLowerCase().includes(searchValue.toLowerCase())
        );

        if (this.filteredProducts.length > 0) {
          this.gridOptions?.api?.setRowData(this.filteredProducts);
        } else {

          this.gridOptions?.api?.setRowData([]);

        }
      });
    } else {
      if (searchValue.length == 0) {
        this.filteredProducts =[]
      }

    }
  }

  resetAwardLevelOnDobChange() {
    console.log("this.previewWeek.value",this.previewWeek.value);
   
   }

   onDatefilter(event){
    this.patientop=[]
    console.log("start",this.range.value.start);
    console.log("end",this.range.value.end); 
    this.dataSource = new MatTableDataSource([]);
    this.patientOpManager.allpatientop(this.user.unitslno).subscribe(response => {
      this.patientop001mb = deserialize<Patientop001mb[]>(Patientop001mb, response);
    
      for (let i = 0; i < this.patientop001mb.length; i++) {
        let cdate = this.datePipe.transform(this.patientop001mb[i].cdate, "yyyy-MM-dd");
        let startdate = this.datePipe.transform(this.range.value.start, "yyyy-MM-dd");
        let endDate = this.datePipe.transform(this.range.value.end, "yyyy-MM-dd");
      
        console.log("test and Test else");
        if (cdate == startdate) {
          this.patientop.push(this.patientop001mb[i])
        }
      }
      console.log('this.patientop',this.patientop);
      
      if (this.patientop.length > 0) {
        this.gridOptions?.api?.setRowData(this.patientop);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
    
   }

   onDateendfilter(event){
    this.patientop=[]
    console.log("start",this.range.value.start);
    console.log("end",this.range.value.end); 
    this.patientOpManager.allpatientop(this.user.unitslno).subscribe(response => {
      this.patientop001mb = deserialize<Patientop001mb[]>(Patientop001mb, response);
    
      for (let i = 0; i < this.patientop001mb.length; i++) {
        let cdate = this.datePipe.transform(this.patientop001mb[i].cdate, "yyyy-MM-dd");
        let startdate = this.datePipe.transform(this.range.value.start, "yyyy-MM-dd");
        let endDate = this.datePipe.transform(this.range.value.end, "yyyy-MM-dd");
        if (startdate <= cdate && endDate >= cdate) {
          this.patientop.push(this.patientop001mb[i])
        }
      }
      console.log('this.patientop',this.patientop);
      
      if (this.patientop.length > 0) {
        this.gridOptions?.api?.setRowData(this.patientop);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
    
   }

}
