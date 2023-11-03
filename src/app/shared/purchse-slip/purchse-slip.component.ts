import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions, NumberFilter } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { ChildPartManager } from '../services/restcontroller/bizservice/ChildPart.service';
import { ConsumbleManager } from '../services/restcontroller/bizservice/consumble.service';
import { OrderItemSettingManager } from '../services/restcontroller/bizservice/orderItems.service';
import { PartManager } from '../services/restcontroller/bizservice/part.service';
import { PurchasereqItemManager } from '../services/restcontroller/bizservice/Purchasereqitem.service';
import { ChildPart001mb } from '../services/restcontroller/entities/ChildPart001mb';
import { Consumble001mb } from '../services/restcontroller/entities/Consumble001mb';
import { Orderitem001mb } from '../services/restcontroller/entities/Orderitem001mb';
import { Part001mb } from '../services/restcontroller/entities/Part001mb';
import { Purchasereqitem001wb } from '../services/restcontroller/entities/purchasereqitems001wb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';
import { forkJoin } from 'rxjs';
import { Suppliertype001mb } from '../services/restcontroller/entities/Suppliertype001mb';
import { SupplierTypeManager } from '../services/restcontroller/bizservice/Suppliertype.service';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-purchse-slip',
  templateUrl: './purchse-slip.component.html',
  styleUrls: ['./purchse-slip.component.css']
})
export class PurchseSlipComponent implements OnInit {
  @Input() purchasereqitem: any;
  @Input() suppiertype: any;
  @Input() TAmount: any;
  @Input() consumableTAmount: any
  @Input() childparTAmount: any
  @Input() partTAmount: any
  purchasereqForm: FormGroup | any;
  purchasereqFormArry: FormArray | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  slNo?: number;
  prslno?: number;
  orderslno?: number;
  itemcode?: string;
  itemname?: string;
  descrip?: string;
  qunty?: string;
  uom?: string;
  hsn?: string;
  unitrate?: string;
  totalamount: number | any;
  cucode?: number;
  cuname?: string;
  cudescrip?: string;
  cuqunty?: string;
  cuom?: string;
  chsn?: string;
  cunitrate?: string;
  cutotalamount: number | any;
  cptcode?: number;
  cptname?: string;
  cptdescrip?: string;
  cptqunty?: string;
  cptuom?: string;
  cpthsn?: string;
  cptunitrate?: string;
  cpttotalamount: number | any;
  prtcode?: number;
  prtmname?: string;
  prtdescrip?: string;
  prthsn?: string;
  prtqunty?: string;
  prtuom?: string;
  prtunitrate?: string;
  prttotalamount: number | any;
  insertUser?: string;
  insertDatetime?: Date;
  updatedUser?: string | null;
  updatedDatetime?: Date | null;
  orderitemSlno: any;
  purchasereqitem001wbs: Purchasereqitem001wb[] = [];
  purchasereqitem001wb?: Purchasereqitem001wb;
  orderitem001mbs: Orderitem001mb[] = [];
  orderitem001mb?: Orderitem001mb;
  consumble001mbs: Consumble001mb[] = [];
  consumble001mb?: Consumble001mb;
  part001mbs: Part001mb[] = [];
  part001mb?: Part001mb;
  childPart001mbs: ChildPart001mb[] = [];
  childPart001mb?: ChildPart001mb;
  suppliertype001mbs: Suppliertype001mb[] | any;
  suppliertype001mb?: Suppliertype001mb;
  matrials: Suppliertype001mb[] = [];
  arrayslno: any = [];

