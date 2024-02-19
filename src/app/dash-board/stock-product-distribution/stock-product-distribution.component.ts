import { DatePipe } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { GridOptions } from "ag-grid-community";
import { deserialize } from "serializer.ts/Serializer";
import { DeleteDialogComponent } from "src/app/shared/delete-dialog/delete-dialog.component";
import { IconRendererComponent } from "src/app/shared/services/renderercomponent/icon-renderer-component";
import { DistributionManager } from "src/app/shared/services/restcontroller/bizservice/Distribution.service";
import { ProdbuyManager } from "src/app/shared/services/restcontroller/bizservice/Prodbuy.service";
import { ProdmasterManager } from "src/app/shared/services/restcontroller/bizservice/ProductMaster.service";
import { AuthManager } from "src/app/shared/services/restcontroller/bizservice/auth-manager.service";
import { UnitManagerManager } from "src/app/shared/services/restcontroller/bizservice/unitmaster.service";
import { ToastService } from "src/app/shared/services/restcontroller/callout/toast.service";
import { Distribution001mb } from "src/app/shared/services/restcontroller/entities/Distribution001mb";
import { Login001mb } from "src/app/shared/services/restcontroller/entities/Login001mb";
import { Prodbuy001mb } from "src/app/shared/services/restcontroller/entities/Prodbuy001mb";
import { Prodmaster001mb } from "src/app/shared/services/restcontroller/entities/Prodmaster001mb";
import { UnitMaster001mb } from "src/app/shared/services/restcontroller/entities/unitmaster001mb";

