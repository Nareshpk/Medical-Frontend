import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { CustomerContactManager } from '../services/restcontroller/bizservice/customer-contact.service';
import { CustomerPoitemManager } from '../services/restcontroller/bizservice/customerPoItem.service';
import { PartManager } from '../services/restcontroller/bizservice/part.service';
import { CustomerPoItem001wb } from '../services/restcontroller/entities/customerPoItem001wb';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { Part001mb } from '../services/restcontroller/entities/Part001mb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-customer-po',
  templateUrl: './customer-po.component.html',
  styleUrls: ['./customer-po.component.css']
})
export class CustomerPoComponent implements OnInit {
  @Input() purchasereqitem: CustomerPoItem001wb[] |any;
  @Input() partTAmount: any
  customerPOForm: FormGroup | any;
  customerPOFormArray: FormArray | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  submitted = false;
  slNo?: number;
  prtcode?: number;
  prtmname?: string;
  prtdescrip?: string;
  prthsn?: string;
  prtqunty?: string;
  prtuom?: string;
  prtunitrate?: string;
  prttotalamount: number | any;
  drawingNo: string | any;
  revisionNo: string | any;
  revisionDate?: Date;
  hsn: string | any;
  gst: string | any;
  insertUser: string = "";
  insertDatetime?: Date;
  updatedUser: string = "";
  updatedDatetime?: Date | null;
  part001mbs: Part001mb[] = [];
  customerPoItem001wbs: CustomerPoItem001wb[] = [];
  part001mb?: Part001mb;
  user?: Login001mb | any;
  customerpoItemSlno: number | any;
  arrayslno: any = [];
  buttonDisabled?: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private customerContactManager: CustomerContactManager,
    private customerPoitemManager: CustomerPoitemManager,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal,
    private httpClient: HttpClient,
    private http: HttpClient,
    private partManager: PartManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent,
    };
  }

  ngOnInit(): void {
    
    if(this.purchasereqitem.length > 0) {            
      this.buttonDisabled = true;
  }
  else {
      this.buttonDisabled = false;
  }

    this.user = this.authManager.getcurrentUser;
    this.customerPOForm = this.formBuilder.group({
      customerPOFormArray: this.formBuilder.array([this.createItem()]),
    });

    this.customerPoitemManager.allCustomerPoitem(this.user.unitslno).subscribe(response => {
      this.customerPoItem001wbs = deserialize<CustomerPoItem001wb[]>(CustomerPoItem001wb, response);

    });

    this.partManager.allpart(this.user.unitslno).subscribe(response => {
      this.part001mbs = deserialize<Part001mb[]>(Part001mb, response);

    });

  if(this.purchasereqitem != undefined){
    for (let z = 0; z < this.purchasereqitem.length; z++) {
      this.customerPOFormArray = this.f['customerPOFormArray'] as FormArray;
      if (z < (this.purchasereqitem.length) - 1) {

        this.customerPOFormArray.push(this.createItem());
      }
      let date = new Date(this.purchasereqitem[z].revisionDate);
      this.customerpoItemSlno = this.purchasereqitem[z].customerpoSlno;
      this.slNo = this.purchasereqitem[z].slNo;
      this.customerPOFormArray.controls[z].controls['prtcode'].setValue(this.purchasereqitem[z].prtcode);
      this.customerPOFormArray.controls[z].controls['prtmname'].setValue(this.purchasereqitem[z].prtmname);
      this.customerPOFormArray.controls[z].controls['prtdescrip'].setValue(this.purchasereqitem[z].prtdescrip);
      this.customerPOFormArray.controls[z].controls['prtuom'].setValue(this.purchasereqitem[z].prtuom);
      this.customerPOFormArray.controls[z].controls['prthsn'].setValue(this.purchasereqitem[z].prthsn);
      this.customerPOFormArray.controls[z].controls['prtunitrate'].setValue(this.purchasereqitem[z].prtunitrate);
      this.customerPOFormArray.controls[z].controls['prtqunty'].setValue(this.purchasereqitem[z].prtqunty);
      this.customerPOFormArray.controls[z].controls['prttotalamount'].setValue(this.purchasereqitem[z].prttotalamount);

      this.customerPOFormArray.controls[z].controls['drawingNo'].setValue(this.purchasereqitem[z].drawingNo);
      this.customerPOFormArray.controls[z].controls['revisionNo'].setValue(this.purchasereqitem[z].revisionNo);
      this.customerPOFormArray.controls[z].controls['revisionDate'].setValue(date);
      this.customerPOFormArray.controls[z].controls['hsn'].setValue(this.purchasereqitem[z].hsn);
      this.customerPOFormArray.controls[z].controls['gst'].setValue(this.purchasereqitem[z].gst);

    }
  }

  }
  get f() {
    return this.customerPOForm.controls;
  }
  get o() {
    return this.f.customerPOFormArray as FormArray;
  }
  createItem() {
    return this.formBuilder.group({
      prtcode: ['', Validators.required],
      prtmname: ['', Validators.required],
      prtdescrip: ['', Validators.required],
      prtqunty: ['', Validators.required],
      prthsn: ['', Validators.required],
      prtuom: ['', Validators.required],
      prtunitrate: ['', Validators.required],
      prttotalamount: ['', Validators.required],
      drawingNo: ['', Validators.required],
      revisionNo: ['', Validators.required],
      revisionDate: ['', Validators.required],
      hsn: ['', Validators.required],
      gst: ['', Validators.required],
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
  onOkClick(event: any, customerPOForm: any) {

    this.markFormGroupTouched(this.customerPOForm);
    this.submitted = true;
    if (this.customerPOForm.invalid) {
      return;
    }
    let partTAmount = 0;

    let customerPoItem001wbs: CustomerPoItem001wb[] = [];

    for (let i = 0; i < this.customerPOForm.controls.customerPOFormArray.controls.length; i++) {
      let customerPoItem001wb = new CustomerPoItem001wb();

      if (this.slNo) {
        customerPoItem001wb.slNo = this.purchasereqitem[i].slNo;
        customerPoItem001wb.customerpoSlno = this.customerpoItemSlno ? this.customerpoItemSlno : null;
      }
      customerPoItem001wb.customerpoSlno2 = this.f.customerPOFormArray.value[i].customerpoSlno2 ? this.f.customerPOFormArray.value[i].customerpoSlno2 : null;
      customerPoItem001wb.prtcode = this.f.customerPOFormArray.value[i].prtcode ? this.f.customerPOFormArray.value[i].prtcode : null;
      customerPoItem001wb.prtmname = this.f.customerPOFormArray.value[i].prtmname ? this.f.customerPOFormArray.value[i].prtmname : "";
      customerPoItem001wb.prtqunty = this.f.customerPOFormArray.value[i].prtqunty ? this.f.customerPOFormArray.value[i].prtqunty : "";
      customerPoItem001wb.prttotalamount = this.f.customerPOFormArray.value[i].prttotalamount ? this.f.customerPOFormArray.value[i].prttotalamount : null;
      partTAmount += customerPoItem001wb.prttotalamount;
      customerPoItem001wb.prtunitrate = this.f.customerPOFormArray.value[i].prtunitrate ? this.f.customerPOFormArray.value[i].prtunitrate : "";
      customerPoItem001wb.prtdescrip = this.f.customerPOFormArray.value[i].prtdescrip ? this.f.customerPOFormArray.value[i].prtdescrip : "";
      customerPoItem001wb.prtuom = this.f.customerPOFormArray.value[i].prtuom ? this.f.customerPOFormArray.value[i].prtuom : "";
      customerPoItem001wb.prthsn = this.f.customerPOFormArray.value[i].prthsn ? this.f.customerPOFormArray.value[i].prthsn : "";

      customerPoItem001wb.drawingNo = this.f.customerPOFormArray.value[i].drawingNo ? this.f.customerPOFormArray.value[i].drawingNo : "";
      customerPoItem001wb.revisionNo = this.f.customerPOFormArray.value[i].revisionNo ? this.f.customerPOFormArray.value[i].revisionNo : "";
      customerPoItem001wb.revisionDate = this.f.customerPOFormArray.value[i].revisionDate ? this.f.customerPOFormArray.value[i].revisionDate : "";
      customerPoItem001wb.hsn = this.f.customerPOFormArray.value[i].hsn ? this.f.customerPOFormArray.value[i].hsn : "";
      customerPoItem001wb.gst = this.f.customerPOFormArray.value[i].gst ? this.f.customerPOFormArray.value[i].gst : "";

      customerPoItem001wbs.push(customerPoItem001wb);
      if (this.f.customerPOFormArray.value[i].prtqunty) {
       
        
        setTimeout(() => {
          this.activeModal.close({
            status: "Yes",
            customerPoItem: customerPoItem001wbs,
            partTAmount: partTAmount,
          });

        }, 100);
      } else {
        this.calloutService.showError("Please Select The Value!!");
      }
    }

  }


  addItemprt() {
    this.customerPOFormArray = this.f['customerPOFormArray'] as FormArray;
    let status: boolean = false;
    for (let control of this.customerPOFormArray.controls) {
      if (control.controls.prtqunty.status == 'INVALID') {
        this.calloutService.showError("An input field is missing!");
        status = true;
        break;
      }
      if (control.controls.prtqunty.value == '0') {
        this.calloutService.showWarning("Qty Value Should be Greater than 0");
        status = true;
        break;
      }
    }
    if (status) {
      return;
    }
    this.customerPOFormArray = this.f['customerPOFormArray'] as FormArray;
    this.customerPOFormArray.push(this.createItem());
  }

  removeItemprt(idx: number): void {
    (this.f['customerPOFormArray'] as FormArray).removeAt(idx);
  }



  onChangePart(event: any, index: any) {
    for (let i = 0; i < this.arrayslno.length; i++) {
      if (this.arrayslno[i] == event.target.value) {
        this.calloutService.showWarning("Already selected");
        event.target.value = "";
        break;
      }
    }
    this.arrayslno.push(event.target.value);
    this.partManager.findOne(event.target.value).subscribe(response => {
      this.part001mb = deserialize<Part001mb>(Part001mb, response);
      this.customerPOFormArray = this.f['customerPOFormArray'] as FormArray;
      this.customerPOFormArray.controls[index].controls['prtmname'].setValue(this.part001mb.partname);
      this.customerPOFormArray.controls[index].controls['prtdescrip'].setValue(this.part001mb.descrip);
      this.customerPOFormArray.controls[index].controls['prtuom'].setValue(this.part001mb.uom);
      this.customerPOFormArray.controls[index].controls['prtunitrate'].setValue(this.part001mb.unitamount);
      this.customerPOFormArray.controls[index].controls['prthsn'].setValue(this.part001mb.hsn);
      this.customerPOFormArray.controls[index].controls['prtqunty'].setValue("");
      this.customerPOFormArray.controls[index].controls['prttotalamount'].setValue("");

    });
  }

  onChangepartQty(event: any, index: any) {
    if (1 == Math.sign(event.target.value)) {
      this.customerPOFormArray = this.f['customerPOFormArray'] as FormArray;

      if (this.part001mb?.unitamount == undefined) {
        let totalamount = event.target.value * this.purchasereqitem[index].prtunitrate;
        this.customerPOFormArray.controls[index].controls['prttotalamount'].setValue(totalamount);
      }

      else {
        let totalamount = event.target.value * this.part001mb?.unitamount;
        this.customerPOFormArray.controls[index].controls['prttotalamount'].setValue(totalamount);
      }


    } else {
      this.calloutService.showWarning("Negative value Not Acceppted");
    }

  }

  onCancelClick() {
    this.activeModal.close('No');
  }
}
