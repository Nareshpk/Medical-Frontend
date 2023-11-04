import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { DepartmentsManager } from 'src/app/shared/services/restcontroller/bizservice/Departments.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-setting.service';
import { Departments001mb } from 'src/app/shared/services/restcontroller/entities/Departments001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/status001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
	selector: 'app-department-setting',
	templateUrl: './department-setting.component.html',
	styleUrls: ['./department-setting.component.scss']
})
export class DepartmentSettingComponent implements OnInit {


	frameworkComponents: any;
	public gridOptions: GridOptions | any;
	departmentForm: FormGroup | any;
	submitted = false;
	slNo: number | any;
	sslno: number | any;
	department: string = "";
	insertUser: string = "";
	insertDatetime: Date | any;
	updateUser: string = "";
	updateDatetime: Date | any;
	departmentSettings: Departments001mb[] = [];
	statussets: Status001mb[] = [];
	department001mb?: Departments001mb;
	user?: Login001mb | any;
	displayedColumns: string[] = [
		'slNo',
		'department',
		'sslno',
	];
	dataSource: MatTableDataSource<any>;


	constructor(private router: Router,
		private departmentsManager: DepartmentsManager,
		private datepipe: DatePipe,
		private calloutService: CalloutService,
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
		private statusSettingManager: StatusSettingManager,
		private authManager: AuthManager,
		private httpClient: HttpClient, private http: HttpClient,
	) {
		this.frameworkComponents = {
			//  linkRenderer: LinkRendererComponent,
			iconRenderer: IconRendererComponent
		}
	}

	ngOnInit(): void {
		this.user = this.authManager.getcurrentUser;

		this.departmentForm = this.formBuilder.group({
			department: ['', Validators.required],
			sslno: ['', Validators.required],
		})

		this.statusSettingManager.allstatus().subscribe(response => {
			this.statussets = deserialize<Status001mb[]>(Status001mb, response);

		});

		this.loadData();
	}

	loadData() {
		this.departmentsManager.alldepartment().subscribe(response => {
			this.departmentSettings = deserialize<Departments001mb[]>(Departments001mb, response);
			if (this.departmentSettings.length > 0) {
				this.dataSource = new MatTableDataSource(this.departmentSettings);
			} else {
				this.dataSource = new MatTableDataSource([]);
			}
		});
	}

	get f() { return this.departmentForm.controls; }
	onDepartmentFormClick(event: any, departmentForm: any) {
		let departments001mb = new Departments001mb();
		departments001mb.sslno = this.f.sslno.value ? this.f.sslno.value : "";
		departments001mb.department = this.f.department.value ? this.f.department.value : "";
		if (this.slNo) {
			departments001mb.slNo = this.slNo;
			departments001mb.insertUser = this.insertUser;
			departments001mb.insertDatetime = this.insertDatetime;
			departments001mb.updatedUser = this.authManager.getcurrentUser.username;
			departments001mb.updatedDatetime = new Date();
			this.departmentsManager.departmentupdate(departments001mb).subscribe((response) => {
				this.calloutService.showSuccess("Department Details Updated Successfully");
				this.loadData();
				this.departmentForm.reset();
				this.slNo = null;
				this.submitted = false;
			});

		}
		else {
			departments001mb.insertUser = this.authManager.getcurrentUser.username;
			departments001mb.insertDatetime = new Date();
			this.departmentsManager.departmentsave(departments001mb).subscribe((response) => {
				this.calloutService.showSuccess("Department Details Saved Successfully");
				this.loadData();
				this.departmentForm.reset();
				this.submitted = false;
			});
		}
	}

	onReset() {
		this.submitted = false;
		this.departmentForm.reset();
	}

}