@Component({
  selector: 'app-stock-product-distribution',
  templateUrl: './stock-product-distribution.component.html',
  styleUrls: ['./stock-product-distribution.component.scss']
})
export class StockProductDistributionComponent implements OnInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  distributionForm: FormGroup | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;

  slNo: number;
  unitslno: number;
  prodslno: number;
  clinicslno: number;
  date: Date;
  qty: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  prodmaster001mb: Prodmaster001mb[] | any;
  prodmaster001mbs: Prodmaster001mb[] | any;
  user?: Login001mb | any;
  count: number = 0;
  unitmasters: UnitMaster001mb[] = [];
  unitmastersFilter: UnitMaster001mb[] = [];
  clinic_name: any
  distribution001mb: Distribution001mb[] = [];
  productdetails: any;
  prodbuy001mb: Prodbuy001mb[] | any;
  qtydetails: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private unitManagerManager: UnitManagerManager,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private datepipe: DatePipe,
    private prodmasterManager: ProdmasterManager,
    private distributionManager: DistributionManager,
    public dialog: MatDialog,
    private prodbuyManager: ProdbuyManager,

  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.distributionForm = this.formBuilder.group({
      date: ['', Validators.required],
      product_Name: ['', Validators.required],
      per_qty: ['', Validators.required],
      Clinic_no: ['', Validators.required],
      clinic_name: [null],
    })
    this.unitManagerManager.allunitmanager().subscribe((response) => {
      this.unitmasters = deserialize<UnitMaster001mb[]>(UnitMaster001mb, response);
      for (let i = 0; i < this.unitmasters.length; i++) {
        if (this.user.unitslno !== this.unitmasters[i].slNo) {
          this.unitmastersFilter.push(this.unitmasters[i])
        }
      }
      this.clinic_name = this.unitmasters.find((x: any) => x?.slNo === this.user?.unitslno);
      this.distributionForm.patchValue({
        'clinic_name': this.clinic_name?.unitName
      })

    });
    this.prodmasterManager.allprodmaster(this.user.unitslno).subscribe(response => {
      this.prodmaster001mb = deserialize<Prodmaster001mb[]>(Prodmaster001mb, response);

    });

    this.prodbuyManager.allProdbuy(this.user.unitslno).subscribe(response => {
      this.prodbuy001mb = deserialize<Prodbuy001mb[]>(Prodbuy001mb, response);
    });
    this.loadData();
    this.createDataGrid001();
  }
  get f() { return this.distributionForm.controls }

  loadData() {
    this.distributionManager.allDistribution(this.user.unitslno).subscribe(response => {
      this.distribution001mb = deserialize<Distribution001mb[]>(Distribution001mb, response);
      if (this.distribution001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.distribution001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }

    });

  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.prodmaster001mb = this.prodmaster001mb.filter(o => o.prodName.toLowerCase().includes(filterValue));
  }

  onSelectionChange(event: any) {

    this.productdetails = this.prodmaster001mb.find((x: any) => x.prodName == event.option.value)
    this.distributionForm.patchValue({
      'product_Name': this.productdetails?.prodName
    })

  }

  onBlurMethod(event: any) {
    let total: any = parseInt(event.target.value) * parseInt(this.f.product_price.value);
    this.distributionForm.patchValue({
      'total_amount': total == 0 ? 0 : total
    })
  }

  onQtyChange(event: any) {
    let item = this.prodbuy001mb.find((x: any) => x.proSlno == this.productdetails?.slNo)
    let qtys = String(event?.target?.value).padStart(2, '0')
    if (item?.qty >= qtys) {
      this.qtydetails = false;
    } else {
      this.qtydetails = true;
    }
  }

  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
        headerName: 'slNo',
        field: 'slNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Date',
        field: 'date',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.date ? this.datepipe.transform(params.data.date, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Clinic Name',
        field: 'unitslno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.unitslno ? this.unitmasters.find((x: any) => x?.slNo === params?.data?.unitslno)?.unitName : '';
        }
        // valueGetter: this.setPatientNo.bind(this)
      },
      {
        headerName: 'Buying Clinic',
        field: 'clinicslno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.clinicslno ? this.unitmasters.find((x: any) => x?.slNo === params?.data?.clinicslno)?.unitName : '';
        }
      },
      {
        headerName: 'Prodcut Name',
        field: 'prodslno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.prodslno ? this.prodmaster001mb.find((x: any) => x?.slNo === params?.data?.prodslno)?.prodName : '';
        }
      },
      {
        headerName: 'Given qty',
        field: 'qty',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 85,
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: 'Edit'
        },
      },

      {
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 85,
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },

    ];
  }


  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitslno = params.data.unitslno;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    let getdate = this.datepipe.transform(params.data.date, "yyyy-MM-dd");
    this.productdetails = this.prodmaster001mb.find((x: any) => x.slNo == params.data.prodslno)
    this.clinic_name = this.unitmasters.find((x: any) => x?.slNo === this.user?.unitslno);
    this.distributionForm.patchValue({
      'product_Name': this.productdetails?.prodName,
      'per_qty': params.data.qty,
      'Clinic_no': params.data.clinicslno,
      'clinic_name': this.clinic_name?.unitName,
      'date': new Date(getdate).toISOString().split('T')[0]
    });
  }

  onDeleteButtonClick(params: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: { title: 'Delete', content: 'Do you want to delete?' },
      panelClass: 'custom-dialog-panel', // Add this line to apply the custom styles
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "confirm") {
        this.distributionManager.Distributiondelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.distribution001mb.length; i++) {
            if (this.distribution001mb[i].slNo == params.data.slNo) {
              this.distribution001mb?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          // this.calloutService.showSuccess("Purchase Request Removed Successfully");
        });
      }

    });

  }

  onDistribution(event: any, prodmasterForm: any) {
    let distribution001mb = new Distribution001mb();
    distribution001mb.date = this.f.date.value;
    distribution001mb.prodslno = this.productdetails?.slNo;
    distribution001mb.qty = this.f.per_qty.value;
    distribution001mb.clinicslno = this.f.Clinic_no.value;

    if (this.slNo) {
      distribution001mb.slNo = this.slNo;
      distribution001mb.unitslno = this.unitslno;
      distribution001mb.insertUser = this.insertUser;
      distribution001mb.insertDatetime = this.insertDatetime;
      distribution001mb.updatedUser = this.authManager.getcurrentUser.username;
      distribution001mb.updatedDatetime = new Date();
      this.distributionManager.Distributionupdate(distribution001mb).subscribe((response) => {
        this.toast.updateSnackBar('Patientop Updated Successfully');
        this.router.navigate(['./app-dash-board/app-home-consultation/app-home-consultation/app-list-op-patient']);
        this.loadData();
        this.slNo = null;
      });
    } else {
      distribution001mb.unitslno = this.user.unitslno;
      distribution001mb.insertUser = this.authManager.getcurrentUser.username;
      distribution001mb.insertDatetime = new Date();
      this.distributionManager.Distributionsave(distribution001mb).subscribe((response) => {
        this.ngOnInit()
        this.toast.saveSnackBar('Patientop Saved Successfully');

      })
    }
  }
}