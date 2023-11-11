import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departments001mb } from '../shared/services/restcontroller/entities/Departments001mb';
import { Unitdepartmaster001mb } from '../shared/services/restcontroller/entities/Unitdepartmaster001mb';
import { User001mb } from '../shared/services/restcontroller/entities/User001mb';
import { Status001mb } from '../shared/services/restcontroller/entities/status001mb';
import { UnitMaster001mb } from '../shared/services/restcontroller/entities/unitmaster001mb';
import { Router } from '@angular/router';
import { DepartmentsManager } from '../shared/services/restcontroller/bizservice/Departments.service';
import { AuthManager } from '../shared/services/restcontroller/bizservice/auth-manager.service';
import { StatusSettingManager } from '../shared/services/restcontroller/bizservice/status-setting.service';
import { UnitDepartManager } from '../shared/services/restcontroller/bizservice/unitdepartmaster.service';
import { UnitManagerManager } from '../shared/services/restcontroller/bizservice/unitmaster.service';
import { CalloutService } from '../shared/services/services/callout.service';
import { deserialize } from 'serializer.ts/Serializer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  submitted = false;
  username: string = "";
  unitslNo: number | any;
  password: string = "";
  dpslno: number | any = null;
  user001mb?: User001mb;
  departmentSettings: Departments001mb[] = [];
  unitdepartmasters: Unitdepartmaster001mb[] = [];
  departments: Unitdepartmaster001mb[] = [];
  unitmasters: UnitMaster001mb[] = [];
  statussets: Status001mb[] = [];
  toggle1: boolean = false;
  activeUnits: UnitMaster001mb[] = [];
  hide = true;
  get passwordInput() { return this.loginForm.get('password'); }
  constructor(
    private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private router: Router,
    private calloutService: CalloutService,
    private departmentsManager: DepartmentsManager,
    private unitManagerManager: UnitManagerManager,
    private unitDepartManager: UnitDepartManager,
    private statusSettingManager: StatusSettingManager,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      dpslno: [null, Validators.required],
      unitslNo: [null, Validators.required],
    });
    this.loadData();
    this.unitDepartManager.allunitdepartmanager().subscribe((response) => {
      this.unitdepartmasters = deserialize<Unitdepartmaster001mb[]>(Unitdepartmaster001mb, response);
    })

    this.unitManagerManager.allunitmanager().subscribe((response) => {
      this.unitmasters = deserialize<UnitMaster001mb[]>(UnitMaster001mb, response);
      for (let i = 0; i < this.unitmasters.length; i++) {
        if (this.unitmasters[i].status == "8") {
          this.activeUnits.push(this.unitmasters[i]);

        }
      }
    })

    // this.statusSettingManager.allstatus().subscribe(response => {
    //     this.statussets = deserialize<Status001mb[]>(Status001mb, response);

    // });



    this.loginForm.get('unitslNo').valueChanges.subscribe((value: any) => {
      console.log("this.value", value);
      this.departments = [];
      for (let i = 0; i < this.unitdepartmasters.length; i++) {
        console.log("this.unitdepartmasters", this.unitdepartmasters);

        if (this.unitdepartmasters[i].unitslNo == value) {
          // console.log("this.unitdepartmasters[i]?.unitslNo2?.unitName",this.unitdepartmasters[i]?.unitslNo2?.unitName);
          this.departments.push(this.unitdepartmasters[i])
        }
      }
    });
    console.log(" this.departments", this.departments);

  }
  get f() { return this.loginForm.controls; }

  loadData() {
    this.departmentsManager.loginDeptFindAll().subscribe(response => {
      this.departmentSettings = deserialize<Departments001mb[]>(Departments001mb, response);
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  onLogInClick(event: any, loginForm: any) {
    this.markFormGroupTouched(this.loginForm);
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authManager.login(this.f.username.value, this.f.password.value, this.f.dpslno.value, this.f.unitslNo.value).subscribe(response => {
      this.user001mb = this.authManager.getcurrentUser;
      // if (this.user001mb.status == "R") {
      // 	const modalRef = this.modalService.open(ResetPasswordComponent);
      // 	modalRef.componentInstance.user001mb = this.user001mb;
      // 	modalRef.result.then((data) => {
      // 		if (data == "Yes") {
      // 			this.router.navigate(['/app-dash-board']);
      // 		}
      // 	}, (reason) => {
      // 		if (reason == "Yes") {
      // 			this.router.navigate(['/app-dash-board']);
      // 		}
      // 	})
      // } else {
      this.router.navigate(['/app-dash-board/app-home-consultation']);

      // }

    },
      err => {
        this.calloutService.showError("Invalid User", err);
      });
  }
}
