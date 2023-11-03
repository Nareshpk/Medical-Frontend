import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { ChildPartManager } from '../services/restcontroller/bizservice/ChildPart.service';
import { ConsumbleManager } from '../services/restcontroller/bizservice/consumble.service';
import { OrderItemSettingManager } from '../services/restcontroller/bizservice/orderItems.service';
import { PartManager } from '../services/restcontroller/bizservice/part.service';
import { PurchaseInvoicePayItemManager } from '../services/restcontroller/bizservice/PurchaseInvoicesItems.service';
import { PurchaseorderManager } from '../services/restcontroller/bizservice/Purchaseorder.service';
import { ChildPart001mb } from '../services/restcontroller/entities/ChildPart001mb';
import { Consumble001mb } from '../services/restcontroller/entities/Consumble001mb';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { Orderitem001mb } from '../services/restcontroller/entities/Orderitem001mb';
import { Part001mb } from '../services/restcontroller/entities/Part001mb';
import { PurchaseItem001wb } from '../services/restcontroller/entities/purchaseItesm001wb';
import { Purchaseorder001wb } from '../services/restcontroller/entities/Purchaseorder001wb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-purchase-invoices-items',
  templateUrl: './purchase-invoices-items.component.html',
  styleUrls: ['./purchase-invoices-items.component.css']
})
export class PurchaseInvoicesItemsComponent implements OnInit {

  @Input() prsNumber: any;
  @Input() suplier: any;
  @Input() purchaseItem: any;

  PurchaseItemsForm: FormGroup | any;
  PurchaseItemsFormArray: FormArray | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  submitted = false;
  purchaseorder001wbs: Purchaseorder001wb[] = [];
  purchaseorder001wb?: Purchaseorder001wb | any;
  purchaseItem001wbs: PurchaseItem001wb[] = [];
  purchaseItem001wb?: PurchaseItem001wb
  orderitem001mbs: Orderitem001mb[] = [];
  orderitem001mb?: Orderitem001mb;
  childPart001mbs: ChildPart001mb[] = [];
  childPart001mb?: ChildPart001mb;
  consumble001mbs: Consumble001mb[] = [];
  consumble001mb?: Consumble001mb;
  part001mbs: Part001mb[] = [];
  part001mb?: Part001mb;

