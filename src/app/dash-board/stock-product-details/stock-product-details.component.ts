import { DatePipe } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GridOptions } from "ag-grid-community";
import { deserialize } from "serializer.ts/Serializer";
import { DeleteDialogComponent } from "src/app/shared/delete-dialog/delete-dialog.component";
import { IconRendererComponent } from "src/app/shared/services/renderercomponent/icon-renderer-component";
import { ProdbuyManager } from "src/app/shared/services/restcontroller/bizservice/Prodbuy.service";
import { ProdmasterManager } from "src/app/shared/services/restcontroller/bizservice/ProductMaster.service";
import { AuthManager } from "src/app/shared/services/restcontroller/bizservice/auth-manager.service";
import { ToastService } from "src/app/shared/services/restcontroller/callout/toast.service";
import { Login001mb } from "src/app/shared/services/restcontroller/entities/Login001mb";
import { Prodbuy001mb } from "src/app/shared/services/restcontroller/entities/Prodbuy001mb";
import { Prodmaster001mb } from "src/app/shared/services/restcontroller/entities/Prodmaster001mb";

@Component({
  selector: 'app-stock-product-details',
  templateUrl: './stock-product-details.component.html',
  styleUrls: ['./stock-product-details.component.scss']
})
export class StockProductDetailsComponent implements OnInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  filteredOptions: string[];

  buyingProdctForm: FormGroup | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;

  slNo: number;
  unitslno: number;
  date: Date;
  total: string;
  prodName: string;
  prodPrice: string;
  qty: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  prodmaster001mb: Prodmaster001mb[] | any;
  prodbuy001mb: Prodbuy001mb[] | any;
  prodmaster001mbs: Prodmaster001mb[] | any;
  user?: Login001mb | any;
  count: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private datepipe: DatePipe,
    private prodmasterManager: ProdmasterManager,
    private modalService: NgbModal,
    private prodbuyManager: ProdbuyManager,
    public dialog: MatDialog
  ) {
    // this.filteredOptions = this.prodmaster001mb.slice();
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.buyingProdctForm = this.formBuilder.group({
      date: ['', Validators.required],
      product_Name: ['', Validators.required],
      product_price: ['', Validators.required],
      product_qty: ['', Validators.required],
      total_amount: ['0', Validators.required],
    });

    this.prodmasterManager.allprodmaster(this.user.unitslno).subscribe(response => {
      this.prodmaster001mb = deserialize<Prodmaster001mb[]>(Prodmaster001mb, response);
    });

    this.prodmasterManager.allprodmaster(this.user.unitslno).subscribe(response => {
      this.prodmaster001mbs = deserialize<Prodmaster001mb[]>(Prodmaster001mb, response);
    });
    this.loadData();
    this.createDataGrid001();
  }
  get f() { return this.buyingProdctForm.controls }

  loadData() {
    this.prodbuyManager.allProdbuy(this.user.unitslno).subscribe(response => {
      this.prodbuy001mb = deserialize<Prodbuy001mb[]>(Prodbuy001mb, response);
      if (this.prodbuy001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.prodbuy001mb);
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

    let object = this.prodmaster001mbs.find((x) => x.prodName == event.option.value)
    this.buyingProdctForm.patchValue({
      'product_price': object?.prodPrice
    })

  }

  onBlurMethod(event: any) {
    let total: any = parseInt(event.target.value) * parseInt(this.f.product_price.value)
    console.log("event-->>", total === 'NaN');
    this.buyingProdctForm.patchValue({
      'total_amount': total == 0 ? 0 : total
    })
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
        headerName: 'Product Name',
        field: 'prodName',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setDoctorNo.bind(this)
      },
      {
        headerName: 'Product Price',
        field: 'prodPrice',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setPatientNo.bind(this)
      },
      {
        headerName: 'Qty',
        field: 'qty',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Total Amount',
        field: 'total',
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
    this.buyingProdctForm.patchValue({
      'product_Name':  params.data.prodName,
      'product_price': params.data.prodPrice,
      'product_qty': params.data.qty,
      'total_amount': params.data.total,
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
      console.log("result", result);

      if (result == "confirm") {
        this.prodbuyManager.Prodbuydelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.prodbuy001mb.length; i++) {
            if (this.prodbuy001mb[i].slNo == params.data.slNo) {
              this.prodbuy001mb?.splice(i, 1);
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


  onBuyingProdct(event:any,prodmasterForm:any){
    let prodbuy001mb = new Prodbuy001mb();
    prodbuy001mb.date = this.f.date.value;
    prodbuy001mb.prodName = this.f.product_Name.value;
    prodbuy001mb.prodPrice = this.f.product_price.value;
    prodbuy001mb.qty = this.f.product_qty.value;
    prodbuy001mb.total = this.f.total_amount.value;

    if (this.slNo) {
      prodbuy001mb.slNo = this.slNo;
      prodbuy001mb.unitslno = this.unitslno;
      prodbuy001mb.insertUser = this.insertUser;
      prodbuy001mb.insertDatetime = this.insertDatetime;
      prodbuy001mb.updatedUser = this.authManager.getcurrentUser.username;
      prodbuy001mb.updatedDatetime = new Date();
      this.prodbuyManager.Prodbuyupdate(prodbuy001mb).subscribe((response) => {
        this.toast.updateSnackBar('Patientop Updated Successfully');
        this.router.navigate(['./app-dash-board/app-home-consultation/app-home-consultation/app-list-op-patient']);
        this.loadData();
        this.slNo = null;
      });
    } else {
      prodbuy001mb.unitslno = this.user.unitslno;
      prodbuy001mb.insertUser = this.authManager.getcurrentUser.username;
      prodbuy001mb.insertDatetime = new Date();
      this.prodbuyManager.Prodbuysave(prodbuy001mb).subscribe((response) => {
        this.ngOnInit()
        this.toast.saveSnackBar('Patientop Saved Successfully');
       
      })
    }
  }

}