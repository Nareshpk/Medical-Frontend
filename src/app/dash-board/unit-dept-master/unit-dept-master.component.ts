import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
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
            this.dataSource = new MatTableDataSource(this.unitdepartmasters);
          } else {
            this.dataSource = new MatTableDataSource([]);
          }
      })

  }

  get f() { return this.UnitDepartMasterForm.controls; }

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
