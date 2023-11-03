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
import { ObservationsitemsManager } from '../services/restcontroller/bizservice/Observationsitems.service';
import { OrderItemSettingManager } from '../services/restcontroller/bizservice/orderItems.service';
import { PartManager } from '../services/restcontroller/bizservice/part.service';
import { ChildPart001mb } from '../services/restcontroller/entities/ChildPart001mb';
import { Consumble001mb } from '../services/restcontroller/entities/Consumble001mb';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { Observationsitems001wb } from '../services/restcontroller/entities/Observationsitems001wb';
import { Orderitem001mb } from '../services/restcontroller/entities/Orderitem001mb';
import { Orderitemspecification001wb } from '../services/restcontroller/entities/Orderitemspecification001wb';
import { Part001mb } from '../services/restcontroller/entities/Part001mb';
import { Rawmaterialinspection001wb } from '../services/restcontroller/entities/Rawmaterialinspection001wb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-observation-items',
  templateUrl: './observation-items.component.html',
  styleUrls: ['./observation-items.component.css']
})
export class ObservationItemsComponent implements OnInit {
  @Input() observationitem: any;
  @Input() RawMaterialcode: any;
  @Input() Consumablecode: any;
  @Input() Childcode: any;
  @Input() Partcode: any;
  @Input() incoming: any;
  @Input() consumableincoming: any;
  @Input() observationitems: any;
  observationForm: FormGroup | any;
  observationFormArray: FormArray | any;
  rawMaterialFormArray: FormArray | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  slNo?: number | any;
  submitted = false;
  addpopup: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  unitslno: number | any;
  orderitem001mbs: Orderitem001mb[] = [];
  orderitem001mb?: Orderitem001mb | any;
  consumble001mbs: Consumble001mb[] = [];
  consumble001mb?: Consumble001mb;
  childPart001mbs: ChildPart001mb[] = [];
  childPart001mb?: ChildPart001mb;
  part001mbs: Part001mb[] = [];
  part001mb?: Part001mb;
  orderitemspecification001wbs: Orderitemspecification001wb[] = [];
  observationsitems001wbs: Observationsitems001wb[] = [];
  observationsitems001wb?: Observationsitems001wb;
  user?: Login001mb | any;
  orderitemcode: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private orderItemSettingManager: OrderItemSettingManager,
    private childPartManager: ChildPartManager,
    private consumbleManager: ConsumbleManager,
    private observationsitemsManager: ObservationsitemsManager,
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
    this.loadData();

    if (this.observationitem && this.observationitem.length > 0) {
      this.observationForm = this.formBuilder.group({
        observationFormArray: this.formBuilder.array([])
      });
      for (let observation of this.observationitem) {
        // this.observationFormArray = this.f['observationFormArray'] as FormArray;

        // this.observationFormArray.push(this.createItem(observation));

       
        // if (this.RawMaterialcode) {
        //   this.orderItemSettingManager.findOne(this.RawMaterialcode).subscribe(response => {
        //     this.orderitem001mb = deserialize<Orderitem001mb>(Orderitem001mb, response);
        //     for (let i = 0; i < this.orderitem001mb.orderitemspecification001wbs.length; i++) {
        //       this.observationFormArray = this.f['observationFormArray'] as FormArray;
        //       if (i < (this.orderitem001mb.orderitemspecification001wbs.length) - 1) {
        //         this.observationFormArray.push(this.createItem(observation));
        //       }

        //       this.observationFormArray.controls[i].controls['ordernumber'].setValue(this.orderitem001mb.itemcode);
        //       this.observationFormArray.controls[i].controls['orderparameter'].setValue(this.orderitem001mb.orderitemspecification001wbs[i].parameter);
        //       this.observationFormArray.controls[i].controls['orderspecification'].setValue(this.orderitem001mb.orderitemspecification001wbs[i].specification);
        //       this.observationFormArray.controls[i].controls['orderinspection'].setValue(this.orderitem001mb.orderitemspecification001wbs[i].inspecmethod);
        //     }


        //   });
        // }

        if (this.RawMaterialcode) {
          this.observationFormArray = this.f['observationFormArray'] as FormArray;
          this.observationFormArray.push(this.createItem(observation));
        };


        if (this.Consumablecode) {
          this.observationFormArray = this.f['observationFormArray'] as FormArray;
          this.observationFormArray.push(this.createItem(observation));
        };

        if (this.Childcode) {
          this.observationFormArray = this.f['observationFormArray'] as FormArray;
          this.observationFormArray.push(this.createItem(observation));
        };

        if (this.Partcode) {
          this.observationFormArray = this.f['observationFormArray'] as FormArray;
          this.observationFormArray.push(this.createItem(observation));
        };

      }

    } else {
      this.observationForm = this.formBuilder.group({
        observationFormArray: this.formBuilder.array([this.createItem(new Observationsitems001wb())])
      });
    }
    if (this.observationitem == undefined) {
      if (this.RawMaterialcode) {
        this.orderItemSettingManager.findOne(this.RawMaterialcode).subscribe(response => {
          this.orderitem001mb = deserialize<Orderitem001mb>(Orderitem001mb, response);
          for (let i = 0; i < this.orderitem001mb.orderitemspecification001wbs.length; i++) {
            this.observationFormArray = this.f['observationFormArray'] as FormArray;
            if (i < (this.orderitem001mb.orderitemspecification001wbs.length) - 1) {
              this.observationFormArray.push(this.createItem(new Observationsitems001wb()));
            }
            this.observationFormArray.controls[i].controls['ordernumber'].setValue(this.orderitem001mb.itemcode);
            this.observationFormArray.controls[i].controls['orderparameter'].setValue(this.orderitem001mb.orderitemspecification001wbs[i].parameter);
            this.observationFormArray.controls[i].controls['orderspecification'].setValue(this.orderitem001mb.orderitemspecification001wbs[i].specification);
            this.observationFormArray.controls[i].controls['orderinspection'].setValue(this.orderitem001mb.orderitemspecification001wbs[i].inspecmethod);
          }


        });
      }
      if (this.Consumablecode) {
        this.consumbleManager.findOne(this.Consumablecode).subscribe(response => {
          this.consumble001mb = deserialize<Consumble001mb>(Consumble001mb, response);
          for (let i = 0; i < this.consumble001mb.consumerspecification001wbs.length; i++) {
            this.observationFormArray = this.f['observationFormArray'] as FormArray;
            if (i < (this.consumble001mb.consumerspecification001wbs.length) - 1) {
              this.observationFormArray.push(this.createItem(new Observationsitems001wb()));
            }
            this.observationFormArray.controls[i].controls['consumnumber'].setValue(this.consumble001mb.consmno);
            this.observationFormArray.controls[i].controls['consumparameter'].setValue(this.consumble001mb.consumerspecification001wbs[i].parameter);
            this.observationFormArray.controls[i].controls['consumspecification'].setValue(this.consumble001mb.consumerspecification001wbs[i].specification);
            this.observationFormArray.controls[i].controls['consuminspection'].setValue(this.consumble001mb.consumerspecification001wbs[i].inspecmethod);
          }
        });
      }
      if (this.Childcode) {
        this.childPartManager.findOne(this.Childcode).subscribe(response => {
          this.childPart001mb = deserialize<ChildPart001mb>(ChildPart001mb, response);
          for (let i = 0; i < this.childPart001mb.childpartspecification001wbs.length; i++) {
            this.observationFormArray = this.f['observationFormArray'] as FormArray;
            if (i < (this.childPart001mb.childpartspecification001wbs.length) - 1) {
              this.observationFormArray.push(this.createItem(new Observationsitems001wb()));
            }
            this.observationFormArray.controls[i].controls['childnumber'].setValue(this.childPart001mb.cpartno);
            this.observationFormArray.controls[i].controls['childparameter'].setValue(this.childPart001mb.childpartspecification001wbs[i].parameter);
            this.observationFormArray.controls[i].controls['childspecification'].setValue(this.childPart001mb.childpartspecification001wbs[i].specification);
            this.observationFormArray.controls[i].controls['childinspection'].setValue(this.childPart001mb.childpartspecification001wbs[i].inspecmethod);
          }
        });
      }
      if (this.Partcode) {
        this.partManager.findOne(this.Partcode).subscribe(response => {
          this.part001mb = deserialize<Part001mb>(Part001mb, response);
          for (let i = 0; i < this.part001mb.partspecific001wbs.length; i++) {
            this.observationFormArray = this.f['observationFormArray'] as FormArray;
            if (i < (this.part001mb.partspecific001wbs.length) - 1) {
              this.observationFormArray.push(this.createItem(new Observationsitems001wb()));
            }
            this.observationFormArray.controls[i].controls['partnumber'].setValue(this.part001mb.partno);
            this.observationFormArray.controls[i].controls['partparameter'].setValue(this.part001mb.partspecific001wbs[i].parameter);
            this.observationFormArray.controls[i].controls['partspecification'].setValue(this.part001mb.partspecific001wbs[i].specification);
            this.observationFormArray.controls[i].controls['partinspection'].setValue(this.part001mb.partspecific001wbs[i].inspecmethod);
          }
        });
      }
    }
  }
  loadData() {
    this.observationsitemsManager.allobservation(this.user.unitslno).subscribe(response => {
      this.observationsitems001wbs = deserialize<Observationsitems001wb[]>(Observationsitems001wb, response);
      if (this.observationsitems001wbs.length > 0) {
        this.gridOptions?.api?.setRowData(this.observationsitems001wbs);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

  }




  get f() { return this.observationForm.controls; }
  get o() { return this.f.observationFormArray as FormArray; }



  createItem(observation: Observationsitems001wb) {
    if (this.incoming == "Raw") {
      return this.formBuilder.group({
        ordernumber: [observation.ordernumber ? observation.ordernumber : null, Validators.required],
        orderparameter: [observation.orderparameter ? observation.orderparameter : null, Validators.required],
        orderspecification: [observation.orderspecification ? observation.orderspecification : null, Validators.required],
        orderinspection: [observation.orderinspection ? observation.orderinspection : null, Validators.required],
        orderobservartion: [observation.orderobservartion ? observation.orderobservartion : null, Validators.required],
        orderobservartion1: [observation.orderobservartion1 ? observation.orderobservartion1 : null, Validators.required],
        orderobservartion2: [observation.orderobservartion2 ? observation.orderobservartion2 : null, Validators.required],
        orderobservartion3: [observation.orderobservartion3 ? observation.orderobservartion3 : null, Validators.required],
        orderobservartion4: [observation.orderobservartion4 ? observation.orderobservartion4 : null, Validators.required],
        orderobservartion5: [observation.orderobservartion5 ? observation.orderobservartion5 : null, Validators.required],
        orderobservartion6: [observation.orderobservartion6 ? observation.orderobservartion6 : null, Validators.required],
        orderobservartion7: [observation.orderobservartion7 ? observation.orderobservartion7 : null, Validators.required],
        orderobservartion8: [observation.orderobservartion8 ? observation.orderobservartion8 : null, Validators.required],
        orderobservartion9: [observation.orderobservartion9 ? observation.orderobservartion9 : null, Validators.required],


        observationFormArray: new FormArray([]),
      });

    }

    else if (this.incoming == "Consumable Item") {

      return this.formBuilder.group({

        consumnumber: [observation.consumnumber ? observation.consumnumber : null, Validators.required],
        consumparameter: [observation.consumparameter ? observation.consumparameter : null, Validators.required],
        consumspecification: [observation.consumspecification ? observation.consumspecification : null, Validators.required],
        consuminspection: [observation.consuminspection ? observation.consuminspection : null, Validators.required],
        consumobservartion: [observation.consumobservartion ? observation.consumobservartion : null, Validators.required],
        consumobservartion1: [observation.consumobservartion1 ? observation.consumobservartion1 : null, Validators.required],
        consumobservartion2: [observation.consumobservartion2 ? observation.consumobservartion2 : null, Validators.required],
        consumobservartion3: [observation.consumobservartion3 ? observation.consumobservartion3 : null, Validators.required],
        consumobservartion4: [observation.consumobservartion4 ? observation.consumobservartion4 : null, Validators.required],
        consumobservartion5: [observation.consumobservartion5 ? observation.consumobservartion5 : null, Validators.required],
        consumobservartion6: [observation.consumobservartion6 ? observation.consumobservartion6 : null, Validators.required],
        consumobservartion7: [observation.consumobservartion7 ? observation.consumobservartion7 : null, Validators.required],
        consumobservartion8: [observation.consumobservartion8 ? observation.consumobservartion8 : null, Validators.required],
        consumobservartion9: [observation.consumobservartion9 ? observation.consumobservartion9 : null, Validators.required],

        observationFormArray: new FormArray([]),
      });

    }

    else if (this.incoming == "Child Part") {

      return this.formBuilder.group({

        childnumber: [observation.childnumber ? observation.childnumber : null, Validators.required],
        childparameter: [observation.childparameter ? observation.childparameter : null, Validators.required],
        childspecification: [observation.childspecification ? observation.childspecification : null, Validators.required],
        childinspection: [observation.childinspection ? observation.childinspection : null, Validators.required],
        childobservartion: [observation.childobservartion ? observation.childobservartion : null, Validators.required],
        childobservartion1: [observation.childobservartion1 ? observation.childobservartion1 : null, Validators.required],
        childobservartion2: [observation.childobservartion2 ? observation.childobservartion2 : null, Validators.required],
        childobservartion3: [observation.childobservartion3 ? observation.childobservartion3 : null, Validators.required],
        childobservartion4: [observation.childobservartion4 ? observation.childobservartion4 : null, Validators.required],
        childobservartion5: [observation.childobservartion5 ? observation.childobservartion5 : null, Validators.required],
        childobservartion6: [observation.childobservartion6 ? observation.childobservartion6 : null, Validators.required],
        childobservartion7: [observation.childobservartion7 ? observation.childobservartion7 : null, Validators.required],
        childobservartion8: [observation.childobservartion8 ? observation.childobservartion8 : null, Validators.required],
        childobservartion9: [observation.childobservartion9 ? observation.childobservartion9 : null, Validators.required],
        observationFormArray: new FormArray([]),
      });

    }


    else {

      return this.formBuilder.group({

        partparameter: [observation.partparameter ? observation.partparameter : null, Validators.required],
        partnumber: [observation.partnumber ? observation.partnumber : null, Validators.required],
        partspecification: [observation.partspecification ? observation.partspecification : null, Validators.required],
        partinspection: [observation.partinspection ? observation.partinspection : null, Validators.required],

        partobservartion: [observation.partobservartion ? observation.partobservartion : null, Validators.required],
        partobservartion1: [observation.partobservartion1 ? observation.partobservartion1 : null, Validators.required],
        partobservartion2: [observation.partobservartion2 ? observation.partobservartion2 : null, Validators.required],
        partobservartion3: [observation.partobservartion3 ? observation.partobservartion3 : null, Validators.required],
        partobservartion4: [observation.partobservartion4 ? observation.partobservartion4 : null, Validators.required],
        partobservartion5: [observation.partobservartion5 ? observation.partobservartion5 : null, Validators.required],
        partobservartion6: [observation.partobservartion6 ? observation.partobservartion6 : null, Validators.required],
        partobservartion7: [observation.partobservartion7 ? observation.partobservartion7 : null, Validators.required],
        partobservartion8: [observation.partobservartion8 ? observation.partobservartion8 : null, Validators.required],
        partobservartion9: [observation.partobservartion9 ? observation.partobservartion9 : null, Validators.required],
        observationFormArray: new FormArray([]),
      });

    }


    // return this.formBuilder.group({
    //   observationslno: [observation.observationslno ? observation.observationslno :null ,Validators.required],
    //   consumnumber: [observation.consumnumber ? observation.consumnumber:null , Validators.required],


    //   orderparameter: [observation.orderparameter ? observation.orderparameter:null ,  Validators.required],
    //   orderspecification: [observation.orderspecification ? observation.orderspecification:null , Validators.required],
    //   orderinspection: [observation.orderinspection ? observation.orderinspection:null , Validators.required],
    //   consumparameter: [observation.consumparameter ? observation.consumparameter:null , Validators.required],
    //   consumspecification: [observation.consumspecification ? observation.consumspecification:null , Validators.required],
    //   consuminspection: [observation.consuminspection ? observation.consuminspection:null ,  Validators.required],
    //   childnumber: [observation.childnumber ? observation.childnumber:null , Validators.required],
    //   childparameter: [observation.childparameter ? observation.childparameter:null , Validators.required],
    //   childspecification: [observation.childspecification ? observation.childspecification:null , Validators.required],
    //   childinspection: [observation.childinspection ? observation.childinspection:null , Validators.required],
    //   partparameter: [observation.partparameter ? observation.partparameter:null , Validators.required],
    //   partnumber: [observation.partnumber ? observation.partnumber:null , Validators.required],
    //   partspecification: [observation.partspecification ? observation.partspecification:null , Validators.required],
    //   partinspection: [observation.partinspection ? observation.partinspection:null , Validators.required],

    //   partobservartion: [observation.partobservartion ? observation.partobservartion:null , Validators.required],
    //   partobservartion1: [observation.partobservartion1 ? observation.partobservartion1:null , Validators.required],
    //   partobservartion2: [observation.partobservartion2 ? observation.partobservartion2:null , Validators.required],
    //   partobservartion3: [observation.partobservartion3 ? observation.partobservartion3:null , Validators.required],
    //   partobservartion4: [observation.partobservartion4 ? observation.partobservartion4:null , Validators.required],
    //   partobservartion5: [observation.partobservartion5 ? observation.partobservartion5:null , Validators.required],
    //   partobservartion6: [observation.partobservartion6 ? observation.partobservartion6:null , Validators.required],
    //   partobservartion7: [observation.partobservartion7 ? observation.partobservartion7:null , Validators.required],
    //   partobservartion8: [observation.partobservartion8 ? observation.partobservartion8:null , Validators.required],
    //   partobservartion9: [observation.partobservartion9 ? observation.partobservartion9:null , Validators.required],

    //   childobservartion: [observation.childobservartion ? observation.childobservartion:null , Validators.required],
    //   childobservartion1: [observation.childobservartion1 ? observation.childobservartion1:null , Validators.required],
    //   childobservartion2: [observation.childobservartion2 ? observation.childobservartion2:null , Validators.required],
    //   childobservartion3: [observation.childobservartion3 ? observation.childobservartion3:null , Validators.required],
    //   childobservartion4: [observation.childobservartion4 ? observation.childobservartion4:null , Validators.required],
    //   childobservartion5: [observation.childobservartion5 ? observation.childobservartion5:null , Validators.required],
    //   childobservartion6: [observation.childobservartion6 ? observation.childobservartion6:null , Validators.required],
    //   childobservartion7: [observation.childobservartion7 ? observation.childobservartion7:null , Validators.required],
    //   childobservartion8: [observation.childobservartion8 ? observation.childobservartion8:null , Validators.required],
    //   childobservartion9: [observation.childobservartion9 ? observation.childobservartion9:null , Validators.required],

    //   consumobservartion: [observation.consumobservartion ? observation.consumobservartion:null , Validators.required],
    //   consumobservartion1: [observation.consumobservartion1 ? observation.consumobservartion1:null , Validators.required],
    //   consumobservartion2: [observation.consumobservartion2 ? observation.consumobservartion2:null , Validators.required],
    //   consumobservartion3: [observation.consumobservartion3 ? observation.consumobservartion3:null , Validators.required],
    //   consumobservartion4: [observation.consumobservartion4 ? observation.consumobservartion4:null , Validators.required],
    //   consumobservartion5: [observation.consumobservartion5 ? observation.consumobservartion5:null , Validators.required],
    //   consumobservartion6: [observation.consumobservartion6 ? observation.consumobservartion6:null , Validators.required],
    //   consumobservartion7: [observation.consumobservartion7 ? observation.consumobservartion7:null , Validators.required],
    //   consumobservartion8: [observation.consumobservartion8 ? observation.consumobservartion8:null , Validators.required],
    //   consumobservartion9: [observation.consumobservartion9 ? observation.consumobservartion9:null , Validators.required],

    //   orderobservartion: [observation.orderobservartion ? observation.orderobservartion:null, Validators.required],
    //   orderobservartion1: [observation.orderobservartion1 ? observation.orderobservartion1:null , Validators.required],
    //   orderobservartion2: [observation.orderobservartion2 ? observation.orderobservartion2:null , Validators.required],
    //   orderobservartion3: [observation.orderobservartion3 ? observation.orderobservartion3:null , Validators.required],
    //   orderobservartion4: [observation.orderobservartion4 ? observation.orderobservartion4:null , Validators.required],
    //   orderobservartion5: [observation.orderobservartion5 ? observation.orderobservartion5:null , Validators.required],
    //   orderobservartion6: [observation.orderobservartion6 ? observation.orderobservartion6:null , Validators.required],
    //   orderobservartion7: [observation.orderobservartion7 ? observation.orderobservartion7:null , Validators.required],
    //   orderobservartion8: [observation.orderobservartion8 ? observation.orderobservartion8:null , Validators.required],
    //   orderobservartion9: [observation.orderobservartion9 ? observation.orderobservartion9:null , Validators.required],


    //   observationFormArray: new FormArray([]),
    // });
  }



  addItem() {
    this.observationFormArray = this.f['observationFormArray'] as FormArray;
    this.observationFormArray.push(this.createItem(new Observationsitems001wb()));
    this.submitted = false;
  }

  removeItem(idx: number): void {
    (this.f['observationFormArray'] as FormArray).removeAt(idx);
  }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }



  onOkClick(event: any, observationFormArray: any) {
    this.markFormGroupTouched(this.observationFormArray);
    this.submitted = true;
    if (this.observationFormArray.invalid) {
      return;
    }
    let observationsitems001wbs: Observationsitems001wb[] = [];
    for (let i = 0; i < this.observationFormArray.controls.length; i++) {
      let observationsitems001wb = new Observationsitems001wb();
      observationsitems001wb.observationslno2 = this.f.observationFormArray.value[i].observationslno2 ? this.f.observationFormArray.value[i].observationslno2 : "";
      observationsitems001wb.ordernumber = this.f.observationFormArray.value[i].ordernumber ? this.f.observationFormArray.value[i].ordernumber : "";
      observationsitems001wb.consumnumber = this.f.observationFormArray.value[i].consumnumber ? this.f.observationFormArray.value[i].consumnumber : "";
      observationsitems001wb.childnumber = this.f.observationFormArray.value[i].childnumber ? this.f.observationFormArray.value[i].childnumber : "";
      observationsitems001wb.partnumber = this.f.observationFormArray.value[i].partnumber ? this.f.observationFormArray.value[i].partnumber : "";
      observationsitems001wb.orderparameter = this.f.observationFormArray.value[i].orderparameter ? this.f.observationFormArray.value[i].orderparameter : "";
      observationsitems001wb.orderinspection = this.f.observationFormArray.value[i].orderinspection ? this.f.observationFormArray.value[i].orderinspection : "";
      observationsitems001wb.orderspecification = this.f.observationFormArray.value[i].orderspecification ? this.f.observationFormArray.value[i].orderspecification : "";
      observationsitems001wb.childinspection = this.f.observationFormArray.value[i].childinspection ? this.f.observationFormArray.value[i].childinspection : "";
      observationsitems001wb.childparameter = this.f.observationFormArray.value[i].childparameter ? this.f.observationFormArray.value[i].childparameter : "";
      observationsitems001wb.childspecification = this.f.observationFormArray.value[i].childspecification ? this.f.observationFormArray.value[i].childspecification : "";
      observationsitems001wb.partparameter = this.f.observationFormArray.value[i].partparameter ? this.f.observationFormArray.value[i].partparameter : "";
      observationsitems001wb.partinspection = this.f.observationFormArray.value[i].partinspection ? this.f.observationFormArray.value[i].partinspection : "";
      observationsitems001wb.partspecification = this.f.observationFormArray.value[i].partspecification ? this.f.observationFormArray.value[i].partspecification : "";
      observationsitems001wb.consuminspection = this.f.observationFormArray.value[i].consuminspection ? this.f.observationFormArray.value[i].consuminspection : "";
      observationsitems001wb.consumspecification = this.f.observationFormArray.value[i].consumspecification ? this.f.observationFormArray.value[i].consumspecification : "";
      observationsitems001wb.consumparameter = this.f.observationFormArray.value[i].consumparameter ? this.f.observationFormArray.value[i].consumparameter : "";

      observationsitems001wb.orderobservartion = this.f.observationFormArray.value[i].orderobservartion ? this.f.observationFormArray.value[i].orderobservartion : "";
      observationsitems001wb.orderobservartion1 = this.f.observationFormArray.value[i].orderobservartion1 ? this.f.observationFormArray.value[i].orderobservartion1 : "";
      observationsitems001wb.orderobservartion2 = this.f.observationFormArray.value[i].orderobservartion2 ? this.f.observationFormArray.value[i].orderobservartion2 : "";
      observationsitems001wb.orderobservartion3 = this.f.observationFormArray.value[i].orderobservartion3 ? this.f.observationFormArray.value[i].orderobservartion3 : "";
      observationsitems001wb.orderobservartion4 = this.f.observationFormArray.value[i].orderobservartion4 ? this.f.observationFormArray.value[i].orderobservartion4 : "";
      observationsitems001wb.orderobservartion5 = this.f.observationFormArray.value[i].orderobservartion5 ? this.f.observationFormArray.value[i].orderobservartion5 : "";
      observationsitems001wb.orderobservartion6 = this.f.observationFormArray.value[i].orderobservartion6 ? this.f.observationFormArray.value[i].orderobservartion6 : "";
      observationsitems001wb.orderobservartion7 = this.f.observationFormArray.value[i].orderobservartion7 ? this.f.observationFormArray.value[i].orderobservartion7 : "";
      observationsitems001wb.orderobservartion8 = this.f.observationFormArray.value[i].orderobservartion8 ? this.f.observationFormArray.value[i].orderobservartion8 : "";
      observationsitems001wb.orderobservartion9 = this.f.observationFormArray.value[i].orderobservartion9 ? this.f.observationFormArray.value[i].orderobservartion9 : "";

      observationsitems001wb.consumobservartion = this.f.observationFormArray.value[i].consumobservartion ? this.f.observationFormArray.value[i].consumobservartion : "";
      observationsitems001wb.consumobservartion1 = this.f.observationFormArray.value[i].consumobservartion1 ? this.f.observationFormArray.value[i].consumobservartion1 : "";
      observationsitems001wb.consumobservartion2 = this.f.observationFormArray.value[i].consumobservartion2 ? this.f.observationFormArray.value[i].consumobservartion2 : "";
      observationsitems001wb.consumobservartion3 = this.f.observationFormArray.value[i].consumobservartion3 ? this.f.observationFormArray.value[i].consumobservartion3 : "";
      observationsitems001wb.consumobservartion4 = this.f.observationFormArray.value[i].consumobservartion4 ? this.f.observationFormArray.value[i].consumobservartion4 : "";
      observationsitems001wb.consumobservartion5 = this.f.observationFormArray.value[i].consumobservartion5 ? this.f.observationFormArray.value[i].consumobservartion5 : "";
      observationsitems001wb.consumobservartion6 = this.f.observationFormArray.value[i].consumobservartion6 ? this.f.observationFormArray.value[i].consumobservartion6 : "";
      observationsitems001wb.consumobservartion7 = this.f.observationFormArray.value[i].consumobservartion7 ? this.f.observationFormArray.value[i].consumobservartion7 : "";
      observationsitems001wb.consumobservartion8 = this.f.observationFormArray.value[i].consumobservartion8 ? this.f.observationFormArray.value[i].consumobservartion8 : "";
      observationsitems001wb.consumobservartion9 = this.f.observationFormArray.value[i].consumobservartion9 ? this.f.observationFormArray.value[i].consumobservartion9 : "";

      observationsitems001wb.childobservartion = this.f.observationFormArray.value[i].childobservartion ? this.f.observationFormArray.value[i].childobservartion : "";
      observationsitems001wb.childobservartion1 = this.f.observationFormArray.value[i].childobservartion1 ? this.f.observationFormArray.value[i].childobservartion1 : "";
      observationsitems001wb.childobservartion2 = this.f.observationFormArray.value[i].childobservartion2 ? this.f.observationFormArray.value[i].childobservartion2 : "";
      observationsitems001wb.childobservartion3 = this.f.observationFormArray.value[i].childobservartion3 ? this.f.observationFormArray.value[i].childobservartion3 : "";
      observationsitems001wb.childobservartion4 = this.f.observationFormArray.value[i].childobservartion4 ? this.f.observationFormArray.value[i].childobservartion4 : "";
      observationsitems001wb.childobservartion5 = this.f.observationFormArray.value[i].childobservartion5 ? this.f.observationFormArray.value[i].childobservartion5 : "";
      observationsitems001wb.childobservartion6 = this.f.observationFormArray.value[i].childobservartion6 ? this.f.observationFormArray.value[i].childobservartion6 : "";
      observationsitems001wb.childobservartion7 = this.f.observationFormArray.value[i].childobservartion7 ? this.f.observationFormArray.value[i].childobservartion7 : "";
      observationsitems001wb.childobservartion8 = this.f.observationFormArray.value[i].childobservartion8 ? this.f.observationFormArray.value[i].childobservartion8 : "";
      observationsitems001wb.childobservartion9 = this.f.observationFormArray.value[i].childobservartion9 ? this.f.observationFormArray.value[i].childobservartion9 : "";

      observationsitems001wb.partobservartion = this.f.observationFormArray.value[i].partobservartion ? this.f.observationFormArray.value[i].partobservartion : "";
      observationsitems001wb.partobservartion1 = this.f.observationFormArray.value[i].partobservartion1 ? this.f.observationFormArray.value[i].partobservartion1 : "";
      observationsitems001wb.partobservartion3 = this.f.observationFormArray.value[i].partobservartion3 ? this.f.observationFormArray.value[i].partobservartion3 : "";
      observationsitems001wb.partobservartion2 = this.f.observationFormArray.value[i].partobservartion2 ? this.f.observationFormArray.value[i].partobservartion2 : "";
      observationsitems001wb.partobservartion4 = this.f.observationFormArray.value[i].partobservartion4 ? this.f.observationFormArray.value[i].partobservartion4 : "";
      observationsitems001wb.partobservartion5 = this.f.observationFormArray.value[i].partobservartion5 ? this.f.observationFormArray.value[i].partobservartion5 : "";
      observationsitems001wb.partobservartion6 = this.f.observationFormArray.value[i].partobservartion6 ? this.f.observationFormArray.value[i].partobservartion6 : "";
      observationsitems001wb.partobservartion7 = this.f.observationFormArray.value[i].partobservartion7 ? this.f.observationFormArray.value[i].partobservartion7 : "";
      observationsitems001wb.partobservartion8 = this.f.observationFormArray.value[i].partobservartion8 ? this.f.observationFormArray.value[i].partobservartion8 : "";
      observationsitems001wb.partobservartion9 = this.f.observationFormArray.value[i].partobservartion9 ? this.f.observationFormArray.value[i].partobservartion9 : "";

      observationsitems001wbs.push(observationsitems001wb);
   


      // this.activeModal.close({
      //   status: "Yes",
      //   observationitem: observationsitems001wbs,
      // });


    }
    this.activeModal.close({
      status: "Yes",
      observationitem: observationsitems001wbs,
    });



    // this.activeModal.close({
    //   status: "Yes",
    // });
  }

  onCancelClick() {
    this.activeModal.close('No');
  }
}