  user?: Login001mb | any;
  unitslno?: number;
  purchaseItemSlno?: number;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private purchasereqItemManager: PurchasereqItemManager,
    private orderItemSettingManager: OrderItemSettingManager,
    private consumbleManager: ConsumbleManager,
    private childPartManager: ChildPartManager,
    private supplierTypeManager: SupplierTypeManager,
    private partManager: PartManager,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit() {

    this.user = this.authManager.getcurrentUser;

    this.purchasereqForm = this.formBuilder.group({
      purchasereqFormArry: this.formBuilder.array([this.createItem()])
    });

    this.supplierTypeManager.allsuppliertype(this.user.unitslno).subscribe(response => {
      this.suppliertype001mbs = deserialize<Suppliertype001mb[]>(Suppliertype001mb, response);
    });

    this.purchasereqItemManager.allpurchasereqItem(this.user.unitslno).subscribe(response => {
      this.purchasereqitem001wbs = deserialize<Purchasereqitem001wb[]>(Purchasereqitem001wb, response);

    });

    this.orderItemSettingManager.allitem(this.user.unitslno).subscribe(response => {
      this.orderitem001mbs = deserialize<Orderitem001mb[]>(Orderitem001mb, response);

    });

    this.consumbleManager.allconsumble(this.user.unitslno).subscribe(response => {
      this.consumble001mbs = deserialize<Consumble001mb[]>(Consumble001mb, response);

    });

    this.childPartManager.allChildpart(this.user.unitslno).subscribe(response => {
      this.childPart001mbs = deserialize<ChildPart001mb[]>(ChildPart001mb, response);

    });

    this.partManager.allpart(this.user.unitslno).subscribe(response => {
      this.part001mbs = deserialize<Part001mb[]>(Part001mb, response);

    });

    for (let z = 0; z < this.purchasereqitem.length; z++) {
      this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
      if (z < (this.purchasereqitem.length) - 1) {

        this.purchasereqFormArry.push(this.createItem());
      }
      this.purchaseItemSlno = this.purchasereqitem[z].prslno;

      this.slNo = this.purchasereqitem[z].slNo;
      this.purchasereqFormArry.controls[z].controls['orderslno'].setValue(this.purchasereqitem[z].orderslno);
      this.purchasereqFormArry.controls[z].controls['itemname'].setValue(this.purchasereqitem[z].itemname);
      this.purchasereqFormArry.controls[z].controls['descrip'].setValue(this.purchasereqitem[z].descrip);
      this.purchasereqFormArry.controls[z].controls['uom'].setValue(this.purchasereqitem[z].uom);
      this.purchasereqFormArry.controls[z].controls['hsn'].setValue(this.purchasereqitem[z].hsn);
      this.purchasereqFormArry.controls[z].controls['unitrate'].setValue(this.purchasereqitem[z].unitrate);
      this.purchasereqFormArry.controls[z].controls['qunty'].setValue(this.purchasereqitem[z].qunty);
      this.purchasereqFormArry.controls[z].controls['totalamount'].setValue(this.purchasereqitem[z].totalamount);

      this.purchasereqFormArry.controls[z].controls['cucode'].setValue(this.purchasereqitem[z].cucode);
      this.purchasereqFormArry.controls[z].controls['cuname'].setValue(this.purchasereqitem[z].cuname);
      this.purchasereqFormArry.controls[z].controls['cudescrip'].setValue(this.purchasereqitem[z].cudescrip);
      this.purchasereqFormArry.controls[z].controls['cuom'].setValue(this.purchasereqitem[z].cuom);
      this.purchasereqFormArry.controls[z].controls['chsn'].setValue(this.purchasereqitem[z].chsn);
      this.purchasereqFormArry.controls[z].controls['cunitrate'].setValue(this.purchasereqitem[z].cunitrate);
      this.purchasereqFormArry.controls[z].controls['cuqunty'].setValue(this.purchasereqitem[z].cuqunty);
      this.purchasereqFormArry.controls[z].controls['cutotalamount'].setValue(this.purchasereqitem[z].cutotalamount);

      this.purchasereqFormArry.controls[z].controls['cptcode'].setValue(this.purchasereqitem[z].cptcode);
      this.purchasereqFormArry.controls[z].controls['cptname'].setValue(this.purchasereqitem[z].cptname);
      this.purchasereqFormArry.controls[z].controls['cptdescrip'].setValue(this.purchasereqitem[z].cptdescrip);
      this.purchasereqFormArry.controls[z].controls['cptuom'].setValue(this.purchasereqitem[z].cptuom);
      this.purchasereqFormArry.controls[z].controls['cpthsn'].setValue(this.purchasereqitem[z].cpthsn);
      this.purchasereqFormArry.controls[z].controls['cptunitrate'].setValue(this.purchasereqitem[z].cptunitrate);
      this.purchasereqFormArry.controls[z].controls['cptqunty'].setValue(this.purchasereqitem[z].cptqunty);
      this.purchasereqFormArry.controls[z].controls['cpttotalamount'].setValue(this.purchasereqitem[z].cpttotalamount);;

      this.purchasereqFormArry.controls[z].controls['prtcode'].setValue(this.purchasereqitem[z].prtcode);
      this.purchasereqFormArry.controls[z].controls['prtmname'].setValue(this.purchasereqitem[z].prtmname);
      this.purchasereqFormArry.controls[z].controls['prtdescrip'].setValue(this.purchasereqitem[z].prtdescrip);
      this.purchasereqFormArry.controls[z].controls['prtuom'].setValue(this.purchasereqitem[z].prtuom);
      this.purchasereqFormArry.controls[z].controls['prthsn'].setValue(this.purchasereqitem[z].prthsn);
      this.purchasereqFormArry.controls[z].controls['prtunitrate'].setValue(this.purchasereqitem[z].prtunitrate);
      this.purchasereqFormArry.controls[z].controls['prtqunty'].setValue(this.purchasereqitem[z].prtqunty);
      this.purchasereqFormArry.controls[z].controls['prttotalamount'].setValue(this.purchasereqitem[z].prttotalamount);

    }

  }

