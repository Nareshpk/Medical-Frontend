import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { PatientmasterManager } from 'src/app/shared/services/restcontroller/bizservice/Patientmaster.service';
import { PatientOpManager } from 'src/app/shared/services/restcontroller/bizservice/Patientop.service';
import { PatientPcManager } from 'src/app/shared/services/restcontroller/bizservice/Patientpc.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Patientmaster001mb } from 'src/app/shared/services/restcontroller/entities/Patientmaster001mb';
import { Patientop001mb } from 'src/app/shared/services/restcontroller/entities/Patientop001mb';
import { Patientpc001mb } from 'src/app/shared/services/restcontroller/entities/Patientpc001mb';


@Component({
  selector: 'app-list-pc-patient',
  templateUrl: './list-pc-patient.component.html',
  styleUrls: ['./list-pc-patient.component.scss']
})
export class ListPcPatientComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  patientpc: any[] = [];
  patientpcall: any[] = [];
  previewWeek = new FormControl();
  pcslno: number;
  dcslno: number;
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
  patientpc001mb: Patientpc001mb[] | any;
  patientmaster001mb: Patientmaster001mb[] | any;
  displayedColumns: string[] = [
    'slNo',
    'pcslno',
    'dcslno',
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
    // 'date',
    // 'action'
  ];
  // displayedColumns: string[] = ["code", "name", "email", "phone", "status", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  dataSource: MatTableDataSource<any>;

  constructor(
    private authManager: AuthManager,
    private patientPcManager: PatientPcManager,
    private router: Router,
    private datepipe: DatePipe,
    private patientmasterManager: PatientmasterManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.patientmasterManager.allpatientmaster(this.user.unitslno).subscribe(response => {
      this.patientmaster001mb = deserialize<Patientmaster001mb[]>(Patientmaster001mb, response);
    });

    this.patientPcManager.allpatientpc(this.user.unitslno).subscribe(response => {
      this.patientpc001mb = deserialize<Patientpc001mb[]>(Patientpc001mb, response);
      for (let i = 0; i < this.patientpc001mb.length; i++) {
        let cdate = this.datepipe.transform(this.patientpc001mb[i].date, "yyyy-MM-dd");
        let currentdate = this.datepipe.transform(new Date(), "yyyy-MM-dd");
        if (cdate == currentdate) {
          this.patientpcall.push(this.patientpc001mb[i])
        }else{

        }
      }
      if (this.patientpcall.length > 0) {
        this.gridOptions?.api?.setRowData(this.patientpcall);
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
          return params.data.date ? this.datepipe.transform(params.data.date, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Doctor Name',
        field: 'dcslno',
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
        field: 'pcslno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setPatientId.bind(this)
      },
      {
        headerName: 'Patient Name',
        field: 'pcslno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setPatientNo.bind(this)
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
        headerName: 'Fees status',
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
    this.router.navigate(['./app-dash-board/app-pc-patient-consultation', params.data.slNo]);
  }

  onDeleteButtonClick(params: any) {
    this.patientmasterManager.patientmasterdelete(params.data.slNo).subscribe((response) => {
      for (let i = 0; i < this.patientmaster001mb.length; i++) {
        if (this.patientmaster001mb[i].slNo == params.data.slNo) {
          this.patientmaster001mb?.splice(i, 1);
          break;
        }
      }
      const selectedRows = params.api.getSelectedRows();
      params.api.applyTransaction({ remove: selectedRows });
      this.gridOptions.api.deselectAll();
    });
  }

  setPatientId(params: any){
    return params.data.pcslno2.pcPatientId
  }
  setDoctorNo(params: any) {
    return params.data.dcslno2.dFirstName
  }

  setPatientNo(params: any) {
    return params.data.pcslno2.displayLname

  }

  addPatient() {
    this.router.navigate(['./app-dash-board/app-pc-patient-consultation']);
  }
  editable(element) {
    
  }
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  addcustomer() {
    // this.Openpopup(0, 'Add Customer',PopupComponent);
  }
  filteredProducts: any[];
  onSearchChange(searchValue: string): void {
    this.filteredProducts = [];
    if (searchValue.length > 2) {
      this.patientPcManager.allpatientpc(this.user.unitslno).subscribe(response => {
        this.patientpc001mb = deserialize<Patientpc001mb[]>(Patientpc001mb, response);

        this.filteredProducts = this.patientpc001mb.filter(product =>
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
    this.patientpc=[]
    this.patientPcManager.allpatientpc(this.user.unitslno).subscribe(response => {
      this.patientpc001mb = deserialize<Patientpc001mb[]>(Patientpc001mb, response);

      for (let i = 0; i < this.patientpc001mb.length; i++) {
        let cdate = this.datepipe.transform(this.patientpc001mb[i].date, "yyyy-MM-dd");
        let currentdate = this.datepipe.transform(this.previewWeek.value, "yyyy-MM-dd");
        if (cdate == currentdate) {
          this.patientpc.push(this.patientpc001mb[i])
        }else{

        }
      }
      if (this.patientpc.length > 0) {
        this.gridOptions?.api?.setRowData(this.patientpc);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
   }

}
