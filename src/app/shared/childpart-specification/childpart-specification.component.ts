import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { ChildPartspecificationManager } from '../services/restcontroller/bizservice/childpartspecification.service';
import { Childpartspecification001wb } from '../services/restcontroller/entities/childpartsepecific001wb';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-childpart-specification',
  templateUrl: './childpart-specification.component.html',
  styleUrls: ['./childpart-specification.component.css']
})
export class ChildpartSpecificationComponent implements OnInit {

  
  @Input() childPartForm: any;
  @Input() specifications: any;
  orderspecificationForm: FormGroup | any;
  orderspecificationFormArray: FormArray | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  submitted = false;


  slNo: number | any;
  cprtslno: number | any;
  parameter: string = "";
  specification: string = "";
  inspecmethod: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  childpartspecification001wbs:Childpartspecification001wb[]=[];
  childpartspecification001wb?:Childpartspecification001wb;
  user?:Login001mb|any;
  unitslno?:number;
  childSpecificSlno:number | any;
  buttonDisabled?: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private childPartspecificationManager :ChildPartspecificationManager,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }
  ngOnInit(): void {

    if(this.specifications.length > 0) {            
      this.buttonDisabled = true;
  }
  else {
      this.buttonDisabled = false;
  }

    this.user = this.authManager.getcurrentUser;
    this.orderspecificationForm = this.formBuilder.group({
      orderspecificationFormArray: this.formBuilder.array([this.createItem()]),
    });

    // this.childPartspecificationManager.cprtspecificationall(this.user.unitslno).subscribe(response => {
    //   this.childpartspecification001wbs = deserialize<Childpartspecification001wb[]>(Childpartspecification001wb, response);
    // });

    if(this.specifications != undefined){
    for (let z = 0; z < this.specifications.length; z++) {
      this.orderspecificationFormArray = this.f['orderspecificationFormArray'] as FormArray;
      if (z < (this.specifications.length) - 1) {

        this.orderspecificationFormArray.push(this.createItem());
      }
      this.childSpecificSlno = this.specifications[z].cprtslno;

      this.slNo = this.specifications[z].slNo;
      this.orderspecificationFormArray.controls[z].controls['parameter'].setValue(this.specifications[z].parameter);
      this.orderspecificationFormArray.controls[z].controls['specification'].setValue(this.specifications[z].specification);
      this.orderspecificationFormArray.controls[z].controls['inspecmethod'].setValue(this.specifications[z].inspecmethod);

    }
  }

  }

  get f() { return this.orderspecificationForm.controls; }
  get o() { return this.f.orderspecificationFormArray as FormArray; }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  // [this.ItemForm.value.itemcode],

  createItem() {
    return this.formBuilder.group({
      cprtslno: [this.childPartForm.value.cpartno],
      parameter: ['', Validators.required],
      specification: ['', Validators.required],
      inspecmethod: ['', Validators.required],

      orderspecificationFormArray: new FormArray([]),
    });

  }

  addItem() {
    this.orderspecificationFormArray = this.f['orderspecificationFormArray'] as FormArray;
    let status: boolean = false;
    for(let control of this.orderspecificationFormArray.controls) {
      if(control.status == 'INVALID'){
        this.calloutService.showError("An input field is missing!");
        status = true;
        break;
      }
    }
    if(status) {
      return;
    }
    this.orderspecificationFormArray = this.f['orderspecificationFormArray'] as FormArray;
    this.orderspecificationFormArray.push(this.createItem());
  }

  removeItem(idx: number): void {
    (this.f['orderspecificationFormArray'] as FormArray).removeAt(idx);
  }

  onOkClick(event: any, orderspecificationForm: any) {
    this.markFormGroupTouched(this.orderspecificationForm);
    this.submitted = true;
    if (this.orderspecificationForm.invalid) {
        return;
    }
    let childpartspecification001wbs: Childpartspecification001wb[] = [];
    for (let i = 0; i < this.orderspecificationForm.controls.orderspecificationFormArray.controls.length; i++) {
      let childpartspecification001wb = new Childpartspecification001wb();

      if (this.slNo) {
        childpartspecification001wb.slNo = this.specifications[i].slNo;
        childpartspecification001wb.cprtslno = this.childSpecificSlno ? this.childSpecificSlno : null;
      }

     childpartspecification001wb.cprtslno2 = this.f.orderspecificationFormArray.value[i].cprtslno2 ? this.f.orderspecificationFormArray.value[i].cprtslno2 : null;
     childpartspecification001wb.parameter = this.f.orderspecificationFormArray.value[i].parameter ? this.f.orderspecificationFormArray.value[i].parameter : "";
     childpartspecification001wb.specification = this.f.orderspecificationFormArray.value[i].specification ? this.f.orderspecificationFormArray.value[i].specification : "";
     childpartspecification001wb.inspecmethod = this.f.orderspecificationFormArray.value[i].inspecmethod ? this.f.orderspecificationFormArray.value[i].inspecmethod : "";
      childpartspecification001wbs.push(childpartspecification001wb);

      this.activeModal.close({
        status: "Yes",
        specifications: childpartspecification001wbs,
      });
    }
    

  }

  onCancelClick() {
    this.activeModal.close('No');
  }


}
