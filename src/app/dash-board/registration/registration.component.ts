import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { DepartmentsManager } from 'src/app/shared/services/restcontroller/bizservice/Departments.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PersonManager } from 'src/app/shared/services/restcontroller/bizservice/person.service';
import { RoleManager } from 'src/app/shared/services/restcontroller/bizservice/role.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { UnitDepartManager } from 'src/app/shared/services/restcontroller/bizservice/unitdepartmaster.service';
import { UnitManagerManager } from 'src/app/shared/services/restcontroller/bizservice/unitmaster.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { Departments001mb } from 'src/app/shared/services/restcontroller/entities/Departments001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Role001mb } from 'src/app/shared/services/restcontroller/entities/Role001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { Unitdepartmaster001mb } from 'src/app/shared/services/restcontroller/entities/Unitdepartmaster001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { UnitMaster001mb } from 'src/app/shared/services/restcontroller/entities/unitmaster001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  personId: number | any;
  dpslno: number | any;
  username: string = "";
  roleid: number | any;
  unitslno?: number | any;
  password: string = "";
  status: string = "";
  email: string = "";
  securityquestion: string = "";
  securityanswer: string = "";
  theme: string | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  name: string = "Registration.SecurityQuestion";
  type: string = "SecurityQuestion";
  dname: string = "Login.Domain";
  dtype: string = "Domain";
  cname: string = "Register.status";
  ctype: string = "register";
  users: User001mb[] = [];
  // persons: Person001mb[] = [];
  roles: Role001mb[] = [];
  systemproperties?: Systemproperties001mb[] = [];
  dsystemproperties?: Systemproperties001mb[] = [];
  csystemproperties?: Systemproperties001mb[] = [];
  public gridOptions: GridOptions | any;
  registerForm: FormGroup | any;
  submitted = false;
  departmentSettings: Departments001mb[] = [];
  unitmasters: UnitMaster001mb[] = [];
  unitarray: any = [];
  units: any = [];
  unitdepartmasters: Unitdepartmaster001mb[] = [];
  departments: Unitdepartmaster001mb[] = [];
  user?: Login001mb | any;
  constructor(
    private systemPropertiesService: SystemPropertiesService,
    private personManager: PersonManager,
    private formBuilder: FormBuilder,
    private userManager: UserManager,
    private calloutService: CalloutService,
    private authManager: AuthManager,
    private roleManager: RoleManager,
    private modalService: NgbModal,
    private unitManagerManager: UnitManagerManager,
    private departmentsManager: DepartmentsManager,
    private unitDepartManager: UnitDepartManager,
  ) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      roleid: ['', Validators.required],
      unitslno: ['', Validators.required],
      lastname: ['', Validators.required],
      dpslno: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });

    // this.loaddata();
    // this.createDataGrid001();


    this.roleManager.allrole().subscribe((response) => {
      this.roles = deserialize<Role001mb[]>(Role001mb, response);
    });

    this.unitManagerManager.allunitmanager().subscribe((response) => {
      this.unitmasters = deserialize<UnitMaster001mb[]>(UnitMaster001mb, response);
    })

    this.departmentsManager.alldepartment().subscribe(response => {
      this.departmentSettings = deserialize<Departments001mb[]>(Departments001mb, response);
      //    console.log("this.departmentSettings", this.departmentSettings)
    });

    this.unitDepartManager.allunitdepartmanager().subscribe((response) => {
      this.unitdepartmasters = deserialize<Unitdepartmaster001mb[]>(Unitdepartmaster001mb, response);
      console.log(" this.unitdepartmasters", this.unitdepartmasters);

    })


    this.registerForm.get('unitslno').valueChanges.subscribe((value: any) => {
      console.log("this.value", value);
      this.departments = [];
      for (let i = 0; i < this.unitdepartmasters.length; i++) {
        if (this.unitdepartmasters[i].unitslNo == value) {
          // console.log("this.unitdepartmasters[i]?.unitslNo2?.unitName",this.unitdepartmasters[i]?.unitslNo2?.unitName);
          this.departments.push(this.unitdepartmasters[i])
        }
      }
    });

    // this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
    //   this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
    //   console.log();

    // });
    // this.systemPropertiesService.system(this.dname, this.dtype).subscribe(response => {
    //   this.dsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
    // });
    // this.systemPropertiesService.system(this.cname, this.ctype).subscribe(response => {
    //   this.csystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
    // });

  }

  get f() { return this.registerForm.controls; }

  loaddata() {

  }


  onUserClick(event: any, registerForm: any) {

    let user001mb = new User001mb();
    user001mb.firstname = this.f.firstname.value ? this.f.firstname.value : "";
    user001mb.lastname = this.f.lastname.value ? this.f.lastname.value : "";
    user001mb.unitslno = this.f.unitslno.value ? this.f.unitslno.value : "";
    user001mb.dpslno = this.f.dpslno.value ? this.f.dpslno.value : "";
    user001mb.username = this.f.username.value ? this.f.username.value : "";
    user001mb.status = 'A'
    user001mb.roleid = this.f.roleid.value ? this.f.roleid.value : "";
    user001mb.securityquestion = 'What was your childhood nickname ?'
    user001mb.securityanswer = 'Test'
    user001mb.email = this.f.email.value ? this.f.email.value : "";
    user001mb.password = this.f.password.value ? this.f.password.value : "";

    if (this.personId) {
        user001mb.personId = this.personId;
        user001mb.insertUser = this.insertUser;
        user001mb.insertDatetime = this.insertDatetime;

        if(this.unitslno != user001mb.unitslno){
            user001mb.unitslno= this.f.unitslno.value

        }else{
            user001mb.unitslno= this.unitslno;
        }

        user001mb.updatedUser = this.authManager.getcurrentUser.username;
        user001mb.updatedDatetime = new Date();
        this.userManager.updateuser(user001mb).subscribe(response => {
            this.calloutService.showSuccess("Registration Updated Successfully");
            this.loaddata();
            this.registerForm.reset();
            this.submitted = false;
            this.personId = null;
        })
    }
    else {
        user001mb.insertUser = this.authManager.getcurrentUser.username;
        user001mb.insertDatetime = new Date();
        console.log("user001mb",user001mb);

        this.userManager.saveuser(user001mb).subscribe((response) => {
            this.calloutService.showSuccess("Registration Saved Successfully");
            this.loaddata();
            this.registerForm.reset();
            this.submitted = false;
        })
    }

}

}
