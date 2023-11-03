import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { ConsumerspecificationManager } from '../services/restcontroller/bizservice/consumablespecific.sevice';
import { Consumerspecification001wb } from '../services/restcontroller/entities/consumablespecific001wb';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-consumer-specification',
  templateUrl: './consumer-specification.component.html',
  styleUrls: ['./consumer-specification.component.css']
})
export class ConsumerSpecificationComponent implements OnInit {

   
  @Input() consumableForm: any;
  @Input() specifications: any;
  orderspecificationForm: FormGroup | any;
  orderspecificationFormArray: FormArray | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  submitted = false;


  slNo: number | any;
  itemslno: number | any;
  parameter: string = "";
  specification: string = "";
  inspecmethod: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  consumerspecification001wb?:Consumerspecification001wb;
  consumerspecification001wbs:Consumerspecification001wb[]=[];
  user?:Login001mb|any;
  unitslno?:number;
  consumerSpecificSlno:number | any;
  buttonDisabled?: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private consumerspecificationManager: ConsumerspecificationManager,
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

    // this.consumerspecificationManager.cosumspecificationall(this.user.unitslno).subscribe(response => {
    //   this.consumerspecification001wbs = deserialize<Consumerspecification001wb[]>(Consumerspecification001wb, response);
    // });

    
    if(this.specifications != undefined){
    for (let z = 0; z < this.specifications.length; z++) {
      this.orderspecificationFormArray = this.f['orderspecificationFormArray'] as FormArray;
      if (z < (this.specifications.length) - 1) {

        this.orderspecificationFormArray.push(this.createItem());
      }
      this.consumerSpecificSlno = this.specifications[z].consumslno;

      this.slNo = this.specifications[z].slNo;
      // this.orderspecificationFormArray.controls[z].controls['partslno'].setValue(this.specifications[z].partslno);
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
      consumslno: [this.consumableForm.value.consmno],
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
    let consumerspecification001wbs: Consumerspecification001wb[] = [];
    for (let i = 0; i < this.orderspecificationForm.controls.orderspecificationFormArray.controls.length; i++) {
      let consumerspecification001wb = new Consumerspecification001wb();
      if (this.slNo) {
        consumerspecification001wb.slNo = this.specifications[i].slNo;
        consumerspecification001wb.consumslno = this.consumerSpecificSlno ? this.consumerSpecificSlno : null;
      }
      consumerspecification001wb.consumslno2 = this.f.orderspecificationFormArray.value[i].consumslno2 ? this.f.orderspecificationFormArray.value[i].consumslno2 : null;
      consumerspecification001wb.parameter = this.f.orderspecificationFormArray.value[i].parameter ? this.f.orderspecificationFormArray.value[i].parameter : "";
      consumerspecification001wb.specification = this.f.orderspecificationFormArray.value[i].specification ? this.f.orderspecificationFormArray.value[i].specification : "";
      consumerspecification001wb.inspecmethod = this.f.orderspecificationFormArray.value[i].inspecmethod ? this.f.orderspecificationFormArray.value[i].inspecmethod : "";
      consumerspecification001wbs.push(consumerspecification001wb);

      this.activeModal.close({
        status: "Yes",
        specifications: consumerspecification001wbs,
      });
    }
    

  }

  onCancelClick() {
    this.activeModal.close('No');
  }

}