  get f() {
    return this.purchasereqForm.controls;
  }

  createItem() {
    return this.formBuilder.group({
      orderslno: ['', Validators.required],
      prslno: ['', Validators.required],
      itemname: ['', Validators.required],
      descrip: ['', Validators.required],
      qunty: ['', Validators.required],
      uom: ['', Validators.required],
      hsn: ['', Validators.required],
      unitrate: ['', Validators.required],
      totalamount: ['', Validators.required],

      cucode: ['', Validators.required],
      cuname: ['', Validators.required],
      cudescrip: ['', Validators.required],
      cuqunty: ['', Validators.required],
      cuom: ['', Validators.required],
      chsn: ['', Validators.required],
      cunitrate: ['', Validators.required],
      cutotalamount: ['', Validators.required],

      cptcode: ['', Validators.required],
      cptname: ['', Validators.required],
      cptdescrip: ['', Validators.required],
      cptqunty: ['', Validators.required],
      cptuom: ['', Validators.required],
      cpthsn: ['', Validators.required],
      cptunitrate: ['', Validators.required],
      cpttotalamount: ['', Validators.required],

      prtcode: ['', Validators.required],
      prtmname: ['', Validators.required],
      prtdescrip: ['', Validators.required],
      prtqunty: ['', Validators.required],
      prthsn: ['', Validators.required],
      prtuom: ['', Validators.required],
      prtunitrate: ['', Validators.required],
      prttotalamount: ['', Validators.required],
    });
  }

  addItem() {
    this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    let status: boolean = false;
    for (let control of this.purchasereqFormArry.controls) {
      if (control.controls.qunty.status == 'INVALID') {
        this.calloutService.showError("An input field is missing!");
        status = true;
        break;
      }
      if (control.controls.qunty.value == '0') {
        this.calloutService.showWarning("Qty Value Should be Greater than 0");
        status = true;
        break;
      }
    }
    if (status) {
      return;
    }
    this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    this.purchasereqFormArry.push(this.createItem());
  }

  removeItem(idx: number): void {
    (this.f['purchasereqFormArry'] as FormArray).removeAt(idx);
  }


