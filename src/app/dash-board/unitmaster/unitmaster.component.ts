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
import { UnitManagerManager } from 'src/app/shared/services/restcontroller/bizservice/unitmaster.service';
import { Departments001mb } from 'src/app/shared/services/restcontroller/entities/Departments001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/status001mb';
import { UnitMaster001mb } from 'src/app/shared/services/restcontroller/entities/unitmaster001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
    selector: 'app-unitmaster',
    templateUrl: './unitmaster.component.html',
    styleUrls: ['./unitmaster.component.scss']
})
export class UnitmasterComponent implements OnInit {
    frameworkComponents: any;
    slNo: number | any;
    unitName: string = "";
    unitDescribtion: string = "";
    status: string = "";
    insertUser: string = "";
    user?: Login001mb | any;
    insertDatetime: Date | any;
    // user001mbs: User001mb[] = [];
    unitmasters: UnitMaster001mb[] = [];
    departmentSettings: Departments001mb[] = [];
    statussets: Status001mb[] = [];
    statusproperty: Status001mb[] = [];
    public gridOptions: GridOptions | any;
    unitmasterForm: FormGroup | any;
    submitted = false;
    displayedColumns: string[] = [
        'slNo',
        'unitName',
        'unitDescribtion',
        'status'
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
    ) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.user = this.authManager.getcurrentUser;

        this.unitmasterForm = this.formBuilder.group({
            unitName: [null, Validators.required],
            unitDescribtion: [null, Validators.required],
            status: [null, Validators.required],
        });
        this.createDataGrid001();
        this.statusSettingManager.allstatus().subscribe(response => {
            this.statussets = deserialize<Status001mb[]>(Status001mb, response);
            for (let i = 0; i < this.statussets.length; i++) {
                if (this.statussets[i].codeGroup == 4) {
                    this.statusproperty.push(this.statussets[i]);
                }
            }
        });

        this.loadData();


    }

    loadData() {
        // this.roleManager.allrole().subscribe((response) => {
        //     this.roles = deserialize<Role001mb[]>(Role001mb, response);
        // });

        this.unitManagerManager.allunitmanager().subscribe((response) => {
            this.unitmasters = deserialize<UnitMaster001mb[]>(UnitMaster001mb, response);
            console.log("unitmasters", this.unitmasters);
            
            if (this.unitmasters.length > 0) {
                this.gridOptions?.api?.setRowData(this.unitmasters);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })

    }
    get f() { return this.unitmasterForm.controls; }

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
                headerName: 'User Name',
                field: "unitName",
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Unit Description',
                field: "unitDescribtion",
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Status',
                field: "status",
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setStatusName.bind(this)
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
        return params.data.deptslNo2 ? params.data.deptslNo2?.department : null;
    }
    setStatusName(params: any): string {
        let stat:any;
        stat= params.data.status ?  this.statussets.find(x => x.slNo ==params.data.status )?.name : "";
        return stat;
    }
    onEditButtonClick(params: any) {
        // this.id = params.data.id;
        this.slNo = params.data.slNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.unitmasterForm.patchValue({
            'deptslNo': params.data.deptslNo,
            'unitName': params.data.unitName,
            'unitDescribtion': params.data.unitDescribtion,
            'status': params.data.status,
        });
    }

    onDeleteButtonClick(params: any) {
        let stat: any;
        stat = params.data.status ? this.statussets.find(x => x.slNo == params.data.status)?.name : "";
        if (stat != 'ACTIVE') {
            console.log("stat", stat);

            const modalRef = this.modalService.open(DeleteDialogComponent);
            modalRef.componentInstance.details = "Unit Master";
            modalRef.result.then((data) => {
                if (data == "Yes") {
                    this.unitManagerManager.deleteunitmanager(params.data.slNo).subscribe((response) => {
                        for (let i = 0; i < this.unitmasters.length; i++) {
                            if (this.unitmasters[i].slNo == params.data.slNo) {
                                this.unitmasters?.splice(i, 1);
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
        else {
            this.calloutService.showWarning("This Unit Master can't be deleted");
        }
    }

    onFirstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }
    onUnitMasterClick(event: any, unitmasterForm: any) {

        let unitMaster001mb = new UnitMaster001mb();
        unitMaster001mb.unitName = this.f.unitName.value ? this.f.unitName.value : "";
        unitMaster001mb.unitDescribtion = this.f.unitDescribtion.value ? this.f.unitDescribtion.value : "";
        unitMaster001mb.status = this.f.status.value ? this.f.status.value : "";
        unitMaster001mb.insertUser = this.insertUser;
        unitMaster001mb.insertDatetime = new Date();
        unitMaster001mb.updatedUser = this.authManager.getcurrentUser.username;
        unitMaster001mb.updatedDatetime = new Date();
        if (this.slNo) {
            unitMaster001mb.slNo = this.slNo;
            unitMaster001mb.insertUser = this.insertUser;
            unitMaster001mb.insertDatetime = this.insertDatetime;
            unitMaster001mb.updatedUser = this.authManager.getcurrentUser.username;
            unitMaster001mb.updatedDatetime = new Date();
            this.unitManagerManager.updateunitmanager(unitMaster001mb).subscribe(response => {
                this.calloutService.showSuccess("Unit Master Updated Successfully");
                this.loadData();
                this.submitted = false;
                this.slNo = null;
            })
        }
        else {
            unitMaster001mb.insertUser = this.authManager.getcurrentUser.username;
            unitMaster001mb.insertDatetime = new Date();
            this.unitManagerManager.saveunitmanager(unitMaster001mb).subscribe(response => {
                this.calloutService.showSuccess("Unit Master Saved Successfully");
                this.unitmasterForm.reset();
                this.loadData();
                this.submitted = false;
                this.slNo = null;
            });
        }


    }

    onReset() {
        this.unitmasterForm.reset();
        this.submitted = false;

    }
}
