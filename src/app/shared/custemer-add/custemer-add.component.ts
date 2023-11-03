import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { CustemerAddManager } from '../services/restcontroller/bizservice/Custemer-wb.service';
import { OrderItemManager } from '../services/restcontroller/bizservice/orderitem-wb.service';
import { PartManager } from '../services/restcontroller/bizservice/part.service';
import { SalesMasterManager } from '../services/restcontroller/bizservice/salesmaster.service';
import { Custemer001wb } from '../services/restcontroller/entities/Custemer001wb';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { Part001mb } from '../services/restcontroller/entities/Part001mb';
import { Salesitem001mb } from '../services/restcontroller/entities/Salesitemmb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-custemer-add',
  templateUrl: './custemer-add.component.html',
  styleUrls: ['./custemer-add.component.css']
})
export class CustemerAddComponent implements OnInit {

  @Input() custemeradds: any;
  @Input() partTAmount: any
  salesPartForm: FormGroup | any;
  salesPartFormArray: FormArray | any;
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
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  salesitem001mbs: Salesitem001mb[] = [];
  salesitem001mb?: Salesitem001mb;
  custemer001wbs: Custemer001wb[] = [];
  custemer001wb?: Custemer001wb;
  // orderItems: Orderitem001mb[] = [];
  arrayslno: any = [];
  user?:Login001mb | any;
  unitslno?:number;
  part001mbs: Part001mb[] = [];
  part001mb?: Part001mb;
  salespartItemSlno:number | any;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private salesMasterManager: SalesMasterManager,
    private custemerAddManager: CustemerAddManager,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal,
    private partManager: PartManager,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {

    this.user = this.authManager.getcurrentUser;
      this.salesPartForm = this.formBuilder.group({
        salesPartFormArray: this.formBuilder.array([this.createItem()])
      });

    this.salesMasterManager.allproduct(this.user.unitslno).subscribe(response => {
      
      this.salesitem001mbs = deserialize<Salesitem001mb[]>(Salesitem001mb, response);
    });

    this.partManager.allpart(this.user.unitslno).subscribe(response => {
      this.part001mbs = deserialize<Part001mb[]>(Part001mb, response);

    });

    this.loadData();

    for (let z = 0; z < this.custemeradds.length; z++) {
      this.salesPartFormArray = this.f['salesPartFormArray'] as FormArray;
      if (z < (this.custemeradds.length) - 1) {

        this.salesPartFormArray.push(this.createItem());
      }
      this.salespartItemSlno = this.custemeradds[z].salespartSlno;
      this.slNo = this.custemeradds[z].slNo;
      this.salesPartFormArray.controls[z].controls['prtcode'].setValue(this.custemeradds[z].prtcode);
      this.salesPartFormArray.controls[z].controls['prtmname'].setValue(this.custemeradds[z].prtmname);
      this.salesPartFormArray.controls[z].controls['prtdescrip'].setValue(this.custemeradds[z].prtdescrip);
      this.salesPartFormArray.controls[z].controls['prtuom'].setValue(this.custemeradds[z].prtuom);
      this.salesPartFormArray.controls[z].controls['prthsn'].setValue(this.custemeradds[z].prthsn);
      this.salesPartFormArray.controls[z].controls['prtunitrate'].setValue(this.custemeradds[z].prtunitrate);
      this.salesPartFormArray.controls[z].controls['prtqunty'].setValue(this.custemeradds[z].prtqunty);
      this.salesPartFormArray.controls[z].controls['prttotalamount'].setValue(this.custemeradds[z].prttotalamount);
    }

  }


  loadData() {
    this.custemerAddManager.allcustemer(this.user.unitslno).subscribe(response => {
      this.custemer001wbs = deserialize<Custemer001wb[]>(Custemer001wb, response);
    });
  }