  addItemCun() {
    this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    let status: boolean = false;
    for (let control of this.purchasereqFormArry.controls) {
      if (control.controls.cuqunty.status == 'INVALID') {
        this.calloutService.showError("An input field is missing");
        status = true;
        break;
      }
      if (control.controls.cuqunty.value == '0') {
        this.calloutService.showWarning("Qty Value Should be Greater than 0");
        status = true;
        break;
      }
    }
    if (status) {
      return;
    }
    this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    this.purchasereqFormArry.push(this.createItem());
  }

  removeItemCun(idx: number): void {
    (this.f['purchasereqFormArry'] as FormArray).removeAt(idx);
  }

  addItemcpt() {
    this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    let status: boolean = false;
    for (let control of this.purchasereqFormArry.controls) {
      if (control.controls.cptqunty.status == 'INVALID') {
        this.calloutService.showError("An input field is missing!");
        status = true;
        break;
      }
      if (control.controls.cptqunty.value == '0') {
        this.calloutService.showWarning("Qty Value Should be Greater than 0");
        status = true;
        break;
      }
    }
    if (status) {
      return;
    }
    this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    this.purchasereqFormArry.push(this.createItem());
  }

  removeItemcpt(idx: number): void {
    (this.f['purchasereqFormArry'] as FormArray).removeAt(idx);
  }

