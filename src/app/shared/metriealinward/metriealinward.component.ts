import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { index } from 'd3';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { ChildPartManager } from '../services/restcontroller/bizservice/ChildPart.service';
import { ConsumbleManager } from '../services/restcontroller/bizservice/consumble.service';
import { MaterialreceiveditemManager } from '../services/restcontroller/bizservice/Materialreceiveditem.service';
import { OrderItemManager } from '../services/restcontroller/bizservice/orderitem-wb.service';
import { OrderItemSettingManager } from '../services/restcontroller/bizservice/orderItems.service';
import { PartManager } from '../services/restcontroller/bizservice/part.service';
import { PurchaseorderManager } from '../services/restcontroller/bizservice/Purchaseorder.service';
import { ChildPart001mb } from '../services/restcontroller/entities/ChildPart001mb';
import { Consumble001mb } from '../services/restcontroller/entities/Consumble001mb';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { Materialreceiveditem001wb } from '../services/restcontroller/entities/Materialreceiveditem001wb';
import { Orderitem001mb } from '../services/restcontroller/entities/Orderitem001mb';
import { Orderitem001wb } from '../services/restcontroller/entities/orderitem001wb';
import { Part001mb } from '../services/restcontroller/entities/Part001mb';
import { Purchaseorder001wb } from '../services/restcontroller/entities/Purchaseorder001wb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-metriealinward',
  templateUrl: './metriealinward.component.html',
  styleUrls: ['./metriealinward.component.css']
})
export class MetriealinwardComponent implements OnInit {
  @Input() poNumber: any;
  @Input() materialreceiveditem: any;
  @Input() suplier: any;
  materialForm: FormGroup | any;
  materialFormArray: FormArray | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  submitted = false;
  slNo: number | any;
  orderslno: number | any;
  itemcode: string = "";
  itemname: string = "";
  descrip: string = "";
  qunty: string = "";
  uom: string = "";
  unitrate: string = "";
  unitamount?: number | any;
  totalamount: number | any;
  advisedQty: number | any;
  receivedQty: number | any;
  acceptedQty: number | any;
  rejectedQty: number | any;
  outstanding: number | any;
  cudescrip: string = "";
  cptdescrip: string = "";
  prtdescrip: string = "";
  cureceivedQty?: number | any;
  cuacceptedQty?: number | any;
  curejectedQty?: number | any;
  cuoutstanding?: number | any;

  cptreceivedQty?: number | any;
  cptacceptedQty?: number | any;
  cptrejectedQty?: number | any;
  cptoutstanding?: number | any;

  prtreceivedQty?: number | any;
  prtacceptedQty?: number;
  prtrejectedQty?: number | any;
  prtoutstanding?: number | any;

  cucode?: number;
  cuname?: string;
  cuqunty?: string;
  cunitrate?: string;
  cutotalamount?: number;

  cptcode?: number | any;
  cptname?: string;
  cptqunty?: string;
  cptunitrate?: string;
  cpttotalamount?: number;

