import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { PartspecificationManager } from '../services/restcontroller/bizservice/partspecification.service';
import { RawmaterialManager } from '../services/restcontroller/bizservice/rawMaterial.service';
import { Partspecification001wb } from '../services/restcontroller/entities/Partspecification001wb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';
import { deserialize } from 'serializer.ts/Serializer';
import { SpecificationManager } from '../services/restcontroller/bizservice/Specification.service';
import { Specification001wb } from '../services/restcontroller/entities/Specification001wb';
import { ObservationItemsComponent } from '../observation-items/observation-items.component';
import { Orderitem001mb } from '../services/restcontroller/entities/Orderitem001mb';
import { OrderItemSettingManager } from '../services/restcontroller/bizservice/orderItems.service';
import { MaterialInwardManager } from '../services/restcontroller/bizservice/Materialinward.service';
import { Materialinward001wb } from '../services/restcontroller/entities/Materialinward001wb';
import { ChildPartManager } from '../services/restcontroller/bizservice/ChildPart.service';
import { ChildPart001mb } from '../services/restcontroller/entities/ChildPart001mb';
import { Consumble001mb } from '../services/restcontroller/entities/Consumble001mb';
import { ConsumbleManager } from '../services/restcontroller/bizservice/consumble.service';
import { Part001mb } from '../services/restcontroller/entities/Part001mb';
import { PartManager } from '../services/restcontroller/bizservice/part.service';
import { RawmaterialinspectionManager } from '../services/restcontroller/bizservice/Rawmaterialinspection.service';
import { Rawmaterialinspection001wb } from '../services/restcontroller/entities/Rawmaterialinspection001wb';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { Observationsitems001wb } from '../services/restcontroller/entities/Observationsitems001wb';

@Component({
    selector: 'app-raw-material',
    templateUrl: './raw-material.component.html',
    styleUrls: ['./raw-material.component.css'],
})
export class RawMaterialComponent implements OnInit {
    @Input() grsNumber: any;
    @Input() suplier: any;
    @Input() rawmaterialinspection: any;
    rawMaterialForm: FormGroup | any;
    rawMaterialFormArray: FormArray | any;
    frameworkComponents: any;
    public gridOptions: GridOptions | any;
    slNo: number | any;
    submitted = false;
    addpopup: string = '';
    orderitem001mbs: Orderitem001mb[] = [];
    orderitem001mb?: Orderitem001mb;
    childPart001mbs: ChildPart001mb[] = [];
    childPart001mb?: ChildPart001mb;
    consumble001mbs: Consumble001mb[] = [];
    consumble001mb?: Consumble001mb;
    part001mbs: Part001mb[] = [];
    part001mb?: Part001mb;
    materialinward001wbs: Materialinward001wb[] = [];
    materialinward001wb?: Materialinward001wb | any;
    rawmaterialinspection001wbs: Rawmaterialinspection001wb[] = [];
    rawmaterialinspection001wb?: Rawmaterialinspection001wb;
    user?: Login001mb | any;
    unitslno?: number;
    observationitem: Observationsitems001wb[] = [];
    observationitems: any[] = [];