  addItemprt() {

    this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    let status: boolean = false;
    for (let control of this.purchasereqFormArry.controls) {
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
    this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    this.purchasereqFormArry.push(this.createItem());
  }
  removeItemprt(idx: number): void {
    (this.f['purchasereqFormArry'] as FormArray).removeAt(idx);
  }


  onOkClick(event: any, purchasereqForm: any) {
    let TAmount = 0;
    let consumableTAmount = 0;
    let childparTAmount = 0;
    let partTAmount = 0;

    let purchasereqitem001wbs: Purchasereqitem001wb[] = [];
    for (let i = 0; i < this.purchasereqForm.controls.purchasereqFormArry.controls.length; i++) {
      let purchasereqitem001wb = new Purchasereqitem001wb();

      if (this.slNo) {
        purchasereqitem001wb.slNo = this.purchasereqitem[i].slNo;
        purchasereqitem001wb.prslno = this.purchaseItemSlno ? this.purchaseItemSlno : null;
      }
     

        purchasereqitem001wb.prslno2 = this.f.purchasereqFormArry.value[i].prslno2 ? this.f.purchasereqFormArry.value[i].prslno2 : null;
        purchasereqitem001wb.orderslno = this.f.purchasereqFormArry.value[i].orderslno ? this.f.purchasereqFormArry.value[i].orderslno : null;
        purchasereqitem001wb.itemname = this.f.purchasereqFormArry.value[i].itemname ? this.f.purchasereqFormArry.value[i].itemname : "";
        purchasereqitem001wb.qunty = this.f.purchasereqFormArry.value[i].qunty ? this.f.purchasereqFormArry.value[i].qunty : "";
        purchasereqitem001wb.totalamount = this.f.purchasereqFormArry.value[i].totalamount ? this.f.purchasereqFormArry.value[i].totalamount : null;
        TAmount += purchasereqitem001wb.totalamount;
        purchasereqitem001wb.unitrate = this.f.purchasereqFormArry.value[i].unitrate ? this.f.purchasereqFormArry.value[i].unitrate : "";
        purchasereqitem001wb.descrip = this.f.purchasereqFormArry.value[i].descrip ? this.f.purchasereqFormArry.value[i].descrip : "";
        purchasereqitem001wb.uom = this.f.purchasereqFormArry.value[i].uom ? this.f.purchasereqFormArry.value[i].uom : "";
        purchasereqitem001wb.hsn = this.f.purchasereqFormArry.value[i].hsn ? this.f.purchasereqFormArry.value[i].hsn : "";

        purchasereqitem001wb.cucode = this.f.purchasereqFormArry.value[i].cucode ? this.f.purchasereqFormArry.value[i].cucode : null;
        purchasereqitem001wb.cuname = this.f.purchasereqFormArry.value[i].cuname ? this.f.purchasereqFormArry.value[i].cuname : "";
        purchasereqitem001wb.cuqunty = this.f.purchasereqFormArry.value[i].cuqunty ? this.f.purchasereqFormArry.value[i].cuqunty : "";
        purchasereqitem001wb.cutotalamount = this.f.purchasereqFormArry.value[i].cutotalamount ? this.f.purchasereqFormArry.value[i].cutotalamount : null;
        consumableTAmount += purchasereqitem001wb.cutotalamount;
        purchasereqitem001wb.cunitrate = this.f.purchasereqFormArry.value[i].cunitrate ? this.f.purchasereqFormArry.value[i].cunitrate : "";
        purchasereqitem001wb.cudescrip = this.f.purchasereqFormArry.value[i].cudescrip ? this.f.purchasereqFormArry.value[i].cudescrip : "";
        purchasereqitem001wb.cuom = this.f.purchasereqFormArry.value[i].cuom ? this.f.purchasereqFormArry.value[i].cuom : "";
        purchasereqitem001wb.chsn = this.f.purchasereqFormArry.value[i].chsn ? this.f.purchasereqFormArry.value[i].chsn : "";


        purchasereqitem001wb.cptcode = this.f.purchasereqFormArry.value[i].cptcode ? this.f.purchasereqFormArry.value[i].cptcode : null;
        purchasereqitem001wb.cptname = this.f.purchasereqFormArry.value[i].cptname ? this.f.purchasereqFormArry.value[i].cptname : "";
        purchasereqitem001wb.cptunitrate = this.f.purchasereqFormArry.value[i].cptunitrate ? this.f.purchasereqFormArry.value[i].cptunitrate : "";
        purchasereqitem001wb.cptqunty = this.f.purchasereqFormArry.value[i].cptqunty ? this.f.purchasereqFormArry.value[i].cptqunty : "";
        purchasereqitem001wb.cpttotalamount = this.f.purchasereqFormArry.value[i].cpttotalamount ? this.f.purchasereqFormArry.value[i].cpttotalamount : null;
        childparTAmount += purchasereqitem001wb.cpttotalamount;
        purchasereqitem001wb.cptdescrip = this.f.purchasereqFormArry.value[i].cptdescrip ? this.f.purchasereqFormArry.value[i].cptdescrip : "";
        purchasereqitem001wb.cptuom = this.f.purchasereqFormArry.value[i].cptuom ? this.f.purchasereqFormArry.value[i].cptuom : "";
        purchasereqitem001wb.cpthsn = this.f.purchasereqFormArry.value[i].cpthsn ? this.f.purchasereqFormArry.value[i].cpthsn : "";

        purchasereqitem001wb.prtcode = this.f.purchasereqFormArry.value[i].prtcode ? this.f.purchasereqFormArry.value[i].prtcode : null;
        purchasereqitem001wb.prtmname = this.f.purchasereqFormArry.value[i].prtmname ? this.f.purchasereqFormArry.value[i].prtmname : "";
        purchasereqitem001wb.prtqunty = this.f.purchasereqFormArry.value[i].prtqunty ? this.f.purchasereqFormArry.value[i].prtqunty : "";
        purchasereqitem001wb.prttotalamount = this.f.purchasereqFormArry.value[i].prttotalamount ? this.f.purchasereqFormArry.value[i].prttotalamount : null;
        partTAmount += purchasereqitem001wb.prttotalamount;
        purchasereqitem001wb.prtunitrate = this.f.purchasereqFormArry.value[i].prtunitrate ? this.f.purchasereqFormArry.value[i].prtunitrate : "";
        purchasereqitem001wb.prtdescrip = this.f.purchasereqFormArry.value[i].prtdescrip ? this.f.purchasereqFormArry.value[i].prtdescrip : "";
        purchasereqitem001wb.prtuom = this.f.purchasereqFormArry.value[i].prtuom ? this.f.purchasereqFormArry.value[i].prtuom : "";
        purchasereqitem001wb.prthsn = this.f.purchasereqFormArry.value[i].prthsn ? this.f.purchasereqFormArry.value[i].prthsn : "";

        purchasereqitem001wbs.push(purchasereqitem001wb);

        if (this.f.purchasereqFormArry.value[i].qunty || this.f.purchasereqFormArry.value[i].cuqunty || this.f.purchasereqFormArry.value[i].cptqunty || this.f.purchasereqFormArry.value[i].prtqunty) {
          setTimeout(() => {

            this.activeModal.close({
              status: "Yes",
              purchasereqitem: purchasereqitem001wbs,

              TAmount: TAmount,
              consumableTAmount: consumableTAmount,
              childparTAmount: childparTAmount,
              partTAmount: partTAmount,
            });

          }, 100);
        } else {
          this.calloutService.showError("Please Select The Value!!");
        }
    }


  }

  onChange(event: any, index: any) {

    for (let i = 0; i < this.arrayslno.length; i++) {
      if (this.arrayslno[i] == event.target.value) {
        this.calloutService.showWarning("Already selected");
        event.target.value = "";
        break;
      }
    }

    this.arrayslno.push(event.target.value);
    this.orderItemSettingManager.findOne(event.target.value).subscribe(response => {
      this.orderitem001mb = deserialize<Orderitem001mb>(Orderitem001mb, response);
      this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
      this.purchasereqFormArry.controls[index].controls['itemname'].setValue(this.orderitem001mb.itemname);
      this.purchasereqFormArry.controls[index].controls['descrip'].setValue(this.orderitem001mb.descrip);
      this.purchasereqFormArry.controls[index].controls['uom'].setValue(this.orderitem001mb.uom);
      this.purchasereqFormArry.controls[index].controls['unitrate'].setValue(this.orderitem001mb.unitamount);
      this.purchasereqFormArry.controls[index].controls['hsn'].setValue(this.orderitem001mb.hsn);
      this.purchasereqFormArry.controls[index].controls['qunty'].setValue("");
      this.purchasereqFormArry.controls[index].controls['totalamount'].setValue("");

    });
  }

  onChangeQty(event: any, index: any) {
    if (1 == Math.sign(event.target.value)) {
      this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
      if (this.orderitem001mb?.unitamount == undefined) {
        let totalamount = event.target.value * this.purchasereqitem[index].unitrate;
        this.purchasereqFormArry.controls[index].controls['totalamount'].setValue(totalamount);
      }

      else {
        let totalamount = event.target.value * this.orderitem001mb?.unitamount;
        this.purchasereqFormArry.controls[index].controls['totalamount'].setValue(totalamount);
      }


    } else {
      this.calloutService.showWarning("Negative value Not Acceppted");
    }

  }

  onChangeConsumables(event: any, index: any) {
    for (let i = 0; i < this.arrayslno.length; i++) {
      if (this.arrayslno[i] == event.target.value) {
        this.calloutService.showWarning("Already selected");
        event.target.value = "";
        break;
      }
    }
    this.arrayslno.push(event.target.value);
    this.consumbleManager.findOne(event.target.value).subscribe(response => {
      this.consumble001mb = deserialize<Consumble001mb>(Consumble001mb, response);
      this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
      this.purchasereqFormArry.controls[index].controls['cuname'].setValue(this.consumble001mb.consname);
      this.purchasereqFormArry.controls[index].controls['cudescrip'].setValue(this.consumble001mb.descrip);
      this.purchasereqFormArry.controls[index].controls['cuom'].setValue(this.consumble001mb.uom);
      this.purchasereqFormArry.controls[index].controls['cunitrate'].setValue(this.consumble001mb.unitamount);
      this.purchasereqFormArry.controls[index].controls['chsn'].setValue(this.consumble001mb.hsn);
      this.purchasereqFormArry.controls[index].controls['cuqunty'].setValue("");
      this.purchasereqFormArry.controls[index].controls['cutotalamount'].setValue("");

    });

  }

  onChangeConsumableQty(event: any, index: any) {

    if (1 == Math.sign(event.target.value)) {
      this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
      if (this.consumble001mb?.unitamount == undefined) {
        let totalamount = event.target.value * this.purchasereqitem[index].cunitrate;
        this.purchasereqFormArry.controls[index].controls['cutotalamount'].setValue(totalamount);
      }

      else {
        let totalamount = event.target.value * this.consumble001mb?.unitamount;
      this.purchasereqFormArry.controls[index].controls['cutotalamount'].setValue(totalamount);
      }
     

    } else {
      this.calloutService.showWarning("Negative value Not Acceppted");
    }

  }

  onChangeChild(event: any, index: any) {
    for (let i = 0; i < this.arrayslno.length; i++) {
      if (this.arrayslno[i] == event.target.value) {
        this.calloutService.showWarning("Already selected");
        event.target.value = "";
        break;
      }
    }
    this.arrayslno.push(event.target.value);
    this.childPartManager.findOne(event.target.value).subscribe(response => {
      this.childPart001mb = deserialize<ChildPart001mb>(ChildPart001mb, response);
      this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
      this.purchasereqFormArry.controls[index].controls['cptname'].setValue(this.childPart001mb.cpartname);
      this.purchasereqFormArry.controls[index].controls['cptdescrip'].setValue(this.childPart001mb.descrip);
      this.purchasereqFormArry.controls[index].controls['cptuom'].setValue(this.childPart001mb.uom);
      this.purchasereqFormArry.controls[index].controls['cptunitrate'].setValue(this.childPart001mb.unitamount);
      this.purchasereqFormArry.controls[index].controls['cpthsn'].setValue(this.childPart001mb.hsn);
      this.purchasereqFormArry.controls[index].controls['cptqunty'].setValue("");
      this.purchasereqFormArry.controls[index].controls['cpttotalamount'].setValue("");

    });




  }

  onChangeCptQty(event: any, index: any) {
    if (1 == Math.sign(event.target.value)) {
      this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;

      if (this.childPart001mb?.unitamount == undefined) {
        let totalamount = event.target.value * this.purchasereqitem[index].cptunitrate;
        this.purchasereqFormArry.controls[index].controls['cpttotalamount'].setValue(totalamount);
      }

      else {
        let totalamount = event.target.value * this.childPart001mb?.unitamount;
        this.purchasereqFormArry.controls[index].controls['cpttotalamount'].setValue(totalamount);
      }
      

    } else {
      this.calloutService.showWarning("Negative value Not Acceppted");
    }

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
      this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
      this.purchasereqFormArry.controls[index].controls['prtmname'].setValue(this.part001mb.partname);
      this.purchasereqFormArry.controls[index].controls['prtdescrip'].setValue(this.part001mb.descrip);
      this.purchasereqFormArry.controls[index].controls['prtuom'].setValue(this.part001mb.uom);
      this.purchasereqFormArry.controls[index].controls['prtunitrate'].setValue(this.part001mb.unitamount);
      this.purchasereqFormArry.controls[index].controls['prthsn'].setValue(this.part001mb.hsn);
      this.purchasereqFormArry.controls[index].controls['prtqunty'].setValue("");
      this.purchasereqFormArry.controls[index].controls['prttotalamount'].setValue("");

    });
  }

  onChangepartQty(event: any, index: any) {
    if (1 == Math.sign(event.target.value)) {
      this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;

      if (this.part001mb?.unitamount == undefined) {
        let totalamount = event.target.value * this.purchasereqitem[index].prtunitrate;
        this.purchasereqFormArry.controls[index].controls['prttotalamount'].setValue(totalamount);
      }

      else {
        let totalamount = event.target.value * this.part001mb?.unitamount;
        this.purchasereqFormArry.controls[index].controls['prttotalamount'].setValue(totalamount);
      }
   

    } else {
      this.calloutService.showWarning("Negative value Not Acceppted");
    }

  }

  onCancelClick() {
    this.activeModal.close('No');
  }
}