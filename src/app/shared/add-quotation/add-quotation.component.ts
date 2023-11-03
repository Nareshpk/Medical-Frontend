import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { find } from 'ag-charts-community';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { ChildPartManager } from '../services/restcontroller/bizservice/ChildPart.service';
import { ConsumbleManager } from '../services/restcontroller/bizservice/consumble.service';
import { OrderItemSettingManager } from '../services/restcontroller/bizservice/orderItems.service';
import { PartManager } from '../services/restcontroller/bizservice/part.service';
import { PurchasereqItemManager } from '../services/restcontroller/bizservice/Purchasereqitem.service';
import { PurchasereqslipManager } from '../services/restcontroller/bizservice/Purchasereqslip.service';
import { SupplierQuotationItemManager } from '../services/restcontroller/bizservice/SupplierQuotationitem.service';
import { ChildPart001mb } from '../services/restcontroller/entities/ChildPart001mb';
import { Consumble001mb } from '../services/restcontroller/entities/Consumble001mb';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { Orderitem001mb } from '../services/restcontroller/entities/Orderitem001mb';
import { Part001mb } from '../services/restcontroller/entities/Part001mb';
import { Purchasereqitem001wb } from '../services/restcontroller/entities/purchasereqitems001wb';
import { Purchasereqslip001wb } from '../services/restcontroller/entities/Purchasereqslip001wb';
import { Supplierquotationitems001wb } from '../services/restcontroller/entities/Supplierquotationitems001wb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-add-quotation',
  templateUrl: './add-quotation.component.html',
  styleUrls: ['./add-quotation.component.css']
})
export class AddQuotationComponent implements OnInit {
  @Input() supplierItems: any;
  @Input() prsNumber: any;
  @Input() suplier: any;
  @Input() TAmount: any;
  @Input() consumableTAmount: any
  @Input() childparTAmount: any
  @Input() partTAmount: any
  supplierQuotationForm: FormGroup | any;
  supplierQuotationFormArray: FormArray | any;


