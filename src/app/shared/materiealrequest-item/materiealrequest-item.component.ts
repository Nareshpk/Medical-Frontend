import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { ChildPartManager } from '../services/restcontroller/bizservice/ChildPart.service';
import { ConsumbleManager } from '../services/restcontroller/bizservice/consumble.service';
import { MaterialInwardManager } from '../services/restcontroller/bizservice/Materialinward.service';
import { MateriealrequestiteManager } from '../services/restcontroller/bizservice/Materiealrequestitem.service';
import { OrderItemSettingManager } from '../services/restcontroller/bizservice/orderItems.service';
import { PartManager } from '../services/restcontroller/bizservice/part.service';
import { RawmaterialinspectionManager } from '../services/restcontroller/bizservice/Rawmaterialinspection.service';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { Materiealrequestitem001wb } from '../services/restcontroller/entities/Materiealrequestitem001wb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-materiealrequest-item',
  templateUrl: './materiealrequest-item.component.html',
  styleUrls: ['./materiealrequest-item.component.css']
})
export class MateriealrequestItemComponent implements OnInit {

  MaterialForm: FormGroup | any;
  frameworkComponents: any;
  @Input() RawMaterialcode: any;
  @Input() RawMaterialReject: any;
  @Input() consumablecode: any;
  @Input() Partscode: any;
  @Input() ChildParcode: any;
  @Input() Returnitems: any;
  submitted = false;
  slNo?: number;
  unitslno: number | any;
  materialSlno: number | any;
  itemcode: number | any;
  itemname: string | any;
  qunty: string | any;
  descrip: string | any;
  cudescrip: string | any;
  cptdescrip: string | any;
  prtdescrip: string | any;
  cucode: number | any;
  cuname: string | any;
  cuqunty: string | any;
  cptcode: number | any;
  cptname: string = "";
  cptqunty: string | any;
  prtcode: number | any;
  prtname: string = "";
  prtqunty: string | any;
  user?: Login001mb | any;
  insertUser?: string;
  insertDatetime?: Date;
  updatedUser?: string | null;
  updatedDatetime?: Date | null;
  materiealrequestitem001wbs: Materiealrequestitem001wb[] = [];
  materiealrequestitem001wb?: Materiealrequestitem001wb;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private router: Router,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private orderItemSettingManager: OrderItemSettingManager,
    private childPartManager: ChildPartManager,
    private consumbleManager: ConsumbleManager,
    private partManager: PartManager,
    private rawmaterialinspectionManager: RawmaterialinspectionManager,
    private materialInwardManager: MaterialInwardManager,
    private dataSharedService: DataSharedService,
    private materiealrequestiteManager: MateriealrequestiteManager,
    private modalService: NgbModal,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    if (this.Returnitems == 'Child Part') {
      this.MaterialForm = this.formBuilder.group({
        cptcode: [this.RawMaterialcode.cptcode ? this.RawMaterialcode.cptcode2.cpartno : null],
        cptname: [this.RawMaterialcode.cptname],
        cptdescrip: [this.RawMaterialcode.cptdescrip],
        cptqunty: ['', Validators.required],
      })
    }
    if (this.Returnitems == 'Raw Material') {
      this.MaterialForm = this.formBuilder.group({
        itemcode: [this.RawMaterialcode.itemcode ? this.RawMaterialcode.itemcode2.itemcode : null],
        itemname: [this.RawMaterialcode.itemname],
        descrip: [this.RawMaterialcode.descrip],
        qunty: ['', Validators.required],
      })
    }
    if (this.Returnitems == 'Consumable Item') {
      this.MaterialForm = this.formBuilder.group({
        cucode: [this.RawMaterialcode.cucode ? this.RawMaterialcode.cucode2.consmno : null],
        cuname: [this.RawMaterialcode.cuname],
        cudescrip: [this.RawMaterialcode.cudescrip],
        cuqunty: ['', Validators.required],
      })
    }
    if (this.Returnitems == 'Part') {
      this.MaterialForm = this.formBuilder.group({
        prtcode: [this.RawMaterialcode.prtcode ? this.RawMaterialcode.prtcode2.partno : null],
        prtname: [this.RawMaterialcode.prtname],
        prtdescrip: [this.RawMaterialcode.prtdescrip],
        prtqunty: ['', Validators.required],
      })
    }

    this.loadData();
  }

  loadData() {

  }


  get f() { return this.MaterialForm.controls }

  
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onOkClick(MaterialForm: any, params: any) {

    this.markFormGroupTouched(this.MaterialForm);
    this.submitted = true;
    if (this.MaterialForm.invalid) {
      return;
    }

    let materiealrequestitem001wb = new Materiealrequestitem001wb();
    if (this.Returnitems == 'Raw Material') {
    materiealrequestitem001wb.itemcode = this.f.itemcode.value ? this.f.itemcode.value : null;
    materiealrequestitem001wb.itemname = this.f.itemname.value ? this.f.itemname.value : "";
    materiealrequestitem001wb.descrip = this.f.descrip.value ? this.f.descrip.value : "";
    materiealrequestitem001wb.qunty = this.f.qunty.value ? this.f.qunty.value : null;
    }

    if (this.Returnitems == 'Consumable Item') {
    materiealrequestitem001wb.cucode = this.f.cucode.value ? this.f.cucode.value : null;
    materiealrequestitem001wb.cuname = this.f.cuname.value ? this.f.cuname.value : "";
    materiealrequestitem001wb.cudescrip = this.f.cudescrip.value ? this.f.cudescrip.value : "";
    materiealrequestitem001wb.cuqunty = this.f.cuqunty.value ? this.f.cuqunty.value : null;
    }
    if (this.Returnitems == 'Child Part') { 
    materiealrequestitem001wb.cptcode = this.f.cptcode.value ? this.f.cptcode.value : null;
    materiealrequestitem001wb.cptname = this.f.cptname.value ? this.f.cptname.value : "";
    materiealrequestitem001wb.cptdescrip = this.f.cptdescrip.value ? this.f.cptdescrip.value : "";
    materiealrequestitem001wb.cptqunty = this.f.cptqunty.value ? this.f.cptqunty.value : null;
    }
    if (this.Returnitems == 'Part') {
    materiealrequestitem001wb.prtcode = this.f.prtcode.value ? this.f.prtcode.value : null;
    materiealrequestitem001wb.prtname = this.f.prtname.value ? this.f.prtname.value : "";
    materiealrequestitem001wb.prtdescrip = this.f.prtdescrip.value ? this.f.prtdescrip.value : "";
    materiealrequestitem001wb.prtqunty = this.f.prtqunty.value ? this.f.prtqunty.value : null;
    
    }
    materiealrequestitem001wb.unitslno = this.user.unitslno;
    materiealrequestitem001wb.insertUser = this.authManager.getcurrentUser.username;
    materiealrequestitem001wb.insertDatetime = new Date();

    this.materiealrequestiteManager.materiealrequestsave(materiealrequestitem001wb).subscribe((response) => {
      this.calloutService.showSuccess("Material Request Saved Successfully");
      this.loadData();
      this.submitted = false;

    });

    this.activeModal.close({
      status: "Yes",
    });

  }
  onCancelClick() {

  }


}
