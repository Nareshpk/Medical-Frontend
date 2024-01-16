import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { DepartmentsManager } from 'src/app/shared/services/restcontroller/bizservice/Departments.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { UnitDepartManager } from 'src/app/shared/services/restcontroller/bizservice/unitdepartmaster.service';
import { UnitManagerManager } from 'src/app/shared/services/restcontroller/bizservice/unitmaster.service';
import { Departments001mb } from 'src/app/shared/services/restcontroller/entities/Departments001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Unitdepartmaster001mb } from 'src/app/shared/services/restcontroller/entities/Unitdepartmaster001mb';
import { UnitMaster001mb } from 'src/app/shared/services/restcontroller/entities/unitmaster001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-unit-dept-master',
  templateUrl: './unit-dept-master.component.html',
  styleUrls: ['./unit-dept-master.component.scss']
})
export class UnitDeptMasterComponent implements OnInit {

  frameworkComponents: any;
  departslNo: number | any;
  slNo: number | any;
  unitslNo: string = "";
  insertUser: string = "";
  user?: Login001mb;
  insertDatetime: Date | any;
  // user001mbs: User001mb[] = [];
  unitmasters: UnitMaster001mb[] = [];
  unitdepartmasters: Unitdepartmaster001mb[] = [];
  departmentSettings: Departments001mb[] = [];
  // statussets: Status001mb[] = [];
  // statusproperty: Status001mb[] = [];
  public gridOptions: GridOptions | any;
  UnitDepartMasterForm: FormGroup | any;
  submitted = false;
  displayedColumns: string[] = [
    'slNo',
    'unitslNo',
    'departslNo',
  ];
  dataSource: MatTableDataSource<any>;

  constructor(private formBuilder: FormBuilder,
    // private roleManager: RoleManager,
    // private userManager: UserManager,
    private calloutService: CalloutService,
    private authManager: AuthManager,
    private modalService: NgbModal,
    private unitManagerManager: UnitManagerManager,
    private departmentsManager: DepartmentsManager,
    private statusSettingManager: StatusSettingManager,
    private unitDepartManager: UnitDepartManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit() {
    this.user = this.authManager.getcurrentUser;

    this.UnitDepartMasterForm = this.formBuilder.group({
      unitslNo: [null, Validators.required],
      departslNo: [null, Validators.required],
    });


    this.departmentsManager.alldepartment().subscribe(response => {
      this.departmentSettings = deserialize<Departments001mb[]>(Departments001mb, response);
      console.log("this.departmentSettings ", this.departmentSettings)
    });
    this.unitManagerManager.allunitmanager().subscribe((response) => {
      this.unitmasters = deserialize<UnitMaster001mb[]>(UnitMaster001mb, response);
      console.log("this.unitmasters ", this.unitmasters)
    })
    this.createDataGrid001();

    this.loadData();


  }


  loadData() {
    // this.roleManager.allrole().subscribe((response) => {
    //     this.roles = deserialize<Role001mb[]>(Role001mb, response);
    // });

    this.unitDepartManager.allunitdepartmanager().subscribe((response) => {
      this.unitdepartmasters = deserialize<Unitdepartmaster001mb[]>(Unitdepartmaster001mb, response);
      console.log("this.unitdepartmasters ", this.unitdepartmasters);
      if (this.unitdepartmasters.length > 0) {
        this.gridOptions?.api?.setRowData(this.unitdepartmasters);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    })

  }

  get f() { return this.UnitDepartMasterForm.controls; }

  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
      onFirstDataRendered: this.onFirstDataRendered.bind(this)
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
        headerName: '#Id',
        field: 'slNo',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Unit Name',
        field: "unitName",
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setUnitName.bind(this)
      },
      {
        headerName: 'Department Name',
        field: "deptslNo",
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setDeptName.bind(this)
      },

      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 200,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: 'Edit'
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
        }
      },

    ];
  }

  setDeptName(params: any): string {
    return params.data.departslNo2 ? params.data.departslNo2?.department : null;
  }

  setUnitName(params: any): string {
    return params.data.unitslNo2 ? params.data.unitslNo2?.unitName : null;
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onEditButtonClick(params: any) {
    // this.id = params.data.id;
    console.log("params--edit", params);
    this.slNo = params.data.slNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.UnitDepartMasterForm.patchValue({
      'departslNo': params.data.departslNo,
      'unitslNo': params.data.unitslNo,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(DeleteDialogComponent);
    modalRef.componentInstance.details = "Unit Master";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.unitDepartManager.deleteunitdepartmanager(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.unitdepartmasters.length; i++) {
            if (this.unitdepartmasters[i].slNo == params.data.slNo) {
              this.unitdepartmasters?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.calloutService.showSuccess("Unit Master data Removed Successfully");
        });
      }
    })
  }

  onUnitDepartMasterClick(event: any, UnitDepartMasterForm: any) {

    let unitDepartMaster001mb = new Unitdepartmaster001mb();
    unitDepartMaster001mb.departslNo = this.f.departslNo.value ? this.f.departslNo.value : "";
    unitDepartMaster001mb.unitslNo = this.f.unitslNo.value ? this.f.unitslNo.value : "";
    // unitDepartMaster001mb.insertUser = this.insertUser;
    // unitDepartMaster001mb.insertDatetime = new Date();
    // unitDepartMaster001mb.updatedUser = this.authManager.getcurrentUser.username;
    // unitDepartMaster001mb.updatedDatetime = new Date();
    if (this.slNo) {
      unitDepartMaster001mb.slNo = this.slNo;
      unitDepartMaster001mb.insertUser = this.insertUser;
      unitDepartMaster001mb.insertDatetime = this.insertDatetime;
      unitDepartMaster001mb.updatedUser = this.authManager.getcurrentUser.username;
      unitDepartMaster001mb.updatedDatetime = new Date();
      this.unitDepartManager.updateunitdepartmanager(unitDepartMaster001mb).subscribe(response => {
        this.calloutService.showSuccess("Unit Deartment Master Updated Successfully");
        this.loadData();
        this.submitted = false;
        this.slNo = null;
      })
    }
    else {
      unitDepartMaster001mb.insertUser = this.authManager.getcurrentUser.username;
      unitDepartMaster001mb.insertDatetime = new Date();
      this.unitDepartManager.saveunitdepartmanager(unitDepartMaster001mb).subscribe(response => {
        this.calloutService.showSuccess("Unit Deartment Master Saved Successfully");
        this.UnitDepartMasterForm.reset();
        this.loadData();
        this.submitted = false;
        this.slNo = null;
      });
    }


  }

  onReset() {
    this.UnitDepartMasterForm.reset();
    this.submitted = false;

  }
}
