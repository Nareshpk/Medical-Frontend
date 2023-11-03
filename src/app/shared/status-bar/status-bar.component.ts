import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { data } from 'jquery';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { MaterialInwardManager } from '../services/restcontroller/bizservice/Materialinward.service';
import { PurchaseorderManager } from '../services/restcontroller/bizservice/Purchaseorder.service';
import { PurchasereqslipManager } from '../services/restcontroller/bizservice/Purchasereqslip.service';
import { StatusSettingManager } from '../services/restcontroller/bizservice/status-setting.service';
import { SupplierQuotationManager } from '../services/restcontroller/bizservice/supplierquotation.service';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { Materialinward001wb } from '../services/restcontroller/entities/Materialinward001wb';
import { Purchaseorder001wb } from '../services/restcontroller/entities/Purchaseorder001wb';
import { Purchasereqslip001wb } from '../services/restcontroller/entities/Purchasereqslip001wb';
import { Status001mb } from '../services/restcontroller/entities/status001mb';
import { Supplierquotation001wb } from '../services/restcontroller/entities/supplierquotation001wb ';
import { Supplierregistration001mb } from '../services/restcontroller/entities/supplierRegistration001mb';
import { CalloutService } from '../services/services/callout.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {


  frameworkComponents: any;
  StatusForm: FormGroup | any;
  submitted = false;
  status: string = "";
  remarks: string | any;
  public gridOptions: GridOptions | any;
  @Input() title: string = '';
  @Input() details: any;
  @Input() flag: string = '';

  status001mbs: Status001mb[] = [];
  purchasereqslip: Purchasereqslip001wb[] = [];
  purchaseorder: Purchaseorder001wb[] = [];
  supplierregs: Supplierregistration001mb[] = [];
  materialinward001wbs: Materialinward001wb[] = [];
  hexToRgb: any;
  rgbToHex: any;
  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;
  user?:Login001mb|any;


  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private statusSettingManager: StatusSettingManager,
    private purchaseorderManager: PurchaseorderManager,
    private supplierQuotationManager: SupplierQuotationManager,
    private authManager: AuthManager,
    private purchaseregslipManager: PurchasereqslipManager,
    private materialInwardManager: MaterialInwardManager,) { }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.statusSettingManager.findAllByApporuvedId().subscribe(response => {      
      this.status001mbs = deserialize<Status001mb[]>(Status001mb, response);

    });

    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);
      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);
      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);
      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);
      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });

    this.title = this.title + 'LogOut';
    this.StatusForm = this.formBuilder.group({
      status: ['', Validators.required],
      // remarks: ['', Validators.required],
    })
  }

  get f() { return this.StatusForm.controls; }

  onOkClick(status: any, remarks: any) {
    console.log("flag", this.flag);
    let approvel: any;
    let pchaseslno: any;
    pchaseslno = this.details.slNo;
    for (let i = 0; i < this.status001mbs.length; i++) {
      if (this.status001mbs[i].slNo == status) {
        approvel = this.status001mbs[i].name;
      }
    }
    if (this.flag == "PRS") {
      this.purchaseregslipManager.updatereqslip(approvel, pchaseslno, remarks).subscribe(response => {
        this.purchasereqslip = deserialize<Purchasereqslip001wb[]>(Purchasereqslip001wb, response);
      });
    }
    else if (this.flag == "PO") {
      this.purchaseorderManager.UpdatePO(approvel, pchaseslno, remarks).subscribe((response) => {
        this.purchaseorder = deserialize<Purchaseorder001wb[]>(Purchaseorder001wb, response);

      });
    }
    else if (this.flag == "SQ") {
      this.supplierQuotationManager .UpdateSupplierQuotation(approvel, pchaseslno, remarks).subscribe((response) => {
        this.supplierregs = deserialize<Supplierquotation001wb[]>( Supplierquotation001wb,   response);

      });
    }
    else if (this.flag == "material") {
      this.materialInwardManager .UpdateMaterialinward(approvel, pchaseslno, remarks).subscribe((response) => {
        this.materialinward001wbs = deserialize<Materialinward001wb[]>(Materialinward001wb,   response);

      });
    }
    if(this.remarks){
      this.activeModal.close('Yes');
    }else{
      this.calloutService.showWarning("Select Status & Enter Remarks Before Submit");
    }
   
  }

  onCancelClick() {
    this.activeModal.close('No');
  }


}