    constructor(
        private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal,
        private authManager: AuthManager,
        private calloutService: CalloutService,
        private orderItemSettingManager: OrderItemSettingManager,
        private childPartManager: ChildPartManager,
        private consumbleManager: ConsumbleManager,
        private partManager: PartManager,
        private rawmaterialinspectionManager: RawmaterialinspectionManager,
        private materialInwardManager: MaterialInwardManager,
        private dataSharedService: DataSharedService,
        private modalService: NgbModal,
        private httpClient: HttpClient,
        private http: HttpClient
    ) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent,
        };
    }

    ngOnInit(): void {
        this.user = this.authManager.getcurrentUser;

        this.rawMaterialForm = this.formBuilder.group({
            rawMaterialFormArray: this.formBuilder.array([this.createItem()]),
        });

        this.orderItemSettingManager.allitem(this.user.unitslno).subscribe((response) => {
            this.orderitem001mbs = deserialize<Orderitem001mb[]>(Orderitem001mb, response);
        });

        this.childPartManager.allChildpart(this.user.unitslno).subscribe((response) => {
            this.childPart001mbs = deserialize<ChildPart001mb[]>(ChildPart001mb, response);
        });

        this.consumbleManager.allconsumble(this.user.unitslno).subscribe((response) => {
            this.consumble001mbs = deserialize<Consumble001mb[]>(Consumble001mb, response);
        });

        this.partManager.allpart(this.user.unitslno).subscribe((response) => {
            this.part001mbs = deserialize<Part001mb[]>(Part001mb, response);
        });

        this.materialInwardManager.findOne(this.grsNumber).subscribe((response) => {
            this.materialinward001wb = deserialize<Materialinward001wb>(Materialinward001wb, response);
            for (let i = 0; i < this.materialinward001wb.materialreceiveditem001wbs.length; i++) {
                this.rawMaterialFormArray = this.f['rawMaterialFormArray'] as FormArray;
                if (i < this.materialinward001wb.materialreceiveditem001wbs.length - 1) {
                    this.rawMaterialFormArray.push(this.createItem());
                }

                setTimeout(() => {
                    if (this.materialinward001wb.materialreceiveditem001wbs[i].itemcode) {
                        for (let orderItems of this.orderitem001mbs) {
                            if (orderItems.slNo == this.materialinward001wb.materialreceiveditem001wbs[i].itemcode) {
                                this.rawMaterialFormArray.controls[i].controls['itemcode'].setValue(orderItems.itemcode);
                                break;
                            }
                        }
                    }
                    else {
                        this.rawMaterialFormArray.controls[i].controls['itemcode'].setValue(null);
                    }
                }, 100);

                setTimeout(() => {
                    if (this.materialinward001wb.materialreceiveditem001wbs[i].cucode) {
                        for (let consumbleItems of this.consumble001mbs) {
                            if (consumbleItems.slNo == this.materialinward001wb.materialreceiveditem001wbs[i].cucode) {
                                this.rawMaterialFormArray.controls[i].controls['cucode'].setValue(consumbleItems.consmno);
                                break;
                            }
                        }
                    }
                    else {
                        this.rawMaterialFormArray.controls[i].controls['cucode'].setValue(null);
                    }
                }, 100);

                setTimeout(() => {
                    if (this.materialinward001wb.materialreceiveditem001wbs[i].cptcode) {
                        for (let childPartItems of this.childPart001mbs) {
                            if (
                                childPartItems.slNo == this.materialinward001wb.materialreceiveditem001wbs[i].cptcode) {
                                this.rawMaterialFormArray.controls[i].controls['cptcode'].setValue(childPartItems.cpartno);
                                break;
                            }
                        }
                    }
                    else {
                        this.rawMaterialFormArray.controls[i].controls['cptcode'].setValue(null);
                    }
                }, 100);

                setTimeout(() => {
                    if (this.materialinward001wb.materialreceiveditem001wbs[i].prtcode) {
                        for (let partItems of this.part001mbs) {
                            if (
                                partItems.slNo == this.materialinward001wb.materialreceiveditem001wbs[i].prtcode) {
                                this.rawMaterialFormArray.controls[i].controls['prtcode'].setValue(partItems.partno);
                                break;
                            }
                        }
                    }
                    else {
                        this.rawMaterialFormArray.controls[i].controls['prtcode'].setValue(null);
                    }
                }, 100);

                // this.rawMaterialFormArray.controls[i].controls['itemcode'].setValue(this.materialinward001wb.materialreceiveditem001wbs[i].itemcode ? this.orderitem001mbs.find(x=>x.slNo === this.materialinward001wb.materialreceiveditem001wbs[i].itemcode)?.itemcode:null);
                this.rawMaterialFormArray.controls[i].controls['itemname'].setValue(this.materialinward001wb.materialreceiveditem001wbs[i].itemname);
                this.rawMaterialFormArray.controls[i].controls['descrip'].setValue(this.materialinward001wb.materialreceiveditem001wbs[i].descrip);
                this.rawMaterialFormArray.controls[i].controls['qunty'].setValue(this.materialinward001wb.materialreceiveditem001wbs[i].qunty);
                this.rawMaterialFormArray.controls[i].controls['cuqunty'].setValue(this.materialinward001wb.materialreceiveditem001wbs[i].cuqunty);
                this.rawMaterialFormArray.controls[i].controls['cptqunty'].setValue(this.materialinward001wb.materialreceiveditem001wbs[i].cptqunty);
                this.rawMaterialFormArray.controls[i].controls['prtqunty'].setValue(this.materialinward001wb.materialreceiveditem001wbs[i].prtqunty);
                this.rawMaterialFormArray.controls[i].controls['receivedQty'].setValue(this.materialinward001wb.materialreceiveditem001wbs[i].receivedQty);
                this.rawMaterialFormArray.controls[i].controls['acceptedQty'].setValue(this.materialinward001wb.materialreceiveditem001wbs[i].acceptedQty);
                this.rawMaterialFormArray.controls[i].controls['rejectedQty'].setValue(this.materialinward001wb.materialreceiveditem001wbs[i].rejectedQty);
                this.rawMaterialFormArray.controls[i].controls['outstanding'].setValue(this.materialinward001wb.materialreceiveditem001wbs[i].outstanding);
                this.rawMaterialFormArray.controls[i].controls['cureceivedQty'].setValue(this.materialinward001wb.materialreceiveditem001wbs[i].cureceivedQty);
                this.rawMaterialFormArray.controls[i].controls['cuacceptedQty'].setValue(this.materialinward001wb.materialreceiveditem001wbs[i].cuacceptedQty);
                this.rawMaterialFormArray.controls[i].controls['curejectedQty'].setValue(this.materialinward001wb.materialreceiveditem001wbs[i].curejectedQty);
                this.rawMaterialFormArray.controls[i].controls[
                    'cuoutstanding'
                ].setValue(
                    this.materialinward001wb.materialreceiveditem001wbs[i]
                        .cuoutstanding
                );

                this.rawMaterialFormArray.controls[i].controls[
                    'cptreceivedQty'
                ].setValue(
                    this.materialinward001wb.materialreceiveditem001wbs[i]
                        .cptreceivedQty
                );
                this.rawMaterialFormArray.controls[i].controls[
                    'cptacceptedQty'
                ].setValue(
                    this.materialinward001wb.materialreceiveditem001wbs[i]
                        .cptacceptedQty
                );
                this.rawMaterialFormArray.controls[i].controls[
                    'cptrejectedQty'
                ].setValue(
                    this.materialinward001wb.materialreceiveditem001wbs[i]
                        .cptrejectedQty
                );
                this.rawMaterialFormArray.controls[i].controls[
                    'cptoutstanding'
                ].setValue(
                    this.materialinward001wb.materialreceiveditem001wbs[i]
                        .cptoutstanding
                );

                this.rawMaterialFormArray.controls[i].controls[
                    'prtreceivedQty'
                ].setValue(
                    this.materialinward001wb.materialreceiveditem001wbs[i]
                        .prtreceivedQty
                );
                this.rawMaterialFormArray.controls[i].controls[
                    'prtacceptedQty'
                ].setValue(
                    this.materialinward001wb.materialreceiveditem001wbs[i]
                        .prtacceptedQty
                );
                this.rawMaterialFormArray.controls[i].controls[
                    'prtrejectedQty'
                ].setValue(
                    this.materialinward001wb.materialreceiveditem001wbs[i]
                        .prtrejectedQty
                );
                this.rawMaterialFormArray.controls[i].controls[
                    'prtoutstanding'
                ].setValue(
                    this.materialinward001wb.materialreceiveditem001wbs[i]
                        .prtoutstanding
                );

                this.rawMaterialFormArray.controls[i].controls[
                    'cuname'
                ].setValue(
                    this.materialinward001wb.materialreceiveditem001wbs[i]
                        .cuname
                );
                this.rawMaterialFormArray.controls[i].controls[
                    'cudescrip'
                ].setValue(
                    this.materialinward001wb.materialreceiveditem001wbs[i]
                        .cudescrip
                );

                this.rawMaterialFormArray.controls[i].controls[
                    'cptname'
                ].setValue(
                    this.materialinward001wb.materialreceiveditem001wbs[i]
                        .cptname
                );
                this.rawMaterialFormArray.controls[i].controls[
                    'cptdescrip'
                ].setValue(
                    this.materialinward001wb.materialreceiveditem001wbs[i]
                        .cptdescrip
                );

                this.rawMaterialFormArray.controls[i].controls[
                    'prtname'
                ].setValue(
                    this.materialinward001wb.materialreceiveditem001wbs[i]
                        .prtmname
                );
                this.rawMaterialFormArray.controls[i].controls[
                    'prtdescrip'
                ].setValue(
                    this.materialinward001wb.materialreceiveditem001wbs[i]
                        .prtdescrip
                );
            }
        });
    }

    get f() {
        return this.rawMaterialForm.controls;
    }
    get o() {
        return this.f.rawMaterialFormArray as FormArray;
    }

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
            rawmaterialslno: ['', Validators.required],
            itemcode: ['', Validators.required],
            itemname: ['', Validators.required],
            descrip: ['', Validators.required],

            cucode: ['', Validators.required],
            cuname: ['', Validators.required],
            cudescrip: ['', Validators.required],

            qunty: ['', Validators.required],
            cuqunty: ['', Validators.required],
            cptqunty: ['', Validators.required],
            prtqunty: ['', Validators.required],
            cptcode: ['', Validators.required],
            cptname: ['', Validators.required],
            cptdescrip: ['', Validators.required],
            prtcode: ['', Validators.required],
            prtname: ['', Validators.required],
            prtdescrip: ['', Validators.required],

            receivedQty: ['', Validators.required],
            acceptedQty: ['', Validators.required],
            rejectedQty: [''],
            outstanding: [''],

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

            rawMaterialFormArray: new FormArray([]),
        });
    }

    onAddbuttonClick1(event: any, index: any) {
        let orderitemnumber: any = [];
        let orderitem: any = [];
        let incoming = '';

        this.orderItemSettingManager
            .findOne(
                this.f.rawMaterialFormArray.value[index].itemcode
                    ? this.orderitem001mbs.find(
                        (x) =>
                            x.itemcode ===
                            this.f.rawMaterialFormArray.value[index].itemcode
                    )?.slNo
                    : null
            )
            .subscribe((response) => {
                this.orderitem001mb = deserialize<Orderitem001mb>(
                    Orderitem001mb,
                    response
                );

                for (
                    let i = 0;
                    i < this.orderitem001mb.orderitemspecification001wbs.length;
                    i++
                ) {
                    if (
                        this.orderitem001mb.orderitemspecification001wbs[i]
                            .itemslno
                    ) {
                        orderitem.push(
                            this.orderitem001mb.orderitemspecification001wbs[i]
                                .itemslno
                        );
                    }
                }
                if (orderitem.length > 0) {
                    incoming = 'Raw';
                }
                const modalRef = this.modalService.open(
                    ObservationItemsComponent,
                    { windowClass: 'my-class' }
                );
                modalRef.componentInstance.RawMaterialcode = this.f
                    .rawMaterialFormArray.value[index].itemcode
                    ? this.orderitem001mbs.find(
                        (x) =>
                            x.itemcode ===
                            this.f.rawMaterialFormArray.value[index].itemcode
                    )?.slNo
                    : null;
                modalRef.componentInstance.incoming = incoming;
                if (this.observationitems && this.observationitems.length > 0) {
                    for (let observationitem of this.observationitems) {
                        if (
                            observationitem.itemcode ==
                            this.f.rawMaterialFormArray.value[index].itemcode
                        ) {
                            modalRef.componentInstance.observationitem =
                                observationitem.observation;
                        }
                    }
                }
                modalRef.result.then((data) => {

                    if (data.status == 'Yes') {
                        let observation: any = {
                            itemcode:
                                this.f.rawMaterialFormArray.value[index]
                                    .itemcode,
                            observation: data.observationitem,

                        };
                        if (this.observationitems.length == 0) {
                            this.observationitems.push(observation);
                        } else {
                            if (this.observationitems.find((x) => x.itemcode == observation.itemcode)) {
                                this.calloutService.showWarning(
                                    'Already observation is submitted !'
                                );
                            }
                            else {
                                this.observationitems.push(observation);
                            }
                        }


                    }
                });
            });
    }

    onAddbuttonClick2(event: any, index: any) {
        let consumableitem: any = [];
        let incoming = '';

        this.consumbleManager
            .findOne(
                this.f.rawMaterialFormArray.value[index].cucode
                    ? this.consumble001mbs.find(
                        (x) =>
                            x.consmno ===
                            this.f.rawMaterialFormArray.value[index].cucode
                    )?.slNo
                    : null
            )
            .subscribe((response) => {
                this.consumble001mb = deserialize<Consumble001mb>(
                    Consumble001mb,
                    response
                );

                for (
                    let i = 0;
                    i < this.consumble001mb.consumerspecification001wbs.length;
                    i++
                ) {
                    if (
                        this.consumble001mb.consumerspecification001wbs[i]
                            .consumslno
                    ) {
                        consumableitem.push(
                            this.consumble001mb.consumerspecification001wbs[i]
                                .consumslno
                        );
                    }
                }
                if (consumableitem.length > 0) {
                    incoming = 'Consumable Item';
                }
                const modalRef = this.modalService.open(
                    ObservationItemsComponent,
                    { windowClass: 'my-class' }
                );
                modalRef.componentInstance.Consumablecode = this.f
                    .rawMaterialFormArray.value[index].cucode
                    ? this.consumble001mbs.find(
                        (x) =>
                            x.consmno ===
                            this.f.rawMaterialFormArray.value[index].cucode
                    )?.slNo
                    : null;
                modalRef.componentInstance.incoming = incoming;
                if (this.observationitems && this.observationitems.length > 0) {
                    for (let observationitem of this.observationitems) {
                        if (
                            observationitem.cucode ==
                            this.f.rawMaterialFormArray.value[index].cucode
                        ) {
                            modalRef.componentInstance.observationitem =
                                observationitem.observation;
                        }
                    }
                }
                modalRef.result.then((data) => {

                    if (data.status == 'Yes') {
                        let observation: any = {
                            cucode: this.f.rawMaterialFormArray.value[index]
                                .cucode,
                            observation: data.observationitem,
                        };

                        if (this.observationitems.length == 0) {
                            this.observationitems.push(observation);
                        } else {
                            if (this.observationitems.find((x) => x.cucode == observation.cucode)) {
                                this.calloutService.showWarning(
                                    'Already observation is submitted !'
                                );
                            }
                            else {
                                this.observationitems.push(observation);
                            }
                        }
                    }


                });
            });
    }

    onAddbuttonClick3(event: any, index: any) {
        let childpart: any = [];
        let incoming = '';
        this.childPartManager
            .findOne(
                this.f.rawMaterialFormArray.value[index].cptcode
                    ? this.childPart001mbs.find(
                        (x) =>
                            x.cpartno ===
                            this.f.rawMaterialFormArray.value[index].cptcode
                    )?.slNo
                    : null
            )
            .subscribe((response) => {
                this.childPart001mb = deserialize<ChildPart001mb>(
                    ChildPart001mb,
                    response
                );
                for (
                    let i = 0;
                    i < this.childPart001mb.childpartspecification001wbs.length;
                    i++
                ) {
                    if (
                        this.childPart001mb.childpartspecification001wbs[i]
                            .cprtslno
                    ) {
                        childpart.push(
                            this.childPart001mb.childpartspecification001wbs[i]
                                .cprtslno
                        );
                    }
                }
                if (childpart.length > 0) {
                    incoming = 'Child Part';
                }
                const modalRef = this.modalService.open(
                    ObservationItemsComponent,
                    { windowClass: 'my-class' }
                );
                modalRef.componentInstance.Childcode = this.f
                    .rawMaterialFormArray.value[index].cptcode
                    ? this.childPart001mbs.find(
                        (x) =>
                            x.cpartno ===
                            this.f.rawMaterialFormArray.value[index].cptcode
                    )?.slNo
                    : null;
                modalRef.componentInstance.incoming = incoming;
                if (this.observationitems && this.observationitems.length > 0) {
                    for (let observationitem of this.observationitems) {
                        if (
                            observationitem.cptcode ==
                            this.f.rawMaterialFormArray.value[index].cptcode
                        ) {
                            modalRef.componentInstance.observationitem =
                                observationitem.observation;
                        }
                    }
                }
                modalRef.result.then((data) => {
                    if (data.status == 'Yes') {
                        let observation: any = {
                            cptcode:
                                this.f.rawMaterialFormArray.value[index]
                                    .cptcode,
                            observation: data.observationitem,
                        };

                        if (this.observationitems.length == 0) {
                            this.observationitems.push(observation);
                        } else {
                            if (this.observationitems.find((x) => x.cptcode == observation.cptcode)) {
                                this.calloutService.showWarning(
                                    'Already observation is submitted !'
                                );
                            }
                            else {
                                this.observationitems.push(observation);
                            }
                        }
                    }
                });
            });
    }

    onAddbuttonClick4(event: any, index: any) {
        let part: any = [];
        let incoming = '';
        this.partManager
            .findOne(
                this.f.rawMaterialFormArray.value[index].prtcode
                    ? this.part001mbs.find(
                        (x) =>
                            x.partno ===
                            this.f.rawMaterialFormArray.value[index].prtcode
                    )?.slNo
                    : null
            )
            .subscribe((response) => {
                this.part001mb = deserialize<Part001mb>(Part001mb, response);
                for (
                    let i = 0;
                    i < this.part001mb.partspecific001wbs.length;
                    i++
                ) {
                    if (this.part001mb.partspecific001wbs[i].partslno) {
                        part.push(
                            this.part001mb.partspecific001wbs[i].partslno
                        );
                    }
                }
                if (part.length > 0) {
                    incoming = 'Part';
                }
                const modalRef = this.modalService.open(
                    ObservationItemsComponent,
                    { windowClass: 'my-class' }
                );
                modalRef.componentInstance.Partcode = this.f
                    .rawMaterialFormArray.value[index].prtcode
                    ? this.part001mbs.find(
                        (x) =>
                            x.partno ===
                            this.f.rawMaterialFormArray.value[index].prtcode
                    )?.slNo
                    : null;
                modalRef.componentInstance.incoming = incoming;
                if (this.observationitems && this.observationitems.length > 0) {
                    for (let observationitem of this.observationitems) {
                        if (
                            observationitem.prtcode ==
                            this.f.rawMaterialFormArray.value[index].prtcode
                        ) {
                            modalRef.componentInstance.observationitem =
                                observationitem.observation;
                        }
                    }
                }
                modalRef.result.then((data) => {
                    if (data.status == 'Yes') {
                        let observation: any = {
                            prtcode:
                                this.f.rawMaterialFormArray.value[index]
                                    .prtcode,
                            observation: data.observationitem,
                        };

                        if (this.observationitems.length == 0) {
                            this.observationitems.push(observation);
                        } else {
                            if (this.observationitems.find((x) => x.prtcode == observation.prtcode)) {
                                this.calloutService.showWarning(
                                    'Already observation is submitted !'
                                );
                            }
                            else {
                                this.observationitems.push(observation);
                            }
                        }
                    }
                });
            });
    }

    addItem() {
        this.rawMaterialFormArray = this.f['rawMaterialFormArray'] as FormArray;
        this.rawMaterialFormArray.push(this.createItem());
    }

    removeItem(idx: number): void {
        (this.f['rawMaterialFormArray'] as FormArray).removeAt(idx);
    }

    onOkClick(event: any, rawMaterialForm: any) {
        let rawmaterialinspection001wbs: Rawmaterialinspection001wb[] = [];
        for (
            let i = 0;
            i <
            this.rawMaterialForm.controls.rawMaterialFormArray.controls.length;
            i++
        ) {
            let rawmaterialinspection001wb = new Rawmaterialinspection001wb();

            rawmaterialinspection001wb.rawmaterialslno = this.f
                .rawMaterialFormArray.value[i].rawmaterialslno
                ? this.f.rawMaterialFormArray.value[i].rawmaterialslno
                : null;
            rawmaterialinspection001wb.itemcode = this.f.rawMaterialFormArray
                .value[i].itemcode
                ? this.orderitem001mbs.find(
                    (x) =>
                        x.itemcode ===
                        this.f.rawMaterialFormArray.value[i].itemcode
                )?.slNo
                : null;
            rawmaterialinspection001wb.itemname = this.f.rawMaterialFormArray
                .value[i].itemname
                ? this.f.rawMaterialFormArray.value[i].itemname
                : '';
            rawmaterialinspection001wb.descrip = this.f.rawMaterialFormArray
                .value[i].descrip
                ? this.f.rawMaterialFormArray.value[i].descrip
                : '';

            rawmaterialinspection001wb.cucode = this.f.rawMaterialFormArray
                .value[i].cucode
                ? this.consumble001mbs.find(
                    (x) =>
                        x.consmno ===
                        this.f.rawMaterialFormArray.value[i].cucode
                )?.slNo
                : null;
            rawmaterialinspection001wb.cuname = this.f.rawMaterialFormArray
                .value[i].cuname
                ? this.f.rawMaterialFormArray.value[i].cuname
                : '';
            rawmaterialinspection001wb.cudescrip = this.f.rawMaterialFormArray
                .value[i].cudescrip
                ? this.f.rawMaterialFormArray.value[i].cudescrip
                : '';

            rawmaterialinspection001wb.cptcode = this.f.rawMaterialFormArray
                .value[i].cptcode
                ? this.childPart001mbs.find(
                    (x) =>
                        x.cpartno ===
                        this.f.rawMaterialFormArray.value[i].cptcode
                )?.slNo
                : null;
            rawmaterialinspection001wb.cptname = this.f.rawMaterialFormArray
                .value[i].cptname
                ? this.f.rawMaterialFormArray.value[i].cptname
                : '';
            rawmaterialinspection001wb.cptdescrip = this.f.rawMaterialFormArray
                .value[i].cptdescrip
                ? this.f.rawMaterialFormArray.value[i].cptdescrip
                : '';

            rawmaterialinspection001wb.prtcode = this.f.rawMaterialFormArray
                .value[i].prtcode
                ? this.part001mbs.find(
                    (x) =>
                        x.partno ===
                        this.f.rawMaterialFormArray.value[i].prtcode
                )?.slNo
                : null;
            rawmaterialinspection001wb.prtname = this.f.rawMaterialFormArray
                .value[i].prtname
                ? this.f.rawMaterialFormArray.value[i].prtname
                : '';
            rawmaterialinspection001wb.prtdescrip = this.f.rawMaterialFormArray
                .value[i].prtdescrip
                ? this.f.rawMaterialFormArray.value[i].prtdescrip
                : '';

            rawmaterialinspection001wb.receivedQty = this.f.rawMaterialFormArray
                .value[i].receivedQty
                ? this.f.rawMaterialFormArray.value[i].receivedQty
                : 0;
            rawmaterialinspection001wb.acceptedQty = this.f.rawMaterialFormArray
                .value[i].acceptedQty
                ? this.f.rawMaterialFormArray.value[i].acceptedQty
                : 0;
            rawmaterialinspection001wb.rejectedQty = this.f.rawMaterialFormArray
                .value[i].rejectedQty
                ? this.f.rawMaterialFormArray.value[i].rejectedQty
                : 0;
            rawmaterialinspection001wb.outstanding = this.f.rawMaterialFormArray
                .value[i].outstanding
                ? this.f.rawMaterialFormArray.value[i].outstanding
                : 0;

            rawmaterialinspection001wb.qunty = this.f.rawMaterialFormArray
                .value[i].qunty
                ? this.f.rawMaterialFormArray.value[i].qunty
                : null;
            rawmaterialinspection001wb.cptqunty = this.f.rawMaterialFormArray
                .value[i].cptqunty
                ? this.f.rawMaterialFormArray.value[i].cptqunty
                : null;
            rawmaterialinspection001wb.cuqunty = this.f.rawMaterialFormArray
                .value[i].cuqunty
                ? this.f.rawMaterialFormArray.value[i].cuqunty
                : null;
            rawmaterialinspection001wb.prtqunty = this.f.rawMaterialFormArray
                .value[i].prtqunty
                ? this.f.rawMaterialFormArray.value[i].prtqunty
                : null;

            rawmaterialinspection001wb.cureceivedQty = this.f
                .rawMaterialFormArray.value[i].cureceivedQty
                ? this.f.rawMaterialFormArray.value[i].cureceivedQty
                : 0;
            rawmaterialinspection001wb.cuacceptedQty = this.f
                .rawMaterialFormArray.value[i].cuacceptedQty
                ? this.f.rawMaterialFormArray.value[i].cuacceptedQty
                : 0;
            rawmaterialinspection001wb.curejectedQty = this.f
                .rawMaterialFormArray.value[i].curejectedQty
                ? this.f.rawMaterialFormArray.value[i].curejectedQty
                : 0;
            rawmaterialinspection001wb.cuoutstanding = this.f
                .rawMaterialFormArray.value[i].cuoutstanding
                ? this.f.rawMaterialFormArray.value[i].cuoutstanding
                : 0;

            rawmaterialinspection001wb.cptreceivedQty = this.f
                .rawMaterialFormArray.value[i].cptreceivedQty
                ? this.f.rawMaterialFormArray.value[i].cptreceivedQty
                : 0;
            rawmaterialinspection001wb.cptacceptedQty = this.f
                .rawMaterialFormArray.value[i].cptacceptedQty
                ? this.f.rawMaterialFormArray.value[i].cptacceptedQty
                : 0;
            rawmaterialinspection001wb.cptrejectedQty = this.f
                .rawMaterialFormArray.value[i].cptrejectedQty
                ? this.f.rawMaterialFormArray.value[i].cptrejectedQty
                : 0;
            rawmaterialinspection001wb.cptoutstanding = this.f
                .rawMaterialFormArray.value[i].cptoutstanding
                ? this.f.rawMaterialFormArray.value[i].cptoutstanding
                : 0;

            rawmaterialinspection001wb.prtreceivedQty = this.f
                .rawMaterialFormArray.value[i].prtreceivedQty
                ? this.f.rawMaterialFormArray.value[i].prtreceivedQty
                : 0;
            rawmaterialinspection001wb.prtacceptedQty = this.f
                .rawMaterialFormArray.value[i].prtacceptedQty
                ? this.f.rawMaterialFormArray.value[i].prtacceptedQty
                : 0;
            rawmaterialinspection001wb.prtrejectedQty = this.f
                .rawMaterialFormArray.value[i].prtrejectedQty
                ? this.f.rawMaterialFormArray.value[i].prtrejectedQty
                : 0;
            rawmaterialinspection001wb.prtoutstanding = this.f
                .rawMaterialFormArray.value[i].prtoutstanding
                ? this.f.rawMaterialFormArray.value[i].prtoutstanding
                : 0;

            let observationsitems: Observationsitems001wb[] = [];

            if (this.f.rawMaterialFormArray.value[i].itemcode) {
                for (let z = 0; z < this.observationitems.length; z++) {
                    for (
                        let x = 0;
                        x < this.observationitems[z].observation.length;
                        x++
                    ) {
                        if (
                            this.observationitems[z].observation[x]
                                .ordernumber ===
                            this.f.rawMaterialFormArray.value[i].itemcode
                        ) {
                            observationsitems.push(
                                this.observationitems[z].observation[x]
                            );
                        }
                    }
                }
            }

            if (this.f.rawMaterialFormArray.value[i].cucode) {
                for (let z = 0; z < this.observationitems.length; z++) {
                    for (
                        let x = 0;
                        x < this.observationitems[z].observation.length;
                        x++
                    ) {
                        if (
                            this.observationitems[z].observation[x]
                                .consumnumber ===
                            this.f.rawMaterialFormArray.value[i].cucode
                        ) {
                            observationsitems.push(
                                this.observationitems[z].observation[x]
                            );
                        }
                    }
                }
            }

            if (this.f.rawMaterialFormArray.value[i].cptcode) {
                for (let z = 0; z < this.observationitems.length; z++) {
                    for (
                        let x = 0;
                        x < this.observationitems[z].observation.length;
                        x++
                    ) {
                        if (
                            this.observationitems[z].observation[x]
                                .childnumber ===
                            this.f.rawMaterialFormArray.value[i].cptcode
                        ) {
                            observationsitems.push(
                                this.observationitems[z].observation[x]
                            );
                        }
                    }
                }
            }

            if (this.f.rawMaterialFormArray.value[i].prtcode) {
                for (let z = 0; z < this.observationitems.length; z++) {
                    for (
                        let x = 0;
                        x < this.observationitems[z].observation.length;
                        x++
                    ) {
                        if (
                            this.observationitems[z].observation[x]
                                .partnumber ===
                            this.f.rawMaterialFormArray.value[i].prtcode
                        ) {
                            observationsitems.push(
                                this.observationitems[z].observation[x]
                            );
                        }
                    }
                }
            }

            if (
                this.rawMaterialFormArray.controls.length ==
                this.observationitems.length
            ) {

                rawmaterialinspection001wb.observationsitems001wbs =
                    observationsitems;
            } else {

                this.calloutService.showWarning(
                    'All items with observations should be filled before submit'
                );
                return;
            }

            rawmaterialinspection001wbs.push(rawmaterialinspection001wb);

            this.activeModal.close({
                status: 'Yes',
                rawmaterialinspection: rawmaterialinspection001wbs,
            });
        }
    }

    onChange(event: any, index: any) {
        this.orderItemSettingManager
            .findOne(event.target.value)
            .subscribe((response) => {
                this.orderitem001mb = deserialize<Orderitem001mb>(
                    Orderitem001mb,
                    response
                );
                this.rawMaterialFormArray = this.f[
                    'rawMaterialFormArray'
                ] as FormArray;
                this.rawMaterialFormArray.controls[index].controls[
                    'itemname'
                ].setValue(this.orderitem001mb.itemname);
                this.rawMaterialFormArray.controls[index].controls[
                    'descrip'
                ].setValue(this.orderitem001mb.descrip);
            });

        this.childPartManager
            .findOne(event.target.value)
            .subscribe((response) => {
                this.childPart001mb = deserialize<ChildPart001mb>(
                    ChildPart001mb,
                    response
                );
                this.rawMaterialFormArray = this.f[
                    'rawMaterialFormArray'
                ] as FormArray;
                this.rawMaterialFormArray.controls[index].controls[
                    'cptname'
                ].setValue(this.childPart001mb.cpartname);
                this.rawMaterialFormArray.controls[index].controls[
                    'cptdescrip'
                ].setValue(this.childPart001mb.descrip);
            });

        this.consumbleManager
            .findOne(event.target.value)
            .subscribe((response) => {
                this.consumble001mb = deserialize<Consumble001mb>(
                    Consumble001mb,
                    response
                );
                this.rawMaterialFormArray = this.f[
                    'rawMaterialFormArray'
                ] as FormArray;
                this.rawMaterialFormArray.controls[index].controls[
                    'cuname'
                ].setValue(this.consumble001mb.consname);
                this.rawMaterialFormArray.controls[index].controls[
                    'cudescrip'
                ].setValue(this.consumble001mb.descrip);
            });

        this.partManager.findOne(event.target.value).subscribe((response) => {
            this.part001mb = deserialize<Part001mb>(Part001mb, response);
            this.rawMaterialFormArray = this.f[
                'rawMaterialFormArray'
            ] as FormArray;
            this.rawMaterialFormArray.controls[index].controls[
                'prtname'
            ].setValue(this.part001mb.partname);
            this.rawMaterialFormArray.controls[index].controls[
                'prtdescrip'
            ].setValue(this.part001mb.descrip);
        });
    }

    onCancelClick() {
        this.activeModal.close('No');
    }
}
