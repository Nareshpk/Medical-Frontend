import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { id } from '@swimlane/ngx-charts';
import { GridOptions } from 'ag-grid-community';
import { data } from 'jquery';
import { EventEmitter } from 'protractor';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { ChildPartManager } from '../services/restcontroller/bizservice/ChildPart.service';
import { ConsumbleManager } from '../services/restcontroller/bizservice/consumble.service';
import { OrderItemManager } from '../services/restcontroller/bizservice/orderitem-wb.service';
import { OrderItemSettingManager } from '../services/restcontroller/bizservice/orderItems.service';
import { PartManager } from '../services/restcontroller/bizservice/part.service';
import { SupplierQuotationManager } from '../services/restcontroller/bizservice/supplierquotation.service';
import { SupplierQuotationItemManager } from '../services/restcontroller/bizservice/SupplierQuotationitem.service';
import { ChildPart001mb } from '../services/restcontroller/entities/ChildPart001mb';
import { Consumble001mb } from '../services/restcontroller/entities/Consumble001mb';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { Orderitem001mb } from '../services/restcontroller/entities/Orderitem001mb';
import { Orderitem001wb } from '../services/restcontroller/entities/orderitem001wb';
import { Part001mb } from '../services/restcontroller/entities/Part001mb';
import { Supplierquotation001wb } from '../services/restcontroller/entities/supplierquotation001wb ';
import { Supplierquotationitems001wb } from '../services/restcontroller/entities/Supplierquotationitems001wb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-order-add-item',
  templateUrl: './order-add-item.component.html',
  styleUrls: ['./order-add-item.component.css']
})
export class OrderAddItemComponent implements OnInit {
  @Input() orderItems: any;
  @Input() prsNumber: any;
  @Input() suplier: any;
  @Input() TAmount: any;
  @Input() consumableTAmount: any
  @Input() childparTAmount: any
  @Input() partTAmount: any
  orderItemForm: FormGroup | any;
  orderItemsFormArray: FormArray | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  submitted = false;
  slNo: number | any;
  purchaseslno: number | any;
  orderslno: number | any;
  itemname: string = "";
  descrip: string = "";
  qunty: string = "";
  uom: string = "";
  unitrate: string = "";
  unitamount?: number | any;
  totalamount: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  orderitem001mbs: Orderitem001mb[] = [];
  orderitem001mb?: Orderitem001mb;
  consumble001mbs: Consumble001mb[] = [];
  consumble001mb?: Consumble001mb;
  part001mbs: Part001mb[] = [];
  part001mb?: Part001mb;
  childPart001mbs: ChildPart001mb[] = [];
  childPart001mb?: ChildPart001mb;
  orderitem001wbs: Orderitem001wb[] = [];
  orderitem001wb?: Orderitem001wb;
  supplierquotation001wbs: Supplierquotation001wb[] = [];
  supplierquotation001wb?: Supplierquotation001wb | any;
  supplierquotationitems001wbs: Supplierquotationitems001wb[] = [];
  supplierquotationitems001wb?: Supplierquotationitems001wb;
  arrayslno: any = [];
  user?: Login001mb | any;
  unitslno?: number;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private orderItemManager: OrderItemManager,
    private supplierQuotationManager: SupplierQuotationManager,
    private supplierQuotationItemManager: SupplierQuotationItemManager,
    private orderItemSettingManager: OrderItemSettingManager,
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

    this.orderItemForm = this.formBuilder.group({
      orderItemsFormArray: this.formBuilder.array([this.createItem()])
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
    // });



    // this.supplierQuotationItemManager.allsupplierItem().subscribe(response => {
    //   this.supplierquotationitems001wbs = deserialize<Supplierquotationitems001wb[]>(Supplierquotationitems001wb, response);

    // });

    this.supplierQuotationManager.findOne(this.prsNumber).subscribe(response => {
      this.supplierquotation001wb = deserialize<Supplierquotation001wb>(Supplierquotation001wb, response);
      // console.log("this.orderitem001mbs",this.orderitem001mbs);

      for (let i = 0; i < this.supplierquotation001wb.supplierquotationitems001wbs.length; i++) {
        this.orderItemsFormArray = this.f['orderItemsFormArray'] as FormArray;
        if (i < (this.supplierquotation001wb.supplierquotationitems001wbs.length) - 1) {
          this.orderItemsFormArray.push(this.createItem());
        }
        setTimeout(() => {
          if (this.supplierquotation001wb.supplierquotationitems001wbs[i].itemcode) {
            for (let orderItem of this.orderitem001mbs) {
              if (orderItem.slNo == this.supplierquotation001wb.supplierquotationitems001wbs[i].itemcode) {
                this.orderItemsFormArray.controls[i].controls['itemcode'].setValue(orderItem.itemcode);
                break;
              }
            }
            // console.log(" t?his.orderItemsFormArray.controls[i].controls['itemcode']", this.orderItemsFormArray.controls[i].controls['itemcode']);

          } else {
            this.orderItemsFormArray.controls[i].controls['itemcode'].setValue(null);
          }
        }, 100);
        // this.orderItemsFormArray.controls[i].controls['itemcode'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].itemcode ? this.orderitem001mbs.find(x => x.slNo === this.supplierquotation001wb.supplierquotationitems001wbs[i].itemcode)?.itemcode : null);
        this.orderItemsFormArray.controls[i].controls['itemname'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].itemname);
        this.orderItemsFormArray.controls[i].controls['descrip'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].descrip);
        this.orderItemsFormArray.controls[i].controls['uom'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].uom);
        this.orderItemsFormArray.controls[i].controls['unitrate'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].unitrate);
        this.orderItemsFormArray.controls[i].controls['qunty'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].qunty);
        this.orderItemsFormArray.controls[i].controls['totalamount'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].totalamount);
        this.orderItemsFormArray.controls[i].controls['hsn'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].hsn);
        setTimeout(() => {
          if (this.supplierquotation001wb.supplierquotationitems001wbs[i].cucode) {
            for (let ConsumableItem of this.consumble001mbs) {
              if (ConsumableItem.slNo == this.supplierquotation001wb.supplierquotationitems001wbs[i].cucode) {
                this.orderItemsFormArray.controls[i].controls['cucode'].setValue(ConsumableItem.consmno);
                break;
              }
            }
          } else {
            this.orderItemsFormArray.controls[i].controls['cucode'].setValue(null);
          }
        }, 100);
        // this.orderItemsFormArray.controls[i].controls['cucode'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].cucode ? this.consumble001mbs.find(x => x.slNo === this.supplierquotation001wb.supplierquotationitems001wbs[i].cucode)?.consmno : null);

        this.orderItemsFormArray.controls[i].controls['cuname'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].cuname);
        this.orderItemsFormArray.controls[i].controls['cudescrip'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].cudescrip);
        this.orderItemsFormArray.controls[i].controls['cuom'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].cuom);
        this.orderItemsFormArray.controls[i].controls['cunitrate'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].cunitrate);
        this.orderItemsFormArray.controls[i].controls['cuqunty'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].cuqunty);
        this.orderItemsFormArray.controls[i].controls['cutotalamount'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].cutotalamount);
        this.orderItemsFormArray.controls[i].controls['chsn'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].chsn);
        setTimeout(() => {
          if (this.supplierquotation001wb.supplierquotationitems001wbs[i].cptcode) {
            for (let ChildpartItem of this.childPart001mbs) {
              if (ChildpartItem.slNo == this.supplierquotation001wb.supplierquotationitems001wbs[i].cptcode) {
                this.orderItemsFormArray.controls[i].controls['cptcode'].setValue(ChildpartItem.cpartno);
                break;
              }
            }
          } else {
            this.orderItemsFormArray.controls[i].controls['cptcode'].setValue(null);
          }
        }, 100);
        // this.orderItemsFormArray.controls[i].controls['cptcode'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].cptcode ? this.childPart001mbs.find(x => x.slNo === this.supplierquotation001wb.supplierquotationitems001wbs[i].cptcode)?.cpartno : null)
        this.orderItemsFormArray.controls[i].controls['cptname'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].cptname);
        this.orderItemsFormArray.controls[i].controls['cptdescrip'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].cptdescrip);
        this.orderItemsFormArray.controls[i].controls['cptuom'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].cptuom);
        this.orderItemsFormArray.controls[i].controls['cptunitrate'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].cptunitrate);
        this.orderItemsFormArray.controls[i].controls['cptqunty'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].cptqunty);
        this.orderItemsFormArray.controls[i].controls['cpttotalamount'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].cpttotalamount);
        this.orderItemsFormArray.controls[i].controls['cpthsn'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].cpthsn);
        setTimeout(() => {
          if (this.supplierquotation001wb.supplierquotationitems001wbs[i].prtcode) {
            for (let partItem of this.part001mbs) {
              if (partItem.slNo == this.supplierquotation001wb.supplierquotationitems001wbs[i].prtcode) {
                this.orderItemsFormArray.controls[i].controls['prtcode'].setValue(partItem.partno);
                break;
              }
            }
          } else {
            this.orderItemsFormArray.controls[i].controls['prtcode'].setValue(null);
          }
        }, 100);
        // this.orderItemsFormArray.controls[i].controls['prtcode'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].prtcode ? this.part001mbs.find(x => x.slNo === this.supplierquotation001wb.supplierquotationitems001wbs[i].prtcode)?.partno : null)
        this.orderItemsFormArray.controls[i].controls['prtmname'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].prtmname);
        this.orderItemsFormArray.controls[i].controls['prtdescrip'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].prtdescrip);
        this.orderItemsFormArray.controls[i].controls['prtuom'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].prtuom);
        this.orderItemsFormArray.controls[i].controls['prtunitrate'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].prtunitrate);
        this.orderItemsFormArray.controls[i].controls['prtqunty'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].prtqunty);
        this.orderItemsFormArray.controls[i].controls['prttotalamount'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].prttotalamount);
        this.orderItemsFormArray.controls[i].controls['prthsn'].setValue(this.supplierquotation001wb.supplierquotationitems001wbs[i].prthsn);
      }
    });


    // this.loadData();


  }


  // loadData() {
  //   this.orderItemManager.allorder(this.user.unitslno).subscribe(response => {
  //     this.orderitem001wbs = deserialize<Orderitem001wb[]>(Orderitem001wb, response);
  //     if (this.orderitem001wbs.length > 0) {
  //       this.gridOptions?.api?.setRowData(this.orderitem001wbs);
  //     } else {
  //       this.gridOptions?.api?.setRowData([]);
  //     }
  //   });
  // }


  get f() { return this.orderItemForm.controls; }
  get o() { return this.f.orderItemsFormArray as FormArray; }

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

      orderItemsFormArray: new FormArray([]),
    })
  }

  addItem() {
    this.orderItemsFormArray = this.f['orderItemsFormArray'] as FormArray;
    this.orderItemsFormArray.push(this.createItem());
  }

  removeItem(idx: number): void {
    (this.f['orderItemsFormArray'] as FormArray).removeAt(idx);
  }


  onOkClick(event: any, orderItemForm: any) {
    let TAmount = 0;
    let consumableTAmount = 0;
    let childparTAmount = 0;
    let partTAmount = 0;
    let orderitem001mbs: Orderitem001wb[] = [];
    for (let i = 0; i < this.orderItemsFormArray.controls.length; i++) {
      let orderitem001wb = new Orderitem001wb();
      orderitem001wb.purchaseslno2 = this.f.orderItemsFormArray.value[i].purchaseslno2 ? this.f.orderItemsFormArray.value[i].purchaseslno2 : null;
      orderitem001wb.itemcode = this.f.orderItemsFormArray.value[i].itemcode ? this.orderitem001mbs.find(x => x.itemcode === this.f.orderItemsFormArray.value[i].itemcode)?.slNo : null;
      orderitem001wb.itemname = this.f.orderItemsFormArray.value[i].itemname ? this.f.orderItemsFormArray.value[i].itemname : "";
      orderitem001wb.qunty = this.f.orderItemsFormArray.value[i].qunty ? this.f.orderItemsFormArray.value[i].qunty : "";
      orderitem001wb.totalamount = this.f.orderItemsFormArray.value[i].totalamount ? this.f.orderItemsFormArray.value[i].totalamount : null;
      TAmount += orderitem001wb.totalamount
      orderitem001wb.unitrate = this.f.orderItemsFormArray.value[i].unitrate ? this.f.orderItemsFormArray.value[i].unitrate : "";
      orderitem001wb.descrip = this.f.orderItemsFormArray.value[i].descrip ? this.f.orderItemsFormArray.value[i].descrip : "";
      orderitem001wb.uom = this.f.orderItemsFormArray.value[i].uom ? this.f.orderItemsFormArray.value[i].uom : "";
      orderitem001wb.hsn = this.f.orderItemsFormArray.value[i].hsn ? this.f.orderItemsFormArray.value[i].hsn : "";

      orderitem001wb.cucode = this.f.orderItemsFormArray.value[i].cucode ? this.consumble001mbs.find(x => x.consmno === this.f.orderItemsFormArray.value[i].cucode)?.slNo : null;
      orderitem001wb.cuname = this.f.orderItemsFormArray.value[i].cuname ? this.f.orderItemsFormArray.value[i].cuname : "";
      orderitem001wb.cuqunty = this.f.orderItemsFormArray.value[i].cuqunty ? this.f.orderItemsFormArray.value[i].cuqunty : "";
      orderitem001wb.cutotalamount = this.f.orderItemsFormArray.value[i].cutotalamount ? this.f.orderItemsFormArray.value[i].cutotalamount : null;
      consumableTAmount += orderitem001wb.cutotalamount
      orderitem001wb.cunitrate = this.f.orderItemsFormArray.value[i].cunitrate ? this.f.orderItemsFormArray.value[i].cunitrate : "";
      orderitem001wb.cudescrip = this.f.orderItemsFormArray.value[i].cudescrip ? this.f.orderItemsFormArray.value[i].cudescrip : "";
      orderitem001wb.cuom = this.f.orderItemsFormArray.value[i].cuom ? this.f.orderItemsFormArray.value[i].cuom : "";
      orderitem001wb.chsn = this.f.orderItemsFormArray.value[i].chsn ? this.f.orderItemsFormArray.value[i].chsn : "";

      orderitem001wb.cptcode = this.f.orderItemsFormArray.value[i].cptcode ? this.childPart001mbs.find(x => x.cpartno === this.f.orderItemsFormArray.value[i].cptcode)?.slNo : null;
      orderitem001wb.cptname = this.f.orderItemsFormArray.value[i].cptname ? this.f.orderItemsFormArray.value[i].cptname : "";
      orderitem001wb.cptunitrate = this.f.orderItemsFormArray.value[i].cptunitrate ? this.f.orderItemsFormArray.value[i].cptunitrate : "";
      orderitem001wb.cptqunty = this.f.orderItemsFormArray.value[i].cptqunty ? this.f.orderItemsFormArray.value[i].cptqunty : "";
      orderitem001wb.cpttotalamount = this.f.orderItemsFormArray.value[i].cpttotalamount ? this.f.orderItemsFormArray.value[i].cpttotalamount : null;
      childparTAmount += orderitem001wb.cpttotalamount
      orderitem001wb.cptdescrip = this.f.orderItemsFormArray.value[i].cptdescrip ? this.f.orderItemsFormArray.value[i].cptdescrip : "";
      orderitem001wb.cptuom = this.f.orderItemsFormArray.value[i].cptuom ? this.f.orderItemsFormArray.value[i].cptuom : "";
      orderitem001wb.cpthsn = this.f.orderItemsFormArray.value[i].cpthsn ? this.f.orderItemsFormArray.value[i].cpthsn : "";

      orderitem001wb.prtcode = this.f.orderItemsFormArray.value[i].prtcode ? this.part001mbs.find(x => x.partno === this.f.orderItemsFormArray.value[i].prtcode)?.slNo : null;
      orderitem001wb.prtmname = this.f.orderItemsFormArray.value[i].prtmname ? this.f.orderItemsFormArray.value[i].prtmname : "";
      orderitem001wb.prtqunty = this.f.orderItemsFormArray.value[i].prtqunty ? this.f.orderItemsFormArray.value[i].prtqunty : "";
      orderitem001wb.prttotalamount = this.f.orderItemsFormArray.value[i].prttotalamount ? this.f.orderItemsFormArray.value[i].prttotalamount : null;
      partTAmount += orderitem001wb.prttotalamount
      orderitem001wb.prtunitrate = this.f.orderItemsFormArray.value[i].prtunitrate ? this.f.orderItemsFormArray.value[i].prtunitrate : "";
      orderitem001wb.prtdescrip = this.f.orderItemsFormArray.value[i].prtdescrip ? this.f.orderItemsFormArray.value[i].prtdescrip : "";
      orderitem001wb.prtuom = this.f.orderItemsFormArray.value[i].prtuom ? this.f.orderItemsFormArray.value[i].prtuom : "";
      orderitem001wb.prthsn = this.f.orderItemsFormArray.value[i].prthsn ? this.f.orderItemsFormArray.value[i].prthsn : "";
      orderitem001mbs.push(orderitem001wb)
      setTimeout(() => {
      this.activeModal.close({
        status: "Yes",
        orderItems: orderitem001mbs,
        TAmount: TAmount,
        consumableTAmount: consumableTAmount,
        childparTAmount: childparTAmount,
        partTAmount: partTAmount,
      });
      console.log("partTAmount",partTAmount);
    }, 100);
      
      

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
      this.orderItemsFormArray = this.f['orderItemsFormArray'] as FormArray;
      this.orderItemsFormArray.controls[index].controls['itemname'].setValue(this.orderitem001mb.itemname);
      this.orderItemsFormArray.controls[index].controls['descrip'].setValue(this.orderitem001mb.descrip);
      this.orderItemsFormArray.controls[index].controls['uom'].setValue(this.orderitem001mb.descrip);
      this.orderItemsFormArray.controls[index].controls['unitrate'].setValue(this.orderitem001mb.unitamount);
      this.orderItemsFormArray.controls[index].controls['qunty'].setValue("");
      this.orderItemsFormArray.controls[index].controls['totalamount'].setValue("");

    });
  }

  onChangeQty(event: any, index: any) {
    this.orderItemsFormArray = this.f['orderItemsFormArray'] as FormArray;
    let totalamount = event.target.value * this.orderitem001mb?.unitamount;
    this.orderItemsFormArray.controls[index].controls['totalamount'].setValue(totalamount);
  }



  onReset() {
    this.submitted = false;
    this.orderItemForm.reset();
  }
  onCancelClick() {
    this.activeModal.close('No');
  }

}