  user?: Login001mb | any;
  unitslno?: number;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private purchaseInvoicePayItemManager: PurchaseInvoicePayItemManager,
    private purchaseorderManager: PurchaseorderManager,
    private orderItemSettingManager: OrderItemSettingManager,
    private childPartManager: ChildPartManager,
    private consumbleManager: ConsumbleManager,
    private partManager: PartManager,
    private modalService: NgbModal,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }


  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;

    this.purchaseInvoicePayItemManager.allPurchaseItem(this.user.unitslno).subscribe(response => {
      this.purchaseItem001wbs = deserialize<PurchaseItem001wb[]>(PurchaseItem001wb, response);

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

    this.orderItemSettingManager.allitem(this.user.unitslno).subscribe(response => {
      this.orderitem001mbs = deserialize<Orderitem001mb[]>(Orderitem001mb, response);

    });

    this.PurchaseItemsForm = this.formBuilder.group({
      PurchaseItemsFormArray: this.formBuilder.array([this.createItem()])
    });

    this.purchaseorderManager.findOne(this.prsNumber).subscribe(response => {
      this.purchaseorder001wb = deserialize<Purchaseorder001wb>(Purchaseorder001wb, response);
      this.PurchaseItemsFormArray = this.f['PurchaseItemsFormArray'] as FormArray;
      for (let i = 0; i < this.purchaseorder001wb.orderitem001wbs.length; i++) {
        if (i < (this.purchaseorder001wb.orderitem001wbs.length) - 1) {
          this.PurchaseItemsFormArray.push(this.createItem());
        }

        setTimeout(() => {
          if (this.purchaseorder001wb.orderitem001wbs[i].itemcode) {
            for (let orderItems of this.orderitem001mbs) {
              if (orderItems.slNo == this.purchaseorder001wb.orderitem001wbs[i].itemcode) {
                this.PurchaseItemsFormArray.controls[i].controls['itemcode'].setValue(orderItems.itemcode);
                break;
              }
            }
          } else {
            this.PurchaseItemsFormArray.controls[i].controls['itemcode'].setValue(null);
          }
        }, 100);

        setTimeout(() => {
          if (this.purchaseorder001wb.orderitem001wbs[i].cucode) {
            for (let consumbleItems of this.consumble001mbs) {
              if (consumbleItems.slNo == this.purchaseorder001wb.orderitem001wbs[i].cucode) {
                this.PurchaseItemsFormArray.controls[i].controls['cucode'].setValue(consumbleItems.consmno);
                break;
              }
            }
          } else {
            this.PurchaseItemsFormArray.controls[i].controls['cucode'].setValue(null);
          }
        }, 100);

        setTimeout(() => {
          if (this.purchaseorder001wb.orderitem001wbs[i].cptcode) {
            for (let childPartItems of this.childPart001mbs) {
              if (childPartItems.slNo == this.purchaseorder001wb.orderitem001wbs[i].cptcode) {
                this.PurchaseItemsFormArray.controls[i].controls['cptcode'].setValue(childPartItems.cpartno);
                break;
              }
            }
          } else {
            this.PurchaseItemsFormArray.controls[i].controls['cptcode'].setValue(null);
          }
        }, 100);

        setTimeout(() => {
          if (this.purchaseorder001wb.orderitem001wbs[i].prtcode) {
            for (let partItems of this.part001mbs) {
              if (partItems.slNo == this.purchaseorder001wb.orderitem001wbs[i].prtcode) {
                this.PurchaseItemsFormArray.controls[i].controls['prtcode'].setValue(partItems.partno);
                break;
              }
            }
          } else {
            this.PurchaseItemsFormArray.controls[i].controls['prtcode'].setValue(null);
          }
        }, 100);

        // this.orderItemSettingManager.allitem(this.user.unitslno).subscribe(response => {
        //   this.orderitem001mbs = deserialize<Orderitem001mb[]>(Orderitem001mb, response);
        //   this.PurchaseItemsFormArray.controls[i].controls['itemcode'].setValue(this.purchaseorder001wb.orderitem001wbs[i].itemcode ? this.orderitem001mbs.find(x => x.slNo === this.purchaseorder001wb.orderitem001wbs[i].itemcode)?.itemcode : null);
        // });
        this.PurchaseItemsFormArray.controls[i].controls['itemname'].setValue(this.purchaseorder001wb.orderitem001wbs[i].itemname);
        this.PurchaseItemsFormArray.controls[i].controls['descrip'].setValue(this.purchaseorder001wb.orderitem001wbs[i].descrip);
        this.PurchaseItemsFormArray.controls[i].controls['uom'].setValue(this.purchaseorder001wb.orderitem001wbs[i].uom);
        this.PurchaseItemsFormArray.controls[i].controls['unitrate'].setValue(this.purchaseorder001wb.orderitem001wbs[i].unitrate);
        this.PurchaseItemsFormArray.controls[i].controls['qunty'].setValue(this.purchaseorder001wb.orderitem001wbs[i].qunty);
        this.PurchaseItemsFormArray.controls[i].controls['totalamount'].setValue(this.purchaseorder001wb.orderitem001wbs[i].totalamount);
        this.PurchaseItemsFormArray.controls[i].controls['hsn'].setValue(this.purchaseorder001wb.orderitem001wbs[i].hsn);

        // this.consumbleManager.allconsumble(this.user.unitslno).subscribe(response => {
        //   this.consumble001mbs = deserialize<Consumble001mb[]>(Consumble001mb, response);
        //   console.log(" this.consumble001mbs2", this.consumble001mbs);
        //   this.PurchaseItemsFormArray.controls[i].controls['cucode'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cucode ? this.consumble001mbs.find(x => x.slNo === this.purchaseorder001wb.orderitem001wbs[i].cucode)?.consmno : null);
        // });

        this.PurchaseItemsFormArray.controls[i].controls['cuname'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cuname);
        this.PurchaseItemsFormArray.controls[i].controls['cudescrip'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cudescrip);
        this.PurchaseItemsFormArray.controls[i].controls['cuom'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cuom);
        this.PurchaseItemsFormArray.controls[i].controls['cunitrate'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cunitrate);
        this.PurchaseItemsFormArray.controls[i].controls['cuqunty'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cuqunty);
        this.PurchaseItemsFormArray.controls[i].controls['cutotalamount'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cutotalamount);
        this.PurchaseItemsFormArray.controls[i].controls['chsn'].setValue(this.purchaseorder001wb.orderitem001wbs[i].chsn);

        // this.PurchaseItemsFormArray.controls[i].controls['cptcode'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cptcode ? this.childPart001mbs.find(x => x.slNo === this.purchaseorder001wb.orderitem001wbs[i].cucode)?.cpartno : null);
        this.PurchaseItemsFormArray.controls[i].controls['cptname'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cptname);
        this.PurchaseItemsFormArray.controls[i].controls['cptdescrip'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cptdescrip);
        this.PurchaseItemsFormArray.controls[i].controls['cptuom'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cptuom);
        this.PurchaseItemsFormArray.controls[i].controls['cptunitrate'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cptunitrate);
        this.PurchaseItemsFormArray.controls[i].controls['cptqunty'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cptqunty);
        this.PurchaseItemsFormArray.controls[i].controls['cpttotalamount'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cpttotalamount);
        this.PurchaseItemsFormArray.controls[i].controls['cpthsn'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cpthsn);

        // this.PurchaseItemsFormArray.controls[i].controls['prtcode'].setValue(this.purchaseorder001wb.orderitem001wbs[i].prtcode ? this.part001mbs.find(x => x.slNo === this.purchaseorder001wb.orderitem001wbs[i].prtcode)?.partno : null);
        this.PurchaseItemsFormArray.controls[i].controls['prtmname'].setValue(this.purchaseorder001wb.orderitem001wbs[i].prtmname);
        this.PurchaseItemsFormArray.controls[i].controls['prtdescrip'].setValue(this.purchaseorder001wb.orderitem001wbs[i].prtdescrip);
        this.PurchaseItemsFormArray.controls[i].controls['prtuom'].setValue(this.purchaseorder001wb.orderitem001wbs[i].prtuom);
        this.PurchaseItemsFormArray.controls[i].controls['prtunitrate'].setValue(this.purchaseorder001wb.orderitem001wbs[i].prtunitrate);
        this.PurchaseItemsFormArray.controls[i].controls['prtqunty'].setValue(this.purchaseorder001wb.orderitem001wbs[i].prtqunty);
        this.PurchaseItemsFormArray.controls[i].controls['prttotalamount'].setValue(this.purchaseorder001wb.orderitem001wbs[i].prttotalamount);
        this.PurchaseItemsFormArray.controls[i].controls['prthsn'].setValue(this.purchaseorder001wb.orderitem001wbs[i].prthsn);
      }
    });



  }


  get f() { return this.PurchaseItemsForm.controls; }
  get o() { return this.f.PurchaseItemsFormArray as FormArray; }

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
      purchaseslno2: [""],
      itemcode: ['', Validators.required],
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
      prtuom: ['', Validators.required],
      prthsn: ['', Validators.required],
      prtunitrate: ['', Validators.required],
      prttotalamount: ['', Validators.required],

      PurchaseItemsFormArray: new FormArray([]),
    })
  }

  addItem() {
    this.PurchaseItemsFormArray = this.f['PurchaseItemsFormArray'] as FormArray;
    this.PurchaseItemsFormArray.push(this.createItem());
  }

  removeItem(idx: number): void {
    (this.f['PurchaseItemsFormArray'] as FormArray).removeAt(idx);
  }

  onOkClick(event: any, PurchaseItemsForm: any) {

    let orderitem001mbs: PurchaseItem001wb[] = [];
    for (let i = 0; i < this.PurchaseItemsFormArray.controls.length; i++) {
      let purchaseItem001wb = new PurchaseItem001wb();
      // purchaseItem001wb.purchaseslno2 =  this.f.PurchaseItemsFormArray.value[i].purchaseslno2 ? this.f.PurchaseItemsFormArray.value[i].purchaseslno2 : null;
      purchaseItem001wb.itemcode = this.f.PurchaseItemsFormArray.value[i].itemcode ? this.orderitem001mbs.find(x => x.itemcode === this.PurchaseItemsFormArray.value[i].itemcode)?.slNo : null;
      purchaseItem001wb.itemname = this.f.PurchaseItemsFormArray.value[i].itemname ? this.f.PurchaseItemsFormArray.value[i].itemname : "";
      purchaseItem001wb.qunty = this.f.PurchaseItemsFormArray.value[i].qunty ? this.f.PurchaseItemsFormArray.value[i].qunty : "";
      purchaseItem001wb.totalamount = this.f.PurchaseItemsFormArray.value[i].totalamount ? this.f.PurchaseItemsFormArray.value[i].totalamount : null;
      purchaseItem001wb.unitrate = this.f.PurchaseItemsFormArray.value[i].unitrate ? this.f.PurchaseItemsFormArray.value[i].unitrate : "";
      purchaseItem001wb.descrip = this.f.PurchaseItemsFormArray.value[i].descrip ? this.f.PurchaseItemsFormArray.value[i].descrip : "";
      purchaseItem001wb.uom = this.f.PurchaseItemsFormArray.value[i].uom ? this.f.PurchaseItemsFormArray.value[i].uom : "";
      purchaseItem001wb.hsn = this.f.PurchaseItemsFormArray.value[i].hsn ? this.f.PurchaseItemsFormArray.value[i].hsn : "";

      purchaseItem001wb.cucode = this.f.PurchaseItemsFormArray.value[i].cucode ? this.consumble001mbs.find(x => x.consmno === this.PurchaseItemsFormArray.value[i].cucode)?.slNo : null;
      purchaseItem001wb.cuname = this.f.PurchaseItemsFormArray.value[i].cuname ? this.f.PurchaseItemsFormArray.value[i].cuname : "";
      purchaseItem001wb.cuqunty = this.f.PurchaseItemsFormArray.value[i].cuqunty ? this.f.PurchaseItemsFormArray.value[i].cuqunty : "";
      purchaseItem001wb.cutotalamount = this.f.PurchaseItemsFormArray.value[i].cutotalamount ? this.f.PurchaseItemsFormArray.value[i].cutotalamount : null;
      purchaseItem001wb.cunitrate = this.f.PurchaseItemsFormArray.value[i].cunitrate ? this.f.PurchaseItemsFormArray.value[i].cunitrate : "";
      purchaseItem001wb.cudescrip = this.f.PurchaseItemsFormArray.value[i].cudescrip ? this.f.PurchaseItemsFormArray.value[i].cudescrip : "";
      purchaseItem001wb.cuom = this.f.PurchaseItemsFormArray.value[i].cuom ? this.f.PurchaseItemsFormArray.value[i].cuom : "";
      purchaseItem001wb.chsn = this.f.PurchaseItemsFormArray.value[i].chsn ? this.f.PurchaseItemsFormArray.value[i].chsn : "";

      purchaseItem001wb.cptcode = this.f.PurchaseItemsFormArray.value[i].cptcode ? this.childPart001mbs.find(x => x.cpartno === this.PurchaseItemsFormArray.value[i].cptcode)?.slNo : null;
      purchaseItem001wb.cptname = this.f.PurchaseItemsFormArray.value[i].cptname ? this.f.PurchaseItemsFormArray.value[i].cptname : "";
      purchaseItem001wb.cptunitrate = this.f.PurchaseItemsFormArray.value[i].cptunitrate ? this.f.PurchaseItemsFormArray.value[i].cptunitrate : "";
      purchaseItem001wb.cptqunty = this.f.PurchaseItemsFormArray.value[i].cptqunty ? this.f.PurchaseItemsFormArray.value[i].cptqunty : "";
      purchaseItem001wb.cpttotalamount = this.f.PurchaseItemsFormArray.value[i].cpttotalamount ? this.f.PurchaseItemsFormArray.value[i].cpttotalamount : null;
      purchaseItem001wb.cptdescrip = this.f.PurchaseItemsFormArray.value[i].cptdescrip ? this.f.PurchaseItemsFormArray.value[i].cptdescrip : "";
      purchaseItem001wb.cptuom = this.f.PurchaseItemsFormArray.value[i].cptuom ? this.f.PurchaseItemsFormArray.value[i].cptuom : "";
      purchaseItem001wb.cpthsn = this.f.PurchaseItemsFormArray.value[i].cpthsn ? this.f.PurchaseItemsFormArray.value[i].cpthsn : "";

      purchaseItem001wb.prtcode = this.f.PurchaseItemsFormArray.value[i].prtcode ? this.part001mbs.find(x => x.partno === this.PurchaseItemsFormArray.value[i].prtcode)?.slNo : null;
      purchaseItem001wb.prtmname = this.f.PurchaseItemsFormArray.value[i].prtmname ? this.f.PurchaseItemsFormArray.value[i].prtmname : "";
      purchaseItem001wb.prtqunty = this.f.PurchaseItemsFormArray.value[i].prtqunty ? this.f.PurchaseItemsFormArray.value[i].prtqunty : "";
      purchaseItem001wb.prttotalamount = this.f.PurchaseItemsFormArray.value[i].prttotalamount ? this.f.PurchaseItemsFormArray.value[i].prttotalamount : null;
      purchaseItem001wb.prtunitrate = this.f.PurchaseItemsFormArray.value[i].prtunitrate ? this.f.PurchaseItemsFormArray.value[i].prtunitrate : "";
      purchaseItem001wb.prtdescrip = this.f.PurchaseItemsFormArray.value[i].prtdescrip ? this.f.PurchaseItemsFormArray.value[i].prtdescrip : "";
      purchaseItem001wb.prtuom = this.f.PurchaseItemsFormArray.value[i].prtuom ? this.f.PurchaseItemsFormArray.value[i].prtuom : "";
      purchaseItem001wb.prthsn = this.f.PurchaseItemsFormArray.value[i].prthsn ? this.f.PurchaseItemsFormArray.value[i].prthsn : "";
      orderitem001mbs.push(purchaseItem001wb)

      this.activeModal.close({
        status: "Yes",
        purchaseItem: orderitem001mbs,
      });

    }

  }
  onReset() {
    this.submitted = false;
    this.PurchaseItemsForm.reset();
  }
  onCancelClick() {
    this.activeModal.close('No');
  }



}
