import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { SpecificationManager } from '../services/restcontroller/bizservice/Specification.service';
import { Specification001wb } from '../services/restcontroller/entities/Specification001wb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';
import { deserialize } from 'serializer.ts/Serializer';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})
export class SpecificationComponent implements OnInit {

  @Input() specifications: any;
  specificationForm: FormGroup | any;
  specificationFormArray: FormArray | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  submitted = false;


  slNo: number | any;
  parameter: string = "";
  specification: string = "";
  inspecmethod: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;

  specification001wbs: Specification001wb[] = [];
  specification001wb?: Specification001wb;
 user?:Login001mb|any;
 unitslno?:number;
 
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private specificationManager: SpecificationManager,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.specificationForm = this.formBuilder.group({
      specificationFormArray: this.formBuilder.array([this.createItem()])
    });

    // this.specificationManager.specificationall().subscribe(response => {
    //   this.specification001wbs = deserialize<Specification001wb[]>(Specification001wb, response);
    // });

    this.loadData();

  }

  loadData() {
    this.specificationManager.specificationall(this.user.unitslno).subscribe(response => {
      console.log("response",response);
      
      this.specification001wbs = deserialize<Specification001wb[]>(Specification001wb, response);
      if (this.specification001wbs.length > 0) {
        this.gridOptions?.api?.setRowData(this.specification001wbs);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.specificationForm.controls;}
  get o() { return this.f.specificationFormArray as FormArray; }

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
      parameter: ['', Validators.required],
      specification: ['', Validators.required],
      inspecmethod: ['', Validators.required],

      specificationFormArray: new FormArray([]),
    });
  }

  addItem() {
    this.specificationFormArray = this.f['specificationFormArray'] as FormArray;
    this.specificationFormArray.push(this.createItem());
  }

  removeItem(idx: number): void {
    (this.f['specificationFormArray'] as FormArray).removeAt(idx);
  }

 
  
  onOkClick(event:any, specificationForm:any) {
    let specification001wbs: Specification001wb[] = [];
    for (let i = 0; i < this.specificationForm.controls.specificationFormArray.controls.length; i++) {
      let specification001wb = new Specification001wb();
      specification001wb.parameter = this.f.specificationFormArray.value[i].parameter ? this.f.specificationFormArray.value[i].parameter : "";
      specification001wb.specification = this.f.specificationFormArray.value[i].specification ? this.f.specificationFormArray.value[i].specification : "";
      specification001wb.inspecmethod = this.f.specificationFormArray.value[i].inspecmethod ? this.f.specificationFormArray.value[i].inspecmethod : "";
      specification001wbs.push(specification001wb);
     
      this.activeModal.close({
        status: "Yes",
        specifications: specification001wbs,
      });
    }
   
  }
   
  

  onCancelClick() {
    this.activeModal.close('No');
  }
}