  slNo?: number;
  suplierslno?: number | any
  itemcode?: number;
  itemname?: string;
  descrip?: string;
  qunty?: string;
  uom?: string;
  hsn?: string | null;;
  unitrate?: string;
  totalamount?: number;
  cucode?: number;
  cuname?: string;
  cudescrip?: string;
  cuqunty?: string;
  cuom?: string;
  chsn?: string | null;
  cunitrate?: string;
  cutotalamount?: number;
  cptcode?: number;
  cptname?: string;
  cptdescrip?: string;
  cptqunty?: string;
  cptuom?: string;
  cpthsn?: string | null;;
  cptunitrate?: string;
  cpttotalamount?: number;
  prtcode?: number;
  prtmname?: string;
  prtdescrip?: string;
  prtqunty?: string;
  prtuom?: string;
  prthsn?: string;
  prtunitrate?: string;
  prttotalamount?: number;
  insertUser?: string;
  insertDatetime?: Date;
  updatedUser?: string | null;
  updatedDatetime?: Date | null;
  orderitemSlno: any;
  supplierquotationitems001wbs: Supplierquotationitems001wb[] = [];
  supplierquotationitems001wb?: Supplierquotationitems001wb;
  orderitem001mbs: Orderitem001mb[] = [];
  orderitem001mb?: Orderitem001mb;
  consumble001mbs: Consumble001mb[] = [];
  consumble001mb?: Consumble001mb;
  part001mbs: Part001mb[] = [];
  part001mb?: Part001mb;
  childPart001mbs: ChildPart001mb[] = [];
  childPart001mb?: ChildPart001mb;
  purchasereqslip001wbs: Purchasereqslip001wb[] = [];
  purchasereqslip001wb: Purchasereqslip001wb | any;
  purchasereqitem001wbs: Purchasereqitem001wb[] = [];
  purchasereqitem001wb?: Purchasereqitem001wb;
  // purchasereqslip001wb?: Purchasereqslip001wb;
  user?: Login001mb | any;
  suplieitemSlno?: number;
  unitslno?: number;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private supplierQuotationItemManager: SupplierQuotationItemManager,
    private orderItemSettingManager: OrderItemSettingManager,
    private consumbleManager: ConsumbleManager,
    private childPartManager: ChildPartManager,
    private partManager: PartManager,
    private purchaseregslipManager: PurchasereqslipManager,
    private purchasereqItemManager: PurchasereqItemManager,
    private modalService: NgbModal,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit() {

    

    this.user = this.authManager.getcurrentUser;

    this.supplierQuotationForm = this.formBuilder.group({
      supplierQuotationFormArray: this.formBuilder.array([this.createItem()])
    });

    this.supplierQuotationItemManager.allsupplierItem(this.user.unitslno).subscribe(response => {
      this.supplierquotationitems001wbs = deserialize<Supplierquotationitems001wb[]>(Supplierquotationitems001wb, response);

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

    

    this.purchaseregslipManager.findOne(this.prsNumber).subscribe(response => {
      this.purchasereqslip001wb = deserialize<Purchasereqslip001wb>(Purchasereqslip001wb, response);
      let orderitem: any = [];


      for (let i = 0; i < this.purchasereqslip001wb.purchasereqitem001wbs.length; i++) {
        this.supplierQuotationFormArray = this.f['supplierQuotationFormArray'] as FormArray;
        if (i < (this.purchasereqslip001wb.purchasereqitem001wbs.length) - 1) {
          this.supplierQuotationFormArray.push(this.createItem());
        }

        setTimeout(() => {
          if (this.purchasereqslip001wb.purchasereqitem001wbs[i].orderslno) {
            for (let orderItems of this.orderitem001mbs) {
              if (orderItems.slNo == this.purchasereqslip001wb.purchasereqitem001wbs[i].orderslno) {
                this.supplierQuotationFormArray.controls[i].controls['itemcode'].setValue(orderItems.itemcode);
                break;
              }
            }
          } else {
            this.supplierQuotationFormArray.controls[i].controls['itemcode'].setValue(null);
          }
        }, 100);

        setTimeout(() => {
          if (this.purchasereqslip001wb.purchasereqitem001wbs[i].cucode) {
            console.log("this.consumble001mbs", this.consumble001mbs);
            
            for (let consumbleItems of this.consumble001mbs) {
              if (consumbleItems.slNo == this.purchasereqslip001wb.purchasereqitem001wbs[i].cucode) {
                this.supplierQuotationFormArray.controls[i].controls['cucode'].setValue(consumbleItems.consmno);
                break;
              }
            }
          } else {
            this.supplierQuotationFormArray.controls[i].controls['cucode'].setValue(null);
          }
        }, 100);

        setTimeout(() => {
          if (this.purchasereqslip001wb.purchasereqitem001wbs[i].cptcode) {
            for (let childPartItems of this.childPart001mbs) {
              if (childPartItems.slNo == this.purchasereqslip001wb.purchasereqitem001wbs[i].cptcode) {
                this.supplierQuotationFormArray.controls[i].controls['cptcode'].setValue(childPartItems.cpartno);
                break;
              }
            }
          } else {
            this.supplierQuotationFormArray.controls[i].controls['cptcode'].setValue(null);
          }
        }, 100);

        setTimeout(() => {
          if (this.purchasereqslip001wb.purchasereqitem001wbs[i].prtcode) {
            for (let partItems of this.part001mbs) {
              if (partItems.slNo == this.purchasereqslip001wb.purchasereqitem001wbs[i].prtcode) {
                this.supplierQuotationFormArray.controls[i].controls['prtcode'].setValue(partItems.partno);
                break;
              }
            }
          } else {
            this.supplierQuotationFormArray.controls[i].controls['prtcode'].setValue(null);
          }
        }, 100);

        // this.supplierQuotationFormArray.controls[i].controls['itemcode'].
        // setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].orderslno ? this.orderitem001mbs.
        //   find(x => x.slNo == this.purchasereqslip001wb.purchasereqitem001wbs[i].orderslno)?.itemcode : null);


        this.supplierQuotationFormArray.controls[i].controls['itemname'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].itemname);
        this.supplierQuotationFormArray.controls[i].controls['descrip'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].descrip);
        this.supplierQuotationFormArray.controls[i].controls['uom'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].uom);
        this.supplierQuotationFormArray.controls[i].controls['unitrate'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].unitrate);
        this.supplierQuotationFormArray.controls[i].controls['qunty'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].qunty);
        this.supplierQuotationFormArray.controls[i].controls['totalamount'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].totalamount);
        this.supplierQuotationFormArray.controls[i].controls['hsn'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].hsn);

        // this.consumbleManager.allconsumble(this.user.unitslno).subscribe(response => {
        //   this.consumble001mbs = deserialize<Consumble001mb[]>(Consumble001mb, response);
        //   this.supplierQuotationFormArray.controls[i].controls['cucode'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cucode ? this.consumble001mbs.find(x => x.slNo == this.purchasereqslip001wb.purchasereqitem001wbs[i].cucode)?.consmno : null);
        // });

        // this.supplierQuotationFormArray.controls[i].controls['cucode'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cucode ? this.consumble001mbs.find(x => x.slNo === this.purchasereqslip001wb.purchasereqitem001wbs[i].cucode)?.consmno : null);

        this.supplierQuotationFormArray.controls[i].controls['cuname'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cuname);
        this.supplierQuotationFormArray.controls[i].controls['cudescrip'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cudescrip);
        this.supplierQuotationFormArray.controls[i].controls['cuom'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cuom);
        this.supplierQuotationFormArray.controls[i].controls['cunitrate'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cunitrate);
        this.supplierQuotationFormArray.controls[i].controls['cuqunty'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cuqunty);
        this.supplierQuotationFormArray.controls[i].controls['cutotalamount'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cutotalamount);
        this.supplierQuotationFormArray.controls[i].controls['chsn'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].chsn);

        // this.supplierQuotationFormArray.controls[i].controls['cptcode'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cptcode ? this.childPart001mbs.find(x => x.slNo == this.purchasereqslip001wb.purchasereqitem001wbs[i].cptcode)?.cpartno : null);

        this.supplierQuotationFormArray.controls[i].controls['cptname'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cptname);
        this.supplierQuotationFormArray.controls[i].controls['cptdescrip'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cptdescrip);
        this.supplierQuotationFormArray.controls[i].controls['cptuom'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cptuom);
        this.supplierQuotationFormArray.controls[i].controls['cptunitrate'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cptunitrate);
        this.supplierQuotationFormArray.controls[i].controls['cptqunty'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cptqunty);
        this.supplierQuotationFormArray.controls[i].controls['cpttotalamount'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cpttotalamount);
        this.supplierQuotationFormArray.controls[i].controls['cpthsn'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cpthsn);

        // this.supplierQuotationFormArray.controls[i].controls['prtcode'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prtcode ? this.part001mbs.find(x => x.slNo == this.purchasereqslip001wb.purchasereqitem001wbs[i].prtcode)?.partno : null);

        this.supplierQuotationFormArray.controls[i].controls['prtmname'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prtmname);
        this.supplierQuotationFormArray.controls[i].controls['prtdescrip'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prtdescrip);
        this.supplierQuotationFormArray.controls[i].controls['prtuom'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prtuom);
        this.supplierQuotationFormArray.controls[i].controls['prtunitrate'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prtunitrate);
        this.supplierQuotationFormArray.controls[i].controls['prtqunty'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prtqunty);
        this.supplierQuotationFormArray.controls[i].controls['prttotalamount'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prttotalamount);
        this.supplierQuotationFormArray.controls[i].controls['prthsn'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prthsn);

      }


      // for (let z = 0; z < this.supplierItems.length; z++) {
      //   this.supplierQuotationFormArray = this.f['supplierQuotationFormArray'] as FormArray;
      //   if (z > (this.supplierItems.length)-1) {
      //     this.supplierQuotationFormArray.push(this.createItem());
          
      //   }
      //   this.suplieitemSlno = this.supplierItems[z].suplierslno;
        
      //   this.supplierQuotationFormArray.controls[z].controls['unitrate'].setValue(this.supplierItems[z].unitrate);
      //   this.supplierQuotationFormArray.controls[z].controls['qunty'].setValue(this.supplierItems[z].qunty);
  
      //   this.supplierQuotationFormArray.controls[z].controls['cunitrate'].setValue(this.supplierItems[z].cunitrate);
      //   this.supplierQuotationFormArray.controls[z].controls['cuqunty'].setValue(this.supplierItems[z].cuqunty);
  
      //   this.supplierQuotationFormArray.controls[z].controls['cptunitrate'].setValue(this.supplierItems[z].cptunitrate);
      //   this.supplierQuotationFormArray.controls[z].controls['cptqunty'].setValue(this.supplierItems[z].cptqunty);
  
      //   this.supplierQuotationFormArray.controls[z].controls['prtunitrate'].setValue(this.supplierItems[z].prtunitrate);
      //   this.supplierQuotationFormArray.controls[z].controls['prtqunty'].setValue(this.supplierItems[z].prtqunty);
      
      // }

    });

  }

  get f() {
    return this.supplierQuotationForm.controls;
  }

  createItem() {
    return this.formBuilder.group({
      suplierslno: ['', Validators.required],
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
    });
  }

  addItem() {
    // this.supplierQuotationFormArray = this.f['supplierQuotationFormArray'] as FormArray;
    // this.supplierQuotationFormArray.push(this.createItem());
  }

  removeItem(idx: number): void {
    (this.f['supplierQuotationFormArray'] as FormArray).removeAt(idx);
  }

  onOkClick(event: any, supplierQuotationForm: any) {
    let TAmount = 0;
    let consumableTAmount = 0;
    let childparTAmount = 0;
    let partTAmount = 0;


    let supplierquotationitems001wbs: Supplierquotationitems001wb[] = [];
    for (let i = 0; i < this.supplierQuotationForm.controls.supplierQuotationFormArray.controls.length; i++) {

      let supplierquotationitems001wb = new Supplierquotationitems001wb();
      supplierquotationitems001wb.suplierslno = this.suplieitemSlno ? this.suplieitemSlno : null;
      supplierquotationitems001wb.suplierslno2 = this.f.supplierQuotationFormArray.value[i].suplierslno2 ? this.f.supplierQuotationFormArray.value[i].suplierslno2 : null;
      supplierquotationitems001wb.itemcode = this.f.supplierQuotationFormArray.value[i].itemcode ? this.orderitem001mbs.find(x => x.itemcode === this.f.supplierQuotationFormArray.value[i].itemcode)?.slNo : null;
      supplierquotationitems001wb.itemname = this.f.supplierQuotationFormArray.value[i].itemname ? this.f.supplierQuotationFormArray.value[i].itemname : "";
      supplierquotationitems001wb.qunty = this.f.supplierQuotationFormArray.value[i].qunty ? this.f.supplierQuotationFormArray.value[i].qunty : "";
      supplierquotationitems001wb.totalamount = this.f.supplierQuotationFormArray.value[i].totalamount ? this.f.supplierQuotationFormArray.value[i].totalamount : null;
      TAmount += supplierquotationitems001wb.totalamount
      supplierquotationitems001wb.unitrate = this.f.supplierQuotationFormArray.value[i].unitrate ? this.f.supplierQuotationFormArray.value[i].unitrate : "";
      supplierquotationitems001wb.descrip = this.f.supplierQuotationFormArray.value[i].descrip ? this.f.supplierQuotationFormArray.value[i].descrip : "";
      supplierquotationitems001wb.uom = this.f.supplierQuotationFormArray.value[i].uom ? this.f.supplierQuotationFormArray.value[i].uom : "";
      supplierquotationitems001wb.hsn = this.f.supplierQuotationFormArray.value[i].hsn ? this.f.supplierQuotationFormArray.value[i].hsn : "";

      supplierquotationitems001wb.cucode = this.f.supplierQuotationFormArray.value[i].cucode ? this.consumble001mbs.find(x => x.consmno === this.f.supplierQuotationFormArray.value[i].cucode)?.slNo : null;
      supplierquotationitems001wb.cuname = this.f.supplierQuotationFormArray.value[i].cuname ? this.f.supplierQuotationFormArray.value[i].cuname : "";
      supplierquotationitems001wb.cuqunty = this.f.supplierQuotationFormArray.value[i].cuqunty ? this.f.supplierQuotationFormArray.value[i].cuqunty : "";
      supplierquotationitems001wb.cutotalamount = this.f.supplierQuotationFormArray.value[i].cutotalamount ? this.f.supplierQuotationFormArray.value[i].cutotalamount : null;
      consumableTAmount += supplierquotationitems001wb.cutotalamount
      supplierquotationitems001wb.cunitrate = this.f.supplierQuotationFormArray.value[i].cunitrate ? this.f.supplierQuotationFormArray.value[i].cunitrate : "";
      supplierquotationitems001wb.cudescrip = this.f.supplierQuotationFormArray.value[i].cudescrip ? this.f.supplierQuotationFormArray.value[i].cudescrip : "";
      supplierquotationitems001wb.cuom = this.f.supplierQuotationFormArray.value[i].cuom ? this.f.supplierQuotationFormArray.value[i].cuom : "";
      supplierquotationitems001wb.chsn = this.f.supplierQuotationFormArray.value[i].chsn ? this.f.supplierQuotationFormArray.value[i].chsn : "";

      supplierquotationitems001wb.cptcode = this.f.supplierQuotationFormArray.value[i].cptcode ? this.childPart001mbs.find(x => x.cpartno === this.f.supplierQuotationFormArray.value[i].cptcode)?.slNo : null;
      supplierquotationitems001wb.cptname = this.f.supplierQuotationFormArray.value[i].cptname ? this.f.supplierQuotationFormArray.value[i].cptname : "";
      supplierquotationitems001wb.cptunitrate = this.f.supplierQuotationFormArray.value[i].cptunitrate ? this.f.supplierQuotationFormArray.value[i].cptunitrate : "";
      supplierquotationitems001wb.cptqunty = this.f.supplierQuotationFormArray.value[i].cptqunty ? this.f.supplierQuotationFormArray.value[i].cptqunty : "";
      supplierquotationitems001wb.cpttotalamount = this.f.supplierQuotationFormArray.value[i].cpttotalamount ? this.f.supplierQuotationFormArray.value[i].cpttotalamount : null;
      childparTAmount += supplierquotationitems001wb.cpttotalamount
      supplierquotationitems001wb.cptdescrip = this.f.supplierQuotationFormArray.value[i].cptdescrip ? this.f.supplierQuotationFormArray.value[i].cptdescrip : "";
      supplierquotationitems001wb.cptuom = this.f.supplierQuotationFormArray.value[i].cptuom ? this.f.supplierQuotationFormArray.value[i].cptuom : "";
      supplierquotationitems001wb.cpthsn = this.f.supplierQuotationFormArray.value[i].cpthsn ? this.f.supplierQuotationFormArray.value[i].cpthsn : "";

      supplierquotationitems001wb.prtcode = this.f.supplierQuotationFormArray.value[i].prtcode ? this.part001mbs.find(x => x.partno === this.f.supplierQuotationFormArray.value[i].prtcode)?.slNo : null;
      supplierquotationitems001wb.prtmname = this.f.supplierQuotationFormArray.value[i].prtmname ? this.f.supplierQuotationFormArray.value[i].prtmname : "";
      supplierquotationitems001wb.prtqunty = this.f.supplierQuotationFormArray.value[i].prtqunty ? this.f.supplierQuotationFormArray.value[i].prtqunty : "";
      supplierquotationitems001wb.prttotalamount = this.f.supplierQuotationFormArray.value[i].prttotalamount ? this.f.supplierQuotationFormArray.value[i].prttotalamount : null;
      partTAmount += supplierquotationitems001wb.prttotalamount
      supplierquotationitems001wb.prtunitrate = this.f.supplierQuotationFormArray.value[i].prtunitrate ? this.f.supplierQuotationFormArray.value[i].prtunitrate : "";
      supplierquotationitems001wb.prtdescrip = this.f.supplierQuotationFormArray.value[i].prtdescrip ? this.f.supplierQuotationFormArray.value[i].prtdescrip : "";
      supplierquotationitems001wb.prtuom = this.f.supplierQuotationFormArray.value[i].prtuom ? this.f.supplierQuotationFormArray.value[i].prtuom : "";
      supplierquotationitems001wb.prthsn = this.f.supplierQuotationFormArray.value[i].prthsn ? this.f.supplierQuotationFormArray.value[i].prthsn : "";      
      supplierquotationitems001wbs.push(supplierquotationitems001wb);
      
      if (this.f.supplierQuotationFormArray.value[i].qunty ||
        this.f.supplierQuotationFormArray.value[i].cuqunty ||
        this.f.supplierQuotationFormArray.value[i].cptqunty ||
        this.f.supplierQuotationFormArray.value[i].prtqunty) {
        setTimeout(() => {

          this.activeModal.close({
            status: "Yes",
            supplierItems: supplierquotationitems001wbs,

            TAmount: TAmount,
            consumableTAmount: consumableTAmount,
            childparTAmount: childparTAmount,
            partTAmount: partTAmount,
          });
          console.log("partTAmount0",partTAmount);
        }, 100);
      } else {
        this.calloutService.showError("Please Select The Value!!");
      }


    }


  }

  onBlurEvent(event: any, index: any) {

    // if (this.f.supplierQuotationFormArray.value[index].qunty == "0") {
    //   this.calloutService.showWarning("Qty Value Should be Greater than 0");
    // }

    if (1 == Math.sign(this.f.supplierQuotationFormArray.value[index].qunty)) {
      if (this.f.supplierQuotationFormArray.value[index].qunty && this.f.supplierQuotationFormArray.value[index].unitrate) {
        let qunty: number = this.f.supplierQuotationFormArray.value[index].qunty ? this.f.supplierQuotationFormArray.value[index].qunty : 0;
        let unitrate: number = this.f.supplierQuotationFormArray.value[index].unitrate ? this.f.supplierQuotationFormArray.value[index].unitrate : 0;
        let totalAmount = qunty * unitrate;
        this.supplierQuotationFormArray.controls[index].controls['totalamount'].setValue(totalAmount);
        //  this.supplierQuotationFormArray.controls[index].controls['totalAmount'].setValue(totalAmount);

      }

    } else {
      this.calloutService.showWarning("Negative value Not Acceppted");
    }

  }

  onBlurEventcu(event: any, index: any) {
    if (1 == Math.sign(this.f.supplierQuotationFormArray.value[index].cuqunty)) {
      if (this.f.supplierQuotationFormArray.value[index].cuqunty && this.f.supplierQuotationFormArray.value[index].cunitrate) {
        let cuqunty: number = this.f.supplierQuotationFormArray.value[index].cuqunty ? this.f.supplierQuotationFormArray.value[index].cuqunty : 0;
        let cunitrate: number = this.f.supplierQuotationFormArray.value[index].cunitrate ? this.f.supplierQuotationFormArray.value[index].cunitrate : 0;
        let totalAmount = cuqunty * cunitrate;
        this.supplierQuotationFormArray.controls[index].controls['cutotalamount'].setValue(totalAmount);
        //  this.supplierQuotationFormArray.controls[index].controls['totalAmount'].setValue(totalAmount);

      }

    } else {
      this.calloutService.showWarning("Negative value Not Acceppted");
    }

  }
  onBlurEventcpt(event: any, index: any) {
    if (1 == Math.sign(this.f.supplierQuotationFormArray.value[index].cptqunty)) {
      if (this.f.supplierQuotationFormArray.value[index].cptqunty && this.f.supplierQuotationFormArray.value[index].cptunitrate) {
        let cptqunty: number = this.f.supplierQuotationFormArray.value[index].cptqunty ? this.f.supplierQuotationFormArray.value[index].cptqunty : 0;
        let cptunitrate: number = this.f.supplierQuotationFormArray.value[index].cptunitrate ? this.f.supplierQuotationFormArray.value[index].cptunitrate : 0;
        let totalAmount = cptqunty * cptunitrate;
        this.supplierQuotationFormArray.controls[index].controls['cpttotalamount'].setValue(totalAmount);
        //  this.supplierQuotationFormArray.controls[index].controls['totalAmount'].setValue(totalAmount);

      }

    } else {
      this.calloutService.showWarning("Negative value Not Acceppted");
    }

  }
  onBlurEventprt(event: any, index: any) {
    if (1 == Math.sign(this.f.supplierQuotationFormArray.value[index].prtqunty)) {
      if (this.f.supplierQuotationFormArray.value[index].prtqunty && this.f.supplierQuotationFormArray.value[index].prtunitrate) {
        let prtqunty: number = this.f.supplierQuotationFormArray.value[index].prtqunty ? this.f.supplierQuotationFormArray.value[index].prtqunty : 0;
        let prtunitrate: number = this.f.supplierQuotationFormArray.value[index].prtunitrate ? this.f.supplierQuotationFormArray.value[index].prtunitrate : 0;
        let totalAmount = prtqunty * prtunitrate;
        this.supplierQuotationFormArray.controls[index].controls['prttotalamount'].setValue(totalAmount);
        //  this.supplierQuotationFormArray.controls[index].controls['totalAmount'].setValue(totalAmount);

      }

    } else {
      this.calloutService.showWarning("Negative value Not Acceppted");
    }
  }

  onCancelClick() {
    this.activeModal.close('No');
  }
}