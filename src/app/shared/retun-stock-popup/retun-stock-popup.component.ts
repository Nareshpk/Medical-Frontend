import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { forkJoin } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { ChildPartManager } from '../services/restcontroller/bizservice/ChildPart.service';
import { ConsumbleManager } from '../services/restcontroller/bizservice/consumble.service';
import { OrderItemSettingManager } from '../services/restcontroller/bizservice/orderItems.service';
import { PartManager } from '../services/restcontroller/bizservice/part.service';
import { RawmaterialinspectionManager } from '../services/restcontroller/bizservice/Rawmaterialinspection.service';
import { ReturnStockManager } from '../services/restcontroller/bizservice/Returnstock.service';
import { ChildPart001mb } from '../services/restcontroller/entities/ChildPart001mb';
import { Consumble001mb } from '../services/restcontroller/entities/Consumble001mb';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { Orderitem001mb } from '../services/restcontroller/entities/Orderitem001mb';
import { Part001mb } from '../services/restcontroller/entities/Part001mb';
import { Rawmaterialinspection001wb } from '../services/restcontroller/entities/Rawmaterialinspection001wb';
import { Returnstock001wb } from '../services/restcontroller/entities/Returnstock001wb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-retun-stock-popup',
  templateUrl: './retun-stock-popup.component.html',
  styleUrls: ['./retun-stock-popup.component.css']
})
export class RetunStockPopupComponent implements OnInit {

  @Input() Retunstacks: any;

  @Input() RawMaterialcode: any;
  @Input() RawMaterialReject: any;
  @Input() consumablecode: any;
  @Input() Partscode: any;
  @Input() ChildParcode: any;
  @Input() Returnitems: any;
  ReturnForm: FormGroup | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  submitted = false;
  minDate = new Date();
  maxDate = new Date();
  user?: Login001mb | any;
  unitslno: number | any;
  slNo?: number | null;
  date?: Date | null;
  time?: number;
  paidamount?: number;
  dispatch?: string;
  vichleno?: string;
  personname?: string;
  mobilenumber?: number;
  status?: string;
  referenceid?: string;
  ordernumber?: number;
  rejectitems?: number;

  cudate?: Date;
  cutime?: number;
  cupaidamount?: number;
  cudispatch?: string;
  cuvichleno?: string;
  cupersonname?: string;
  cumobilenumber?: number;
  custatus?: string;
  cureferenceid?: string;
  cuordernumber?: number;
  curejectitems?: number;

  cptdate?: Date;
  cpttime?: number;
  cptpaidamount?: number;
  cptdispatch?: string;
  cptvichleno?: string;
  cptpersonname?: string;
  cptmobilenumber?: number;
  cptstatus?: string
  cptreferenceid?: string;
  childpartnumber?: number;
  cptrejectitems?: number;

  prtdate?: Date;
  prttime?: number;
  prtpaidamount?: number;
  prtdispatch?: string;
  prtvichleno?: string;
  prtpersonname?: string;
  prtmobilenumber?: number;
  prtstatus?: string;
  prtreferenceid?: string;
  partnumber?: number;
  prtrejectitems?: number;

