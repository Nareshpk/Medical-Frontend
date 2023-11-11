import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { PatientOpManager } from 'src/app/shared/services/restcontroller/bizservice/Patientop.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Patientop001mb } from 'src/app/shared/services/restcontroller/entities/Patientop001mb';

@Component({
  selector: 'app-list-op-patient',
  templateUrl: './list-op-patient.component.html',
  styleUrls: ['./list-op-patient.component.scss']
})
export class ListOpPatientComponent implements OnInit {
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
  ) { 
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.dataSource = new MatTableDataSource([]);
    this.patientop=[]
    this.patientOpManager.allpatientop(this.user.unitslno).subscribe(response => {
      this.patientop001mb = deserialize<Patientop001mb[]>(Patientop001mb, response);
      for (let i = 0; i < this.patientop001mb.length; i++) {
        let cdate = this.datePipe.transform(this.patientop001mb[i].cdate, "yyyy-MM-dd");
        let currentdate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
        if (cdate == currentdate) {
          this.patientop.push(this.patientop001mb[i])
        }
      }
      if (this.patientop.length > 0) {
        this.gridOptions?.api?.setRowData(this.patientop);
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
        headerName: 'date',
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
        headerName: 'dcslno',
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
        headerName: 'pname',
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
        headerName: 'age',
        field: 'age',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'sex',
        field: 'sex',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'treatment',
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
        headerName: 'diagnosis',
        field: 'diagnosis',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'phone',
        field: 'phone',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'fees',
        field: 'fees',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'balance',
        field: 'balance',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'fstatus',
        field: 'fstatus',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },{
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
    // this.slNo = params.data.slNo;
    // this.unitslno = params.data.unitslno;
    // this.insertUser = params.data.insertUser;
    // this.insertDatetime = params.data.insertDatetime;
    // this.dayilyExpensesForm.patchValue({
    //   'name': params.data.name,
    //   'date': this.datePipe.transform(params.data.date, "yyyy-MM-dd"),
    //   'amount': params.data.amount,
    //   'notes': params.data.notes,
    // });
    this.router.navigate(['./app-dash-board/app-patient-consultation', params.data.slNo]);
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

  setPatientNo(params: any) {
    return params.data.pslno2.displayLname

  }

  addPatient() {
    this.router.navigate(['./app-dash-board/app-patient-consultation']);
  }
  editable(element) {
   
  }

  filteredProducts: any[];
  onSearchChange(searchValue: string): void {
    this.filteredProducts = [];
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
    this.patientop=[]
    this.dataSource = new MatTableDataSource([]);
    this.patientOpManager.allpatientop(this.user.unitslno).subscribe(response => {
      this.patientop001mb = deserialize<Patientop001mb[]>(Patientop001mb, response);
      for (let i = 0; i < this.patientop001mb.length; i++) {
        let cdate = this.datePipe.transform(this.patientop001mb[i].cdate, "yyyy-MM-dd");
        let currentdate = this.datePipe.transform(this.previewWeek.value, "yyyy-MM-dd");
        if (cdate == currentdate) {
          this.patientop.push(this.patientop001mb[i])
        }else{

        }
      }
      if (this.patientop.length > 0) {
        this.dataSource = new MatTableDataSource(this.patientop);
      } else {
        this.dataSource = new MatTableDataSource([]);
      }
    });
   }
}
