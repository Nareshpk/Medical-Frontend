import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { CustomerContactManager } from '../services/restcontroller/bizservice/customer-contact.service';
import { Customercontact001wb } from '../services/restcontroller/entities/Customercontact001wb';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-add-customer-contact',
  templateUrl: './add-customer-contact.component.html',
  styleUrls: ['./add-customer-contact.component.css']
})
export class AddCustomerContactComponent implements OnInit {
  @Input() customercontacts: any;
  @Input() customercontact: any;
  @Input() custemerRegForm: any;
  customerContactForm: FormGroup | any;
  customerContactFormArray: FormArray | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  submitted = false;
  slNo: number | any;
  customerslNo: number | any;
  pname: string = '';
  designation: string = '';
  department?: string = '';
  level?: string = '';
  mnumber: number | any;
  altmnumber: number | any;
  mailid: string = '';
  insertUser: string = '';
  insertDatetime: Date | any;
  updatedUser: string | null = '';
  updatedDatetime: Date | any;
  user?: Login001mb | any;
  unitslno?: number;
  customerContact001wbs: Customercontact001wb[] = [];
  customerContact001wb?: Customercontact001wb;
  customercontactSlno: number | any;
  buttonDisabled?: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private customerContactManager: CustomerContactManager,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal,
    private httpClient: HttpClient,
    private http: HttpClient
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent,
    };
  }


  ngOnInit(): void {

    if(this.customercontacts.length > 0) {            
      this.buttonDisabled = true;
     }
     else {
      this.buttonDisabled = false;
    }
    
    this.user = this.authManager.getcurrentUser;
    this.customerContactForm = this.formBuilder.group({
      customerContactFormArray: this.formBuilder.array([this.createItem()]),
    });

    this.customerContactManager
      .suppliercontactall(this.user.unitslno)
      .subscribe((response) => {
        this.customerContact001wbs = deserialize<
          Customercontact001wb[]
        >(Customercontact001wb, response);
      });

  if(this.customercontacts != undefined){

    for (let z = 0; z < this.customercontacts.length; z++) {
      this.customerContactFormArray = this.f['customerContactFormArray'] as FormArray;
      if (z < (this.customercontacts.length) - 1) {

        this.customerContactFormArray.push(this.createItem());
      }
      this.customercontactSlno = this.customercontacts[z].customerslNo;

      this.slNo = this.customercontacts[z].slNo;
      this.customerContactFormArray.controls[z].controls['pname'].setValue(this.customercontacts[z].pname);
      this.customerContactFormArray.controls[z].controls['designation'].setValue(this.customercontacts[z].designation);
      this.customerContactFormArray.controls[z].controls['department'].setValue(this.customercontacts[z].department);
      this.customerContactFormArray.controls[z].controls['level'].setValue(this.customercontacts[z].level);
      this.customerContactFormArray.controls[z].controls['mnumber'].setValue(this.customercontacts[z].mnumber);
      this.customerContactFormArray.controls[z].controls['altmnumber'].setValue(this.customercontacts[z].altmnumber);
      this.customerContactFormArray.controls[z].controls['mailid'].setValue(this.customercontacts[z].mailid);

    }

  }

  }

  get f() {
    return this.customerContactForm.controls;
  }
  get o() {
    return this.f.customerContactFormArray as FormArray;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  createItem() {
    return this.formBuilder.group({
      customerslNo: [this.custemerRegForm.value.custemercode],
      pname: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      level: ['', Validators.required],

     
      mnumber:['',  [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)]],
      altmnumber:['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)]],
      mailid: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }
  addItem() {
    this.customerContactFormArray = this.f['customerContactFormArray'] as FormArray;
    let status: boolean = false;
    for (let control of this.customerContactFormArray.controls) {
      if (control.status == 'INVALID') {
        this.calloutService.showError("An input field is missing!");
        status = true;
        break;
      }
    }
    if (status) {
      return;
    }
    this.customerContactFormArray.push(this.createItem());
  }
  removeItem(idx: number): void {
    (this.f['customerContactFormArray'] as FormArray).removeAt(idx);
  }

  onSubmit() {
    this.customerContactForm.markAllAsTouched();
  }
  onOkClick(event: any, customerContactForm: any) {

    this.markFormGroupTouched(this.customerContactForm);
    this.submitted = true;
    if (this.customerContactForm.invalid) {
        return;
    }
    let customerContact001wbs: Customercontact001wb[] = [];
    for (let i = 0; i < this.customerContactForm.controls.customerContactFormArray.controls.length; i++) {
      let customerContact001wb = new Customercontact001wb();


      if (this.slNo) {
        customerContact001wb.slNo = this.customercontacts[i].slNo;
        customerContact001wb.customerslNo = this.customercontactSlno ? this.customercontactSlno : null;
    }

      customerContact001wb.customerslNo2 = this.f.customerContactFormArray.value[i].customerslNo2? this.f.customerContactFormArray.value[i].customerslNo2: '';
      customerContact001wb.pname = this.f.customerContactFormArray.value[i].pname? this.f.customerContactFormArray.value[i].pname: '';customerContact001wb.designation = this.f.customerContactFormArray.value[i].designation? this.f.customerContactFormArray.value[i].designation: '';
      customerContact001wb.department = this.f.customerContactFormArray.value[i].department? this.f.customerContactFormArray.value[i].department: '';
      customerContact001wb.level = this.f.customerContactFormArray.value[i].level? this.f.customerContactFormArray.value[i].level: '';
      customerContact001wb.mnumber = this.f.customerContactFormArray.value[i].mnumber? this.f.customerContactFormArray.value[i].mnumber: '';
      customerContact001wb.altmnumber = this.f.customerContactFormArray.value[i].altmnumber? this.f.customerContactFormArray.value[i].altmnumber: '';
      customerContact001wb.mailid = this.f.customerContactFormArray.value[i].mailid? this.f.customerContactFormArray.value[i].mailid: '';
      customerContact001wbs.push(customerContact001wb);

      if (customerContactForm.status == "VALID") {
        this.activeModal.close({
          status: 'Yes',
          customercontacts: customerContact001wbs,
        });
      }
      else {
        this.calloutService.showError("Please Select Contact Value!!");
      }

      


    }
  }

  onCancelClick() {
    this.activeModal.close('No');
  }

}