  get f() { return this.salesPartForm.controls; }
  get o() { return this.f.salesPartFormArray as FormArray; }

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
     
    });
  }

  

  addItemprt() {
    this.salesPartFormArray = this.f['salesPartFormArray'] as FormArray;
    let status: boolean = false;
    for (let control of this.salesPartFormArray.controls) {
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
    this.salesPartFormArray = this.f['salesPartFormArray'] as FormArray;
    this.salesPartFormArray.push(this.createItem());
  }


  removeItemprt(idx: number): void {
    (this.f['salesPartFormArray'] as FormArray).removeAt(idx);
  }


  onOkClick(event: any, salesPartForm: any) {
    let partTAmount = 0;

    let custemer001wbs: Custemer001wb[] = [];

    for (let i = 0; i < this.salesPartForm.controls.salesPartFormArray.controls.length; i++) {
      let custemer001wb = new Custemer001wb();

      if (this.slNo) {
        custemer001wb.slNo = this.custemeradds[i].slNo;
        custemer001wb.salespartSlno = this.salespartItemSlno ? this.salespartItemSlno : null;
      }
      custemer001wb.salespartSlno2 = this.f.salesPartFormArray.value[i].salespartSlno2 ? this.f.salesPartFormArray.value[i].salespartSlno2 : null;
      custemer001wb.prtcode = this.f.salesPartFormArray.value[i].prtcode ? this.f.salesPartFormArray.value[i].prtcode : null;
      custemer001wb.prtmname = this.f.salesPartFormArray.value[i].prtmname ? this.f.salesPartFormArray.value[i].prtmname : "";
      custemer001wb.prtqunty = this.f.salesPartFormArray.value[i].prtqunty ? this.f.salesPartFormArray.value[i].prtqunty : "";
      custemer001wb.prttotalamount = this.f.salesPartFormArray.value[i].prttotalamount ? this.f.salesPartFormArray.value[i].prttotalamount : null;
      partTAmount += custemer001wb.prttotalamount;
      custemer001wb.prtunitrate = this.f.salesPartFormArray.value[i].prtunitrate ? this.f.salesPartFormArray.value[i].prtunitrate : "";
      custemer001wb.prtdescrip = this.f.salesPartFormArray.value[i].prtdescrip ? this.f.salesPartFormArray.value[i].prtdescrip : "";
      custemer001wb.prtuom = this.f.salesPartFormArray.value[i].prtuom ? this.f.salesPartFormArray.value[i].prtuom : "";
      custemer001wb.prthsn = this.f.salesPartFormArray.value[i].prthsn ? this.f.salesPartFormArray.value[i].prthsn : "";

      custemer001wbs.push(custemer001wb);
      if (this.f.salesPartFormArray.value[i].prtqunty) {
       
        
        setTimeout(() => {
          this.activeModal.close({
            status: "Yes",
            salesPartItem: custemer001wbs,
            partTAmount: partTAmount,
          });

        }, 100);
      } else {
        this.calloutService.showError("Please Select The Value!!");
      }
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
      this.salesPartFormArray = this.f['salesPartFormArray'] as FormArray;
      this.salesPartFormArray.controls[index].controls['prtmname'].setValue(this.part001mb.partname);
      this.salesPartFormArray.controls[index].controls['prtdescrip'].setValue(this.part001mb.descrip);
      this.salesPartFormArray.controls[index].controls['prtuom'].setValue(this.part001mb.uom);
      this.salesPartFormArray.controls[index].controls['prtunitrate'].setValue(this.part001mb.unitamount);
      this.salesPartFormArray.controls[index].controls['prthsn'].setValue(this.part001mb.hsn);
      this.salesPartFormArray.controls[index].controls['prtqunty'].setValue("");
      this.salesPartFormArray.controls[index].controls['prttotalamount'].setValue("");

    });
  }

  onChangepartQty(event: any, index: any) {
    if (1 == Math.sign(event.target.value)) {
      this.salesPartFormArray = this.f['salesPartFormArray'] as FormArray;

      if (this.part001mb?.unitamount == undefined) {
        let totalamount = event.target.value * this.custemeradds[index].prtunitrate;
        this.salesPartFormArray.controls[index].controls['prttotalamount'].setValue(totalamount);
      }

      else {
        let totalamount = event.target.value * this.part001mb?.unitamount;
        this.salesPartFormArray.controls[index].controls['prttotalamount'].setValue(totalamount);
      }


    } else {
      this.calloutService.showWarning("Negative value Not Acceppted");
    }

  }
  onCancelClick() {
    this.activeModal.close('No');
  }

  onReset() {
    this.submitted = false;
    this.salesPartForm.reset();
  }

}