  insertUser?: string;
  insertDatetime?: Date;
  updatedUser?: string | null;
  updatedDatetime?: Date | null;
  orderitem001mbs: Orderitem001mb[] = [];
  orderitem001mb?: Orderitem001mb;
  childPart001mbs: ChildPart001mb[] = [];
  childPart001mb?: ChildPart001mb;
  consumble001mbs: Consumble001mb[] = [];
  consumble001mb?: Consumble001mb;
  part001mbs: Part001mb[] = [];
  part001mb?: Part001mb;
  returnstock001wbs: Returnstock001wb[] = [];
  returnstock001wb?: Returnstock001wb;
  rawmaterialinspection001wbs: Rawmaterialinspection001wb[] = [];
  rawmaterialinspection001wb?: Rawmaterialinspection001wb | any;
  RawmeterialItemcodes: Rawmaterialinspection001wb[] = [];
  consumableItemcodes: Rawmaterialinspection001wb[] = [];
  ChildpartItemcodes: Rawmaterialinspection001wb[] = [];
  PartItemCodes: Rawmaterialinspection001wb[] = [];
  rawmetriealcodes: any = [];
  Consumablecodes: any = [];
  ChildPartcodes: any = [];
  Partcodes: any = [];
  rejectitem:any = [];


  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private returnStockManager: ReturnStockManager,
    private rawmaterialinspectionManager: RawmaterialinspectionManager,
    private orderItemSettingManager: OrderItemSettingManager,
    private childPartManager: ChildPartManager,
    private consumbleManager: ConsumbleManager,
    private partManager: PartManager,
    private modalService: NgbModal,
    private datepipe: DatePipe,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }


  ngOnInit(): void {
    console.log("Retunstacks", this.RawMaterialcode);
    this.user = this.authManager.getcurrentUser;

    this.maxDate.setDate(this.maxDate.getDate() + 90)

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



    this.loadData();
    // this.rawmaterialinspectionManager.findOne(this.RawMaterialcode).subscribe(response => {
    //   this.rawmaterialinspection001wb = deserialize<Rawmaterialinspection001wb>(Rawmaterialinspection001wb, response);
    //   this.ReturnForm.patchValue({
    //     'ordernumber':this.RawMaterialcode.itemcode2.itemcode,
    //     'rejectitems':this.RawMaterialcode.rejectedQty,
    //   })
    // });

    this.rawmaterialinspectionManager.findOne(this.RawMaterialcode).subscribe(response => {
      this.rawmaterialinspection001wb = deserialize<Rawmaterialinspection001wb>(Rawmaterialinspection001wb, response);
      this.ReturnForm.patchValue({
        'cuordernumber': this.RawMaterialcode.cucode2.consmno,
        'curejectitems': this.RawMaterialcode.curejectedQty,
      })
    });

    this.rawmaterialinspectionManager.findOne(this.RawMaterialcode).subscribe(response => {
      this.rawmaterialinspection001wb = deserialize<Rawmaterialinspection001wb>(Rawmaterialinspection001wb, response);
      this.ReturnForm.patchValue({
        'childpartnumber': this.RawMaterialcode.cptcode2.cpartno,
        'cptrejectitems': this.RawMaterialcode.cptrejectedQty,
      })
    });

    this.rawmaterialinspectionManager.findOne(this.RawMaterialcode).subscribe(response => {
      this.rawmaterialinspection001wb = deserialize<Rawmaterialinspection001wb>(Rawmaterialinspection001wb, response);
      this.ReturnForm.patchValue({
        'partnumber': this.RawMaterialcode.prtcode2.partno,
        'prtrejectitems': this.RawMaterialcode.prtrejectedQty,
      })
    });

    this.rawmaterialinspectionManager.allrawmaterial(this.user.unitslno).subscribe(response => {
      this.rawmaterialinspection001wbs = deserialize<Rawmaterialinspection001wb[]>(Rawmaterialinspection001wb, response);

      for (let i = 0; i < this.rawmaterialinspection001wbs.length; i++) {
        if (this.rawmaterialinspection001wbs[i].itemcode) {
          this.rawmetriealcodes.push(this.rawmaterialinspection001wbs[i])
        }
        if (this.rawmaterialinspection001wbs[i].cucode) {
          this.Consumablecodes.push(this.rawmaterialinspection001wbs[i])
        }
        if (this.rawmaterialinspection001wbs[i].cptcode) {
          this.ChildPartcodes.push(this.rawmaterialinspection001wbs[i])
        }
        if (this.rawmaterialinspection001wbs[i].prtcode) {
          this.Partcodes.push(this.rawmaterialinspection001wbs[i])
        }
        console.log("this.rawmaterialinspection001wbs", this.rawmetriealcodes);
      }

    });

    this.ReturnForm = this.formBuilder.group({
      date: [this.datepipe.transform(new Date(), 'dd-MM-yyyy')],
      time: ['',],
      paidamount: ['', Validators.required],
      dispatch: [''],
      vichleno: ['', Validators.required],
      personname: [''],
      mobilenumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      status: [''],
      referenceid: ['',],
      ordernumber: [''],
      rejectitems: [''],
      cudate: [this.datepipe.transform(new Date(), 'dd-MM-yyyy')],
      cutime: ['',],
      cupaidamount: ['', Validators.required],
      cudispatch: [''],
      cuvichleno: ['', Validators.required],
      cupersonname: [''],
      cumobilenumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      custatus: [''],
      cureferenceid: ['',],
      cuordernumber: [''],
      curejectitems: [''],
      cptdate: [this.datepipe.transform(new Date(), 'dd-MM-yyyy')],
      cpttime: ['',],
      cptpaidamount: ['', Validators.required],
      cptdispatch: [''],
      cptvichleno: ['', Validators.required],
      cptpersonname: [''],
      cptmobilenumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      cptstatus: [''],
      cptreferenceid: ['',],
      childpartnumber: ["",],
      cptrejectitems: [""],
      prtdate: [this.datepipe.transform(new Date(), 'dd-MM-yyyy')],
      prttime: ['',],
      prtpaidamount: ['', Validators.required],
      prtdispatch: [''],
      prtvichleno: ['', Validators.required],
      prtpersonname: [''],
      prtmobilenumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      prtstatus: [''],
      prtreferenceid: ['',],
      partnumber: ['',],
      prtrejectitems: ['',],

    })

    this.returnStockManager.allStock(this.user.unitslno).subscribe(response => {
      this.returnstock001wbs = deserialize<Returnstock001wb[]>(Returnstock001wb, response);
    });
  }


  onChange(event: any) {
    this.rawmaterialinspectionManager.findOne(event.target.value).subscribe(response => {
      this.rawmaterialinspection001wb = deserialize<Rawmaterialinspection001wb>(Rawmaterialinspection001wb, response);
      this.ReturnForm.patchValue({
        'rejectitems': this.rawmaterialinspection001wb.rejectedQty,
      })
    });
  }


  loadData() {
    this.returnStockManager.allStock(this.user.unitslno).subscribe(response => {
      this.returnstock001wbs = deserialize<Returnstock001wb[]>(Returnstock001wb, response);
      if (this.returnstock001wbs.length > 0) {
        this.gridOptions?.api?.setRowData(this.returnstock001wbs);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

  }
  get f() { return this.ReturnForm.controls; }

  onOkClick(event: any, ReturnForm: any) {
    let returnstock001wb = new Returnstock001wb();
    returnstock001wb.date = new Date(this.f.date.value);
    returnstock001wb.time = this.f.time.value ? this.f.time.value : null;
    returnstock001wb.paidamount = this.f.paidamount.value ? this.f.paidamount.value : null;
    returnstock001wb.dispatch = this.f.dispatch.value ? this.f.dispatch.value : "";
    returnstock001wb.vichleno = this.f.vichleno.value ? this.f.vichleno.value : "";
    returnstock001wb.personname = this.f.personname.value ? this.f.personname.value : "";
    returnstock001wb.mobilenumber = this.f.mobilenumber.value ? this.f.mobilenumber.value : null;
    returnstock001wb.status = this.f.status.value ? this.f.status.value : "";
    returnstock001wb.referenceid = this.f.referenceid.value ? this.f.referenceid.value : "";
    returnstock001wb.ordernumber = this.f.ordernumber.value ? this.orderitem001mbs.find(x => x.itemcode === this.RawMaterialcode.itemcode2.itemcode)?.slNo : null;
    returnstock001wb.rejectitems = this.f.rejectitems.value ? this.f.rejectitems.value : null;

    returnstock001wb.cudate = this.f.cudate.value ? this.f.cudate.value : "";
    returnstock001wb.cutime = this.f.cutime.value ? this.f.cutime.value : null;
    returnstock001wb.cupaidamount = this.f.cupaidamount.value ? this.f.cupaidamount.value : null;
    returnstock001wb.cudispatch = this.f.cudispatch.value ? this.f.cudispatch.value : "";
    returnstock001wb.cuvichleno = this.f.cuvichleno.value ? this.f.cuvichleno.value : "";
    returnstock001wb.cupersonname = this.f.cupersonname.value ? this.f.cupersonname.value : "";
    returnstock001wb.cumobilenumber = this.f.cumobilenumber.value ? this.f.cumobilenumber.value : null;
    returnstock001wb.custatus = this.f.custatus.value ? this.f.custatus.value : null;
    returnstock001wb.cureferenceid = this.f.cureferenceid.value ? this.f.cureferenceid.value : "";
    returnstock001wb.cuordernumber = this.f.cuordernumber.value ? this.consumble001mbs.find(x => x.consmno === this.RawMaterialcode.cucode2.consmno)?.slNo : null;
    returnstock001wb.curejectitems = this.f.curejectitems.value ? this.f.curejectitems.value : null;

    returnstock001wb.cptdate = new Date(this.f.date.value);
    returnstock001wb.cpttime = this.f.cpttime.value ? this.f.cpttime.value : null;
    returnstock001wb.cptpaidamount = this.f.cptpaidamount.value ? this.f.cptpaidamount.value : null;
    returnstock001wb.cptdispatch = this.f.cptdispatch.value ? this.f.cptdispatch.value : "";
    returnstock001wb.cptvichleno = this.f.cptvichleno.value ? this.f.cptvichleno.value : "";
    returnstock001wb.cptpersonname = this.f.cptpersonname.value ? this.f.cptpersonname.value : "";
    returnstock001wb.cptmobilenumber = this.f.cptmobilenumber.value ? this.f.cptmobilenumber.value : null;
    returnstock001wb.cptstatus = this.f.cptstatus.value ? this.f.cptstatus.value : "";
    returnstock001wb.cptreferenceid = this.f.cptreferenceid.value ? this.f.cptreferenceid.value : "";
    returnstock001wb.childpartnumber = this.f.childpartnumber.value ? this.childPart001mbs.find(x => x.cpartno === this.RawMaterialcode.cptcode2.cpartno)?.slNo : null;
    returnstock001wb.cptrejectitems = this.f.cptrejectitems.value ? this.f.cptrejectitems.value : null;


    returnstock001wb.prtdate = new Date(this.f.date.value);
    returnstock001wb.prttime = this.f.prttime.value ? this.f.prttime.value : null;
    returnstock001wb.prtpaidamount = this.f.prtpaidamount.value ? this.f.prtpaidamount.value : null;
    returnstock001wb.prtdispatch = this.f.prtdispatch.value ? this.f.prtdispatch.value : "";
    returnstock001wb.prtvichleno = this.f.prtvichleno.value ? this.f.prtvichleno.value : "";
    returnstock001wb.prtpersonname = this.f.prtpersonname.value ? this.f.prtpersonname.value : "";
    returnstock001wb.prtmobilenumber = this.f.prtmobilenumber.value ? this.f.prtmobilenumber.value : null;
    returnstock001wb.prtstatus = this.f.prtstatus.value ? this.f.prtstatus.value : "";
    returnstock001wb.prtreferenceid = this.f.prtreferenceid.value ? this.f.prtreferenceid.value : "";
    returnstock001wb.partnumber = this.f.partnumber.value ? this.part001mbs.find(x => x.partno === this.RawMaterialcode.prtcode2.partno)?.slNo : null
    returnstock001wb.prtrejectitems = this.f.prtrejectitems.value ? this.f.prtrejectitems.value : null;

    




    if (this.slNo) {
      returnstock001wb.slNo = this.slNo;
      returnstock001wb.unitslno = this.unitslno;
      returnstock001wb.insertUser = this.insertUser;
      returnstock001wb.insertDatetime = this.insertDatetime;
      returnstock001wb.updatedUser = this.authManager.getcurrentUser.username;
      returnstock001wb.updatedDatetime = new Date();
      console.log("returnstock001wb======1==========>>", returnstock001wb);

      this.returnStockManager.StockUpdate(returnstock001wb).subscribe((response) => {
        this.calloutService.showSuccess("Material Momentes Record Updated Successfully");
        this.ReturnForm.reset();
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      returnstock001wb.date = new Date();
      returnstock001wb.cudate = new Date();
      returnstock001wb.cptdate = new Date();
      returnstock001wb.prtdate = new Date();
      returnstock001wb.unitslno = this.user.unitslno;
      returnstock001wb.insertUser = this.authManager.getcurrentUser.username;
      returnstock001wb.insertDatetime = new Date();
      this.returnStockManager.Stocksave(returnstock001wb).subscribe((response) => {
        
          
          this.calloutService.showSuccess("Material Momentes Record Saved Successfully");
          this.ReturnForm.reset();
          this.loadData();
          this.submitted = false;
          this.activeModal.close("Yes");
        });
  
    }




  }
  onCancelClick() {

  }
}
