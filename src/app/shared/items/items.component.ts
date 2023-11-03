import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { ChildPartManager } from '../services/restcontroller/bizservice/ChildPart.service';
import { ConsumbleManager } from '../services/restcontroller/bizservice/consumble.service';
import { OrderItemSettingManager } from '../services/restcontroller/bizservice/orderItems.service';
import { PartManager } from '../services/restcontroller/bizservice/part.service';
import { PurchasereqItemManager } from '../services/restcontroller/bizservice/Purchasereqitem.service';
import { SupplierTypeManager } from '../services/restcontroller/bizservice/Suppliertype.service';
import { ChildPart001mb } from '../services/restcontroller/entities/ChildPart001mb';
import { Consumble001mb } from '../services/restcontroller/entities/Consumble001mb';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { Orderitem001mb } from '../services/restcontroller/entities/Orderitem001mb';
import { Part001mb } from '../services/restcontroller/entities/Part001mb';
import { Purchasereqitem001wb } from '../services/restcontroller/entities/purchasereqitems001wb';
import { Suppliertype001mb } from '../services/restcontroller/entities/Suppliertype001mb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {


  @Input() purchasereqitem: any;
  @Input() title: any;
  purchasereqForm: FormGroup | any;
  purchasereqFormArry: FormArray | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  slNo?: number;
  orderslno?: number;
  itemcode?: string;
  itemname?: string;
  descrip?: string;
  qunty?: string;
  uom?: string;
  hsn?: string;
  unitrate?: string;
  totalamount?: number;
  purchasereqitem001wbs: Purchasereqitem001wb[] = [];
  purchasereqitem001wb?: Purchasereqitem001wb;
  suppliertype001mbs: Suppliertype001mb[] | any;
  suppliertype001mb?: Suppliertype001mb;
  orderitem001mbs: Orderitem001mb[] = [];
  orderitem001mb?: Orderitem001mb;
  consumble001mbs: Consumble001mb[] = [];
  consumble001mb?: Consumble001mb;
  childPart001mbs: ChildPart001mb[] = [];
  childPart001mb?: ChildPart001mb;
  part001mbs: Part001mb[] = [];
  part001mb?: Part001mb;
  arrayslno: any = [];
  orderItems: any[] = [];
  user?:Login001mb|any;
  unitslno?:number;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private purchasereqItemManager: PurchasereqItemManager,
    private orderItemSettingManager: OrderItemSettingManager,
    private supplierTypeManager: SupplierTypeManager,
    private consumbleManager: ConsumbleManager,
    private childPartManager: ChildPartManager,
    private partManager: PartManager,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }
  ngOnInit(): void {
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

  }

  get f() {
    return this.purchasereqForm.controls;
  }

  createItem() {
    return this.formBuilder.group({
      orderslno: ['', Validators.required],
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
        this.calloutService.showWarning("Qty Value Should be Greater than 0!");
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

  onOkClick(event: any, purchasereqForm: any) {
    // console.log("purchasereqForm",purchasereqForm.controls.purchasereqFormArry[0].controls[0].orderslno);
    console.log("purchasereqForm", purchasereqForm);

    let purchasereqitem001wbs: Purchasereqitem001wb[] = [];
    for (let i = 0; i < this.purchasereqForm.controls.purchasereqFormArry.controls.length; i++) {

      let purchasereqitem001wb = new Purchasereqitem001wb();
      purchasereqitem001wb.orderslno = this.f.purchasereqFormArry.value[i].orderslno ? this.f.purchasereqFormArry.value[i].orderslno : null;
      purchasereqitem001wb.itemname = this.f.purchasereqFormArry.value[i].itemname ? this.f.purchasereqFormArry.value[i].itemname : "";
      purchasereqitem001wb.qunty = this.f.purchasereqFormArry.value[i].qunty ? this.f.purchasereqFormArry.value[i].qunty : "";
      purchasereqitem001wb.totalamount = this.f.purchasereqFormArry.value[i].totalamount ? this.f.purchasereqFormArry.value[i].totalamount : null;
      purchasereqitem001wb.unitrate = this.f.purchasereqFormArry.value[i].unitrate ? this.f.purchasereqFormArry.value[i].unitrate : "";
      purchasereqitem001wb.descrip = this.f.purchasereqFormArry.value[i].descrip ? this.f.purchasereqFormArry.value[i].descrip : "";
      purchasereqitem001wb.uom = this.f.purchasereqFormArry.value[i].uom ? this.f.purchasereqFormArry.value[i].uom : "";
      purchasereqitem001wb.hsn = this.f.purchasereqFormArry.value[i].hsn ? this.f.purchasereqFormArry.value[i].hsn : "";
      purchasereqitem001wbs.push(purchasereqitem001wb);

      this.activeModal.close({
        status: "Yes",
        purchasereqitem: purchasereqitem001wbs,
      });
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
      this.purchasereqFormArry.controls[index].controls['uom'].setValue(this.orderitem001mb.descrip);
      this.purchasereqFormArry.controls[index].controls['unitrate'].setValue(this.orderitem001mb.unitamount);
      this.purchasereqFormArry.controls[index].controls['hsn'].setValue(this.orderitem001mb.hsn);
      this.purchasereqFormArry.controls[index].controls['qunty'].setValue("");
      this.purchasereqFormArry.controls[index].controls['totalamount'].setValue("");

    });
  }

  onChangeQty(event: any, index: any) {
    this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    let totalamount = event.target.value * this.orderitem001mb?.unitamount;
    this.purchasereqFormArry.controls[index].controls['totalamount'].setValue(totalamount);
  }

  onCancelClick() {
    this.activeModal.close('No');
  }
}

