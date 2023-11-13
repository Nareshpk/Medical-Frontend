import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { PatientmasterManager } from 'src/app/shared/services/restcontroller/bizservice/Patientmaster.service';
import { PatientPcManager } from 'src/app/shared/services/restcontroller/bizservice/Patientpc.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Patientmaster001mb } from 'src/app/shared/services/restcontroller/entities/Patientmaster001mb';
import { Patientpc001mb } from 'src/app/shared/services/restcontroller/entities/Patientpc001mb';

@Component({
  selector: 'app-history-pc-patient',
  templateUrl: './history-pc-patient.component.html',
  styleUrls: ['./history-pc-patient.component.scss']
})
export class HistoryPcPatientComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  })
  searchText: string = '';
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
      if (this.patientpc001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.patientpc001mb);
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
        headerName: 'Date',
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
        valueGetter: this.setPatientNo.bind(this)
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
      // this.calloutService.showSuccess("Purchase Request Removed Successfully");
    });
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
    this.router.navigate(['./app-dash-board/app-pc-patient-consultation', element.slNo]);
  }
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  addcustomer() {
    // this.Openpopup(0, 'Add Customer',PopupComponent);
  }

  filteredItems() {
    return this.patientpc001mb?.filter(item =>
      item.dcslno2.dFirstName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

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
    this.patientpc=[]
     this.patientPcManager.allpatientpc(this.user.unitslno).subscribe(response => {
      this.patientpc001mb = deserialize<Patientpc001mb[]>(Patientpc001mb, response);

      for (let i = 0; i < this.patientpc001mb.length; i++) {
        let cdate = this.datepipe.transform(this.patientpc001mb[i].date, "yyyy-MM-dd");
        let startdate = this.datepipe.transform(this.range.value.start, "yyyy-MM-dd");
        let endDate = this.datepipe.transform(this.range.value.end, "yyyy-MM-dd");
        if (cdate == startdate) {
          this.patientpc.push(this.patientpc001mb[i])
        }
      }
      
      
      if (this.patientpc.length > 0) {
        this.gridOptions?.api?.setRowData(this.patientpc);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
    
   }

   onEndDatefilter(event){
    this.patientpc=[]
    this.patientPcManager.allpatientpc(this.user.unitslno).subscribe(response => {
      this.patientpc001mb = deserialize<Patientpc001mb[]>(Patientpc001mb, response);
      this.patientpc=[]
      for (let i = 0; i < this.patientpc001mb.length; i++) {
        let cdate = this.datepipe.transform(this.patientpc001mb[i].date, "yyyy-MM-dd");
        let startdate = this.datepipe.transform(this.range.value.start, "yyyy-MM-dd");
        let endDate = this.datepipe.transform(this.range.value.end, "yyyy-MM-dd");
        if (startdate <= cdate &&endDate >= cdate) {          
          this.patientpc.push(this.patientpc001mb[i])
        }
      }      
      if (this.patientpc.length > 0) {
        this.gridOptions?.api?.setRowData(this.patientpc);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
    
   }

   clear(){
    this.clearSearch();
    this.range.reset()
    this.patientPcManager.allpatientpc(this.user.unitslno).subscribe(response => {
      this.patientpc001mb = deserialize<Patientpc001mb[]>(Patientpc001mb, response);
      if (this.patientpc001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.patientpc001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
   }

}
