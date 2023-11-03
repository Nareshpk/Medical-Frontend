import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { PartManager } from '../services/restcontroller/bizservice/part.service';
import { PartItemManager } from '../services/restcontroller/bizservice/partiem.service';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { Part001mb } from '../services/restcontroller/entities/Part001mb';
import { Partitem001wb } from '../services/restcontroller/entities/Partitem001wb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-part-item',
  templateUrl: './part-item.component.html',
  styleUrls: ['./part-item.component.css']
})
export class PartItemComponent implements OnInit {

  @Input() partItem: any;
  partItemForm: FormGroup | any;
  partItemFormArry: FormArray | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  slNo?: number;
  
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
  partitemslno?: number;

  partitem001wbs: Partitem001wb[] = [];
  partitem001wb?: Partitem001wb;
  part001mbs: Part001mb[] = [];
  part001mb?: Part001mb;


  user?: Login001mb | any;
  unitslno?: number;
  purchaseItemSlno?: number;
  arrayslno: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private partItemmanager: PartItemManager,
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

    this.partItemForm = this.formBuilder.group({
      partItemFormArry: this.formBuilder.array([this.createItem()])
    });


    this.partItemmanager.allpartitem(this.user.unitslno).subscribe(response => {
      this.partitem001wbs = deserialize<Partitem001wb[]>(Partitem001wb, response);

    });

    this.partManager.allpart(this.user.unitslno).subscribe(response => {
      this.part001mbs = deserialize<Part001mb[]>(Part001mb, response);

    });

  }

  
  get f() {
    return this.partItemForm.controls;
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
    });
  }

  addItemprt() {
    this.partItemFormArry = this.f['partItemFormArry'] as FormArray;
    let status: boolean = false;
    for (let control of this.partItemFormArry.controls) {
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
    this.partItemFormArry = this.f['partItemFormArry'] as FormArray;
    this.partItemFormArry.push(this.createItem());
  }

  removeItemprt(idx: number): void {
    (this.f['partItemFormArry'] as FormArray).removeAt(idx);
  }

  onOkClick(event: any, partItemFormArry: any) {

    let partitem001wbs: Partitem001wb[] = [];
    let partTAmount = 0;

    for (let i = 0; i < this.partItemForm.controls.partItemFormArry.controls.length; i++) {

      let partitem001wb = new Partitem001wb();
      partitem001wb.partitemslno2 = this.f.partItemFormArry.value[i].partitemslno2 ? this.f.partItemFormArry.value[i].partitemslno2 : null;
      partitem001wb.prtcode = this.f.partItemFormArry.value[i].prtcode ? this.f.partItemFormArry.value[i].prtcode : null;
      partitem001wb.prtmname = this.f.partItemFormArry.value[i].prtmname ? this.f.partItemFormArry.value[i].prtmname : "";
      partitem001wb.prtqunty = this.f.partItemFormArry.value[i].prtqunty ? this.f.partItemFormArry.value[i].prtqunty : "";
      partitem001wb.prttotalamount = this.f.partItemFormArry.value[i].prttotalamount ? this.f.partItemFormArry.value[i].prttotalamount : null;
      partTAmount += partitem001wb.prttotalamount;
      partitem001wb.prtunitrate = this.f.partItemFormArry.value[i].prtunitrate ? this.f.partItemFormArry.value[i].prtunitrate : "";
      partitem001wb.prtdescrip = this.f.partItemFormArry.value[i].prtdescrip ? this.f.partItemFormArry.value[i].prtdescrip : "";
      partitem001wb.prtuom = this.f.partItemFormArry.value[i].prtuom ? this.f.partItemFormArry.value[i].prtuom : "";
      partitem001wb.prthsn = this.f.partItemFormArry.value[i].prthsn ? this.f.partItemFormArry.value[i].prthsn : "";
  
      partitem001wbs.push(partitem001wb);
     if(this.f.partItemFormArry.value[i].prtqunty) {
      this.activeModal.close({
        status: "Yes",
        partItem: partitem001wbs,
  
      
      });
      console.log("partItem==>", partitem001wbs);
      
  
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
      this.partItemFormArry = this.f['partItemFormArry'] as FormArray;
      this.partItemFormArry.controls[index].controls['prtmname'].setValue(this.part001mb.partname);
      this.partItemFormArry.controls[index].controls['prtdescrip'].setValue(this.part001mb.descrip);
      this.partItemFormArry.controls[index].controls['prtuom'].setValue(this.part001mb.uom);
      this.partItemFormArry.controls[index].controls['prtunitrate'].setValue(this.part001mb.unitamount);
      this.partItemFormArry.controls[index].controls['prthsn'].setValue(this.part001mb.hsn);
      this.partItemFormArry.controls[index].controls['prtqunty'].setValue("");
      this.partItemFormArry.controls[index].controls['prttotalamount'].setValue("");

    });
  }

  onChangepartQty(event: any, index: any) {
    if (1 == Math.sign(event.target.value)) {
      this.partItemFormArry = this.f['partItemFormArry'] as FormArray;
      let totalamount = event.target.value * this.part001mb?.unitamount;
      this.partItemFormArry.controls[index].controls['prttotalamount'].setValue(totalamount);

    } else {
      this.calloutService.showWarning("Negative value Not Acceppted");
    }

  }

  onCancelClick() {
    this.activeModal.close('No');
  }




}