  prtcode?: number;
  prtmname?: string;
  prtqunty?: string;
  prtunitrate?: string;
  prttotalamount?: number;

  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  materialreceiveditem001wbs: Materialreceiveditem001wb[] = [];
  materialreceiveditem001wb?: Materialreceiveditem001wb;
  orderitem001wbs: Orderitem001wb[] = [];
  orderitem001wb?: Orderitem001wb;
  purchaseorder001wbs: Purchaseorder001wb[] = [];
  purchaseorder001wb: Purchaseorder001wb | any;
  orderitem001mbs: Orderitem001mb[] = [];
  orderitem001mb?: Orderitem001mb;
  consumble001mbs: Consumble001mb[] = [];
  consumble001mb?: Consumble001mb;
  childPart001mbs: ChildPart001mb[] = [];
  childPart001mb?: ChildPart001mb;
  part001mbs: Part001mb[] = [];
  part001mb?: Part001mb;
  purOrders: any = [];
  arrayslno: any = [];
  outstanding1?: number;
  user?: Login001mb | any;
  itemmaterialSlno?: number;
  unitslno?: number;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private orderItemManager: OrderItemManager,
    private purchaseorderManager: PurchaseorderManager,
    private materialreceiveditemManager: MaterialreceiveditemManager,
    private orderItemSettingManager: OrderItemSettingManager,
    private consumbleManager: ConsumbleManager,
    private childPartManager: ChildPartManager,
    private partManager: PartManager,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {

    this.user = this.authManager.getcurrentUser;

    this.materialForm = this.formBuilder.group({
      materialFormArray: this.formBuilder.array([this.createItem()])
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

    for (let z = 0; z < this.materialreceiveditem.length; z++) {
      this.materialFormArray = this.f['materialFormArray'] as FormArray;
      if (z < (this.materialreceiveditem.length)-1) {
        this.materialFormArray.push(this.createItem());
        
      }
      this.itemmaterialSlno = this.materialreceiveditem[z].materialSlno;
      
      this.materialFormArray.controls[z].controls['receivedQty'].setValue(this.materialreceiveditem[z].receivedQty);
      this.materialFormArray.controls[z].controls['acceptedQty'].setValue(this.materialreceiveditem[z].acceptedQty);
      this.materialFormArray.controls[z].controls['rejectedQty'].setValue(this.materialreceiveditem[z].rejectedQty);
      this.materialFormArray.controls[z].controls['outstanding'].setValue(this.materialreceiveditem[z].outstanding);
      this.materialFormArray.controls[z].controls['cureceivedQty'].setValue(this.materialreceiveditem[z].cureceivedQty);
      this.materialFormArray.controls[z].controls['cuacceptedQty'].setValue(this.materialreceiveditem[z].cuacceptedQty);
      this.materialFormArray.controls[z].controls['curejectedQty'].setValue(this.materialreceiveditem[z].curejectedQty);
      this.materialFormArray.controls[z].controls['cuoutstanding'].setValue(this.materialreceiveditem[z].cuoutstanding);
      this.materialFormArray.controls[z].controls['cptreceivedQty'].setValue(this.materialreceiveditem[z].cptreceivedQty);
      this.materialFormArray.controls[z].controls['cptacceptedQty'].setValue(this.materialreceiveditem[z].cptacceptedQty);
      this.materialFormArray.controls[z].controls['cptrejectedQty'].setValue(this.materialreceiveditem[z].cptrejectedQty);
      this.materialFormArray.controls[z].controls['cptoutstanding'].setValue(this.materialreceiveditem[z].cptoutstanding);
      this.materialFormArray.controls[z].controls['prtreceivedQty'].setValue(this.materialreceiveditem[z].prtreceivedQty);
      this.materialFormArray.controls[z].controls['prtacceptedQty'].setValue(this.materialreceiveditem[z].prtacceptedQty);
      this.materialFormArray.controls[z].controls['prtrejectedQty'].setValue(this.materialreceiveditem[z].prtrejectedQty);
      this.materialFormArray.controls[z].controls['prtoutstanding'].setValue(this.materialreceiveditem[z].prtoutstanding);
    }

    this.purchaseorderManager.findOne(this.poNumber).subscribe(response => {
      this.purchaseorder001wb = deserialize<Purchaseorder001wb[]>(Purchaseorder001wb, response);
      for (let i = 0; i < this.purchaseorder001wb.orderitem001wbs.length; i++) {
        this.materialFormArray = this.f['materialFormArray'] as FormArray;
        if (i < (this.purchaseorder001wb.orderitem001wbs.length) - 1) {
          this.materialFormArray.push(this.createItem());
        }

        setTimeout(() => {
          if (this.purchaseorder001wb.orderitem001wbs[i].itemcode) {
            for (let orderItems of this.orderitem001mbs) {
              if (orderItems.slNo == this.purchaseorder001wb.orderitem001wbs[i].itemcode) {
                this.materialFormArray.controls[i].controls['itemcode'].setValue(orderItems.itemcode);
                break;
              }
            }
          } else {
            this.materialFormArray.controls[i].controls['itemcode'].setValue(null);
          }
        }, 100);

        setTimeout(() => {
          if (this.purchaseorder001wb.orderitem001wbs[i].cucode) {
            for (let consumbleItems of this.consumble001mbs) {
              if (consumbleItems.slNo == this.purchaseorder001wb.orderitem001wbs[i].cucode) {
                this.materialFormArray.controls[i].controls['cucode'].setValue(consumbleItems.consmno);
                break;
              }
            }
          } else {
            this.materialFormArray.controls[i].controls['cucode'].setValue(null);
          }
        }, 100);

        setTimeout(() => {
          if (this.purchaseorder001wb.orderitem001wbs[i].cptcode) {
            for (let childPartItems of this.childPart001mbs) {
              if (childPartItems.slNo == this.purchaseorder001wb.orderitem001wbs[i].cptcode) {
                this.materialFormArray.controls[i].controls['cptcode'].setValue(childPartItems.cpartno);
                break;
              }
            }
          } else {
            this.materialFormArray.controls[i].controls['cptcode'].setValue(null);
          }
        }, 100);

        setTimeout(() => {
          if (this.purchaseorder001wb.orderitem001wbs[i].prtcode) {
            for (let partItems of this.part001mbs) {
              if (partItems.slNo == this.purchaseorder001wb.orderitem001wbs[i].prtcode) {
                this.materialFormArray.controls[i].controls['prtcode'].setValue(partItems.partno);
                break;
              }
            }
          } else {
            this.materialFormArray.controls[i].controls['prtcode'].setValue(null);
          }
        }, 100);

        this.purOrders.push(this.purchaseorder001wb.orderitem001wbs[i])
        // this.materialFormArray.controls[i].controls['itemcode'].setValue(this.purchaseorder001wb.orderitem001wbs[i].itemcode ? this.orderitem001mbs.find(x => x.slNo === this.purchaseorder001wb.orderitem001wbs[i].itemcode)?.itemcode : null);
        this.materialFormArray.controls[i].controls['itemname'].setValue(this.purchaseorder001wb.orderitem001wbs[i].itemname);
        this.materialFormArray.controls[i].controls['descrip'].setValue(this.purchaseorder001wb.orderitem001wbs[i].descrip);
        this.materialFormArray.controls[i].controls['unitrate'].setValue(this.purchaseorder001wb.orderitem001wbs[i].unitrate);
        this.materialFormArray.controls[i].controls['qunty'].setValue(this.purchaseorder001wb.orderitem001wbs[i].qunty);
        this.materialFormArray.controls[i].controls['totalamount'].setValue(this.purchaseorder001wb.orderitem001wbs[i].totalamount);

        // this.materialFormArray.controls[i].controls['cucode'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cucode ? this.consumble001mbs.find(x => x.slNo === this.purchaseorder001wb.orderitem001wbs[i].cucode)?.consmno : null);
        this.materialFormArray.controls[i].controls['cuname'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cuname);
        this.materialFormArray.controls[i].controls['cudescrip'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cudescrip);
        this.materialFormArray.controls[i].controls['cunitrate'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cunitrate);
        this.materialFormArray.controls[i].controls['cuqunty'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cuqunty);
        this.materialFormArray.controls[i].controls['cutotalamount'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cutotalamount);

        // this.materialFormArray.controls[i].controls['cptcode'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cptcode ? this.childPart001mbs.find(x => x.slNo === this.purchaseorder001wb.orderitem001wbs[i].cptcode)?.cpartno : null);
        this.materialFormArray.controls[i].controls['cptname'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cptname);
        this.materialFormArray.controls[i].controls['cptdescrip'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cptdescrip);
        this.materialFormArray.controls[i].controls['cptunitrate'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cptunitrate);
        this.materialFormArray.controls[i].controls['cptqunty'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cptqunty);
        this.materialFormArray.controls[i].controls['cpttotalamount'].setValue(this.purchaseorder001wb.orderitem001wbs[i].cpttotalamount);

        // this.materialFormArray.controls[i].controls['prtcode'].setValue(this.purchaseorder001wb.orderitem001wbs[i].prtcode ? this.part001mbs.find(x => x.slNo === this.purchaseorder001wb.orderitem001wbs[i].prtcode)?.partno : null);
        this.materialFormArray.controls[i].controls['prtmname'].setValue(this.purchaseorder001wb.orderitem001wbs[i].prtmname);
        this.materialFormArray.controls[i].controls['prtdescrip'].setValue(this.purchaseorder001wb.orderitem001wbs[i].prtdescrip);
        this.materialFormArray.controls[i].controls['prtunitrate'].setValue(this.purchaseorder001wb.orderitem001wbs[i].prtunitrate);
        this.materialFormArray.controls[i].controls['prtqunty'].setValue(this.purchaseorder001wb.orderitem001wbs[i].prtqunty);
        this.materialFormArray.controls[i].controls['prttotalamount'].setValue(this.purchaseorder001wb.orderitem001wbs[i].prttotalamount);
      }

    });


    this.orderItemManager.allorder(this.user.unitslno).subscribe(response => {
      this.orderitem001wbs = deserialize<Orderitem001wb[]>(Orderitem001wb, response);

    });
    this.loadData();

  }
  loadData() {
    this.materialreceiveditemManager.allreceiveditem(this.user.unitslno).subscribe(response => {
      this.materialreceiveditem001wbs = deserialize<Materialreceiveditem001wb[]>(Materialreceiveditem001wb, response);
      if (this.materialreceiveditem001wbs.length > 0) {
        this.gridOptions?.api?.setRowData(this.materialreceiveditem001wbs);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }
  get f() { return this.materialForm.controls; }
  get o() { return this.f.materialFormArray as FormArray; }
  createItem() {
    return this.formBuilder.group({
      materialSlno: ['', Validators.required],
      itemcode: ['', Validators.required],
      itemname: ['', Validators.required],
      descrip: ['', Validators.required],
      uom: ['', Validators.required],
      unitrate: ['', Validators.required],
      qunty: ['', Validators.required],
      totalamount: ['', Validators.required],
      receivedQty: ['', Validators.required],
      acceptedQty: ['', Validators.required],
      rejectedQty: [''],
      outstanding: [''],


      cucode: ['', Validators.required],
      cuname: ['', Validators.required],
      cuqunty: ['', Validators.required],
      cudescrip: ['', Validators.required],
      cunitrate: ['', Validators.required],
      cutotalamount: ['', Validators.required],

      cptcode: ['', Validators.required],
      cptname: ['', Validators.required],
      cptdescrip: ['', Validators.required],
      cptqunty: ['', Validators.required],
      cptunitrate: ['', Validators.required],
      cpttotalamount: ['', Validators.required],

      prtcode: ['', Validators.required],
      prtmname: ['', Validators.required],
      prtdescrip: ['', Validators.required],
      prtqunty: ['', Validators.required],
      prtunitrate: ['', Validators.required],
      prttotalamount: ['', Validators.required],

      cureceivedQty: ['', Validators.required],
      cuacceptedQty: ['', Validators.required],
      curejectedQty: ['', Validators.required],
      cuoutstanding: ['', Validators.required],

      cptreceivedQty: ['', Validators.required],
      cptacceptedQty: ['', Validators.required],
      cptrejectedQty: ['', Validators.required],
      cptoutstanding: ['', Validators.required],

      prtreceivedQty: ['', Validators.required],
      prtacceptedQty: ['', Validators.required],
      prtrejectedQty: ['', Validators.required],
      prtoutstanding: ['', Validators.required],
    });
  }

  // addItem() {
  //   this.materialFormArray = this.f['materialFormArray'] as FormArray;
  //   this.materialFormArray.push(this.createItem());

  // }

  removeItem(idx: number): void {
    (this.f['materialFormArray'] as FormArray).removeAt(idx);
  }


  onOkClick(event: any, materialForm: any) {

    let materialreceiveditem001wbs: Materialreceiveditem001wb[] = [];
    for (let i = 0; i < this.materialFormArray.controls.length; i++) {
      let materialreceiveditem001wb = new Materialreceiveditem001wb();
      materialreceiveditem001wb.materialSlno = this.itemmaterialSlno ? this.itemmaterialSlno : null;
      materialreceiveditem001wb.materialSlno2 = this.f.materialFormArray.value[i].materialSlno2 ? this.f.materialFormArray.value[i].materialSlno2 : null;
      materialreceiveditem001wb.itemcode = this.f.materialFormArray.value[i].itemcode ? this.orderitem001mbs.find(x => x.itemcode === this.f.materialFormArray.value[i].itemcode)?.slNo : null;
      materialreceiveditem001wb.itemname = this.f.materialFormArray.value[i].itemname ? this.f.materialFormArray.value[i].itemname : null;
      materialreceiveditem001wb.qunty = this.f.materialFormArray.value[i].qunty ? this.f.materialFormArray.value[i].qunty : null;
      materialreceiveditem001wb.totalamount = this.f.materialFormArray.value[i].totalamount ? this.f.materialFormArray.value[i].totalamount : null;
      materialreceiveditem001wb.unitrate = this.f.materialFormArray.value[i].unitrate ? this.f.materialFormArray.value[i].unitrate : null;
      materialreceiveditem001wb.receivedQty = this.f.materialFormArray.value[i].receivedQty ? this.f.materialFormArray.value[i].receivedQty : 0;
      materialreceiveditem001wb.acceptedQty = this.f.materialFormArray.value[i].acceptedQty ? this.f.materialFormArray.value[i].acceptedQty : 0;
      materialreceiveditem001wb.rejectedQty = this.f.materialFormArray.value[i].rejectedQty ? this.f.materialFormArray.value[i].rejectedQty : 0;
      materialreceiveditem001wb.outstanding = this.f.materialFormArray.value[i].outstanding ? this.f.materialFormArray.value[i].outstanding : 0;

      materialreceiveditem001wb.descrip = this.f.materialFormArray.value[i].descrip ? this.f.materialFormArray.value[i].descrip : null;
      materialreceiveditem001wb.cudescrip = this.f.materialFormArray.value[i].cudescrip ? this.f.materialFormArray.value[i].cudescrip : null;
      materialreceiveditem001wb.cptdescrip = this.f.materialFormArray.value[i].cptdescrip ? this.f.materialFormArray.value[i].cptdescrip : null;
      materialreceiveditem001wb.prtdescrip = this.f.materialFormArray.value[i].prtdescrip ? this.f.materialFormArray.value[i].prtdescrip : null;

      materialreceiveditem001wb.cucode = this.f.materialFormArray.value[i].cucode ? this.consumble001mbs.find(x => x.consmno === this.f.materialFormArray.value[i].cucode)?.slNo : null;
      materialreceiveditem001wb.cuname = this.f.materialFormArray.value[i].cuname ? this.f.materialFormArray.value[i].cuname : null;
      materialreceiveditem001wb.cuqunty = this.f.materialFormArray.value[i].cuqunty ? this.f.materialFormArray.value[i].cuqunty : null;
      materialreceiveditem001wb.cutotalamount = this.f.materialFormArray.value[i].cutotalamount ? this.f.materialFormArray.value[i].cutotalamount : null;
      materialreceiveditem001wb.cunitrate = this.f.materialFormArray.value[i].cunitrate ? this.f.materialFormArray.value[i].cunitrate : null;

      materialreceiveditem001wb.cptcode = this.f.materialFormArray.value[i].cptcode ? this.childPart001mbs.find(x => x.cpartno === this.f.materialFormArray.value[i].cptcode)?.slNo : null;
      materialreceiveditem001wb.cptname = this.f.materialFormArray.value[i].cptname ? this.f.materialFormArray.value[i].cptname : null;
      materialreceiveditem001wb.cptunitrate = this.f.materialFormArray.value[i].cptunitrate ? this.f.materialFormArray.value[i].cptunitrate : null;
      materialreceiveditem001wb.cptqunty = this.f.materialFormArray.value[i].cptqunty ? this.f.materialFormArray.value[i].cptqunty : null;
      materialreceiveditem001wb.cpttotalamount = this.f.materialFormArray.value[i].cpttotalamount ? this.f.materialFormArray.value[i].cpttotalamount : null;

      materialreceiveditem001wb.prtcode = this.f.materialFormArray.value[i].prtcode ? this.part001mbs.find(x => x.partno === this.f.materialFormArray.value[i].prtcode)?.slNo : null;
      materialreceiveditem001wb.prtmname = this.f.materialFormArray.value[i].prtmname ? this.f.materialFormArray.value[i].prtmname : null;
      materialreceiveditem001wb.prtqunty = this.f.materialFormArray.value[i].prtqunty ? this.f.materialFormArray.value[i].prtqunty : null;
      materialreceiveditem001wb.prttotalamount = this.f.materialFormArray.value[i].prttotalamount ? this.f.materialFormArray.value[i].prttotalamount : null;
      materialreceiveditem001wb.prtunitrate = this.f.materialFormArray.value[i].prtunitrate ? this.f.materialFormArray.value[i].prtunitrate : null;

      materialreceiveditem001wb.cureceivedQty = this.f.materialFormArray.value[i].cureceivedQty ? this.f.materialFormArray.value[i].cureceivedQty : 0;
      materialreceiveditem001wb.cuacceptedQty = this.f.materialFormArray.value[i].cuacceptedQty ? this.f.materialFormArray.value[i].cuacceptedQty : 0;
      materialreceiveditem001wb.curejectedQty = this.f.materialFormArray.value[i].curejectedQty ? this.f.materialFormArray.value[i].curejectedQty : 0;
      materialreceiveditem001wb.cuoutstanding = this.f.materialFormArray.value[i].cuoutstanding ? this.f.materialFormArray.value[i].cuoutstanding : 0;

      materialreceiveditem001wb.cptreceivedQty = this.f.materialFormArray.value[i].cptreceivedQty ? this.f.materialFormArray.value[i].cptreceivedQty : 0;
      materialreceiveditem001wb.cptacceptedQty = this.f.materialFormArray.value[i].cptacceptedQty ? this.f.materialFormArray.value[i].cptacceptedQty : 0;
      materialreceiveditem001wb.cptrejectedQty = this.f.materialFormArray.value[i].cptrejectedQty ? this.f.materialFormArray.value[i].cptrejectedQty : 0;
      materialreceiveditem001wb.cptoutstanding = this.f.materialFormArray.value[i].cptoutstanding ? this.f.materialFormArray.value[i].cptoutstanding : 0;

      materialreceiveditem001wb.prtreceivedQty = this.f.materialFormArray.value[i].prtreceivedQty ? this.f.materialFormArray.value[i].prtreceivedQty : 0;
      materialreceiveditem001wb.prtacceptedQty = this.f.materialFormArray.value[i].prtacceptedQty ? this.f.materialFormArray.value[i].prtacceptedQty : 0;
      materialreceiveditem001wb.prtrejectedQty = this.f.materialFormArray.value[i].prtrejectedQty ? this.f.materialFormArray.value[i].prtrejectedQty : 0;
      materialreceiveditem001wb.prtoutstanding = this.f.materialFormArray.value[i].prtoutstanding ? this.f.materialFormArray.value[i].prtoutstanding : 0;

      materialreceiveditem001wbs.push(materialreceiveditem001wb);
      if (this.f.materialFormArray.value[i].acceptedQty ||
        this.f.materialFormArray.value[i].cptacceptedQty ||
        this.f.materialFormArray.value[i].cuacceptedQty ||
        this.f.materialFormArray.value[i].prtacceptedQty) {
        this.activeModal.close({
          status: "Yes",
          materialreceiveditem: materialreceiveditem001wbs,
        });
      } else {
        this.calloutService.showError("Please Enter The Values!");
      }

    }
  }


  onChange(event: any, i: any) {


    for (let i = 0; i < this.materialFormArray.value.length; i++) {
      if (this.materialFormArray.value[i].qunty ? Number(this.materialFormArray.value[i].qunty) >= Number(this.materialFormArray.value[i].receivedQty) : false) {
        this.f.materialFormArray.controls[i].get('acceptedQty').enable();
      } else if (this.materialFormArray.value[i].cuqunty ? Number(this.materialFormArray.value[i].cuqunty) >= Number(this.materialFormArray.value[i].cureceivedQty) : false) {
        this.f.materialFormArray.controls[i].get('cuacceptedQty').enable();
      } else if (this.materialFormArray.value[i].cptqunty ? Number(this.materialFormArray.value[i].cptqunty) >= Number(this.materialFormArray.value[i].cptreceivedQty) : false) {
        this.f.materialFormArray.controls[i].get('cptacceptedQty').enable();
      } else if (this.materialFormArray.value[i].prtqunty ? Number(this.materialFormArray.value[i].prtqunty) >= Number(this.materialFormArray.value[i].prtreceivedQty) : false) {
        this.f.materialFormArray.controls[i].get('prtacceptedQty').enable();
      } else {
        this.calloutService.showWarning("Recived qty should be equal or less then total qty!");
        this.f.materialFormArray.controls[i].get('acceptedQty').disable();
        this.f.materialFormArray.controls[i].get('cuacceptedQty').disable();
        this.f.materialFormArray.controls[i].get('cptacceptedQty').disable();
        this.f.materialFormArray.controls[i].get('prtacceptedQty').disable();
      }

    }

  }

  onBlurEvent(event: any, index: any) {
    if (this.f.materialFormArray.value[index].acceptedQty && this.f.materialFormArray.value[index].acceptedQty != "" && this.f.materialFormArray.value[index].acceptedQty != 0) {
      let qunty: number = this.f.materialFormArray.value[index].qunty ? this.f.materialFormArray.value[index].qunty : 0;
      let receivedQty: number = this.f.materialFormArray.value[index].receivedQty ? this.f.materialFormArray.value[index].receivedQty : 0;
      let acceptedQty: number = this.f.materialFormArray.value[index].acceptedQty ? this.f.materialFormArray.value[index].acceptedQty : 0;
      let rejectedQty = receivedQty - acceptedQty;
      console.log("rejectedQty", rejectedQty);

      let outstanding = qunty - receivedQty;
      let outstanding1 = outstanding + rejectedQty
      // }
      if (Number(receivedQty) >= Number(acceptedQty)) {
        this.materialFormArray.controls[index].controls['rejectedQty'].setValue(rejectedQty);
        this.materialFormArray.controls[index].controls['outstanding'].setValue(outstanding1);
      } else {
        this.calloutService.showError("Accepted Qty  should be equal or less then total qty!");
      }
    } else {
      this.materialFormArray.controls[index].controls['rejectedQty'].setValue('');
      this.materialFormArray.controls[index].controls['outstanding'].setValue('');
      this.calloutService.showError("Please Enter The Accepted Qty!");
    }
  }

  onBlurEvent1(event: any, index: any) {
    if (this.f.materialFormArray.value[index].cuacceptedQty && this.f.materialFormArray.value[index].cuacceptedQty != "" && this.f.materialFormArray.value[index].cuacceptedQty != 0) {
      let cuqunty: number = this.f.materialFormArray.value[index].cuqunty ? this.f.materialFormArray.value[index].cuqunty : 0;
      let cureceivedQty: number = this.f.materialFormArray.value[index].cureceivedQty ? this.f.materialFormArray.value[index].cureceivedQty : 0;
      let cuacceptedQty: number = this.f.materialFormArray.value[index].cuacceptedQty ? this.f.materialFormArray.value[index].cuacceptedQty : 0;
      let curejectedQty = cureceivedQty - cuacceptedQty;

      let cuoutstanding = cuqunty - cureceivedQty;
      let outstanding1 = cuoutstanding + curejectedQty

      if (Number(cureceivedQty) >= Number(cuacceptedQty)) {
        this.materialFormArray.controls[index].controls['curejectedQty'].setValue(curejectedQty);
        this.materialFormArray.controls[index].controls['cuoutstanding'].setValue(outstanding1);
      } else {
        this.calloutService.showError("Accepted Qty should be equal or less then total qty!");
      }
    } else {
      this.materialFormArray.controls[index].controls['curejectedQty'].setValue('');
      this.materialFormArray.controls[index].controls['cuoutstanding'].setValue('');
      this.calloutService.showError("Please Enter The Accepted Qty!");
    }
  }

  onBlurEvent2(event: any, index: any) {
    if (this.f.materialFormArray.value[index].cptacceptedQty && this.f.materialFormArray.value[index].cptacceptedQty != "" && this.f.materialFormArray.value[index].cptacceptedQty != 0) {
      let cptqunty: number = this.f.materialFormArray.value[index].cptqunty ? this.f.materialFormArray.value[index].cptqunty : 0;
      let cptreceivedQty: number = this.f.materialFormArray.value[index].cptreceivedQty ? this.f.materialFormArray.value[index].cptreceivedQty : 0;
      let cptacceptedQty: number = this.f.materialFormArray.value[index].cptacceptedQty ? this.f.materialFormArray.value[index].cptacceptedQty : 0;
      let cptrejectedQty = cptreceivedQty - cptacceptedQty;

      let cptoutstanding = cptqunty - cptreceivedQty;
      let outstanding1 = cptoutstanding + cptrejectedQty
      if (Number(cptreceivedQty) >= Number(cptacceptedQty)) {
        this.materialFormArray.controls[index].controls['cptrejectedQty'].setValue(cptrejectedQty);
        this.materialFormArray.controls[index].controls['cptoutstanding'].setValue(outstanding1);
      } else {
        this.calloutService.showError("Accepted Qty should be equal or less then total qty!");
      }
    } else {
      this.materialFormArray.controls[index].controls['cptrejectedQty'].setValue('');
      this.materialFormArray.controls[index].controls['cptoutstanding'].setValue('');
      this.calloutService.showError("Please Enter The Accepted Qty!");
    }
  }

  onBlurEvent3(event: any, index: any) {
    if (this.f.materialFormArray.value[index].prtacceptedQty && this.f.materialFormArray.value[index].prtacceptedQty != "" && this.f.materialFormArray.value[index].prtacceptedQty != 0) {
      let prtqunty: number = this.f.materialFormArray.value[index].prtqunty ? this.f.materialFormArray.value[index].prtqunty : 0;
      let prtreceivedQty: number = this.f.materialFormArray.value[index].prtreceivedQty ? this.f.materialFormArray.value[index].prtreceivedQty : 0;
      let prtacceptedQty: number = this.f.materialFormArray.value[index].prtacceptedQty ? this.f.materialFormArray.value[index].prtacceptedQty : 0;
      let prtrejectedQty = prtreceivedQty - prtacceptedQty;
      let prtoutstanding = prtqunty - prtreceivedQty;
      let outstanding1 = prtoutstanding + prtrejectedQty

      if (Number(prtreceivedQty) >= Number(prtacceptedQty)) {
        this.materialFormArray.controls[index].controls['prtrejectedQty'].setValue(prtrejectedQty);
        this.materialFormArray.controls[index].controls['prtoutstanding'].setValue(outstanding1);
      } else {
        this.calloutService.showError("Accepted Qty should be equal or less then total qty!");
      }
    } else {
      this.materialFormArray.controls[index].controls['prtrejectedQty'].setValue('');
      this.materialFormArray.controls[index].controls['prtoutstanding'].setValue('');
      this.calloutService.showError("Please Enter The Accepted Qty!");
    }

  }

  onCancelClick() {
    this.activeModal.close('No');
  }

}




