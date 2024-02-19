import { DatePipe } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { GridOptions } from "ag-grid-community";
import { deserialize } from "serializer.ts/Serializer";
import { DeleteDialogComponent } from "src/app/shared/delete-dialog/delete-dialog.component";
import { IconRendererComponent } from "src/app/shared/services/renderercomponent/icon-renderer-component";
import { ProdbuyManager } from "src/app/shared/services/restcontroller/bizservice/Prodbuy.service";
import { ProdmasterManager } from "src/app/shared/services/restcontroller/bizservice/ProductMaster.service";
import { AuthManager } from "src/app/shared/services/restcontroller/bizservice/auth-manager.service";
import { CustomerManager } from "src/app/shared/services/restcontroller/bizservice/customer.service";
import { ToastService } from "src/app/shared/services/restcontroller/callout/toast.service";
import { Customer001mb } from "src/app/shared/services/restcontroller/entities/Customer001mb";
import { Login001mb } from "src/app/shared/services/restcontroller/entities/Login001mb";
import { Prodbuy001mb } from "src/app/shared/services/restcontroller/entities/Prodbuy001mb";
import { Prodmaster001mb } from "src/app/shared/services/restcontroller/entities/Prodmaster001mb";

@Component({
  selector: 'app-stock-product-sales',
  templateUrl: './stock-product-sales.component.html',
  styleUrls: ['./stock-product-sales.component.scss']
})
export class StockProductSalesComponent implements OnInit {

  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  CustomerForm: FormGroup | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;

  slNo: number;
  unitslno: number;
  prodslno: number;
  customerName: string;
  customerMobile: string;
  date: Date;
  qty: string;
  retailCost: string;
  customerPrice: string;
  profit: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;

  prodmaster001mb: Prodmaster001mb[] | any;
  prodmaster001mbs: Prodmaster001mb[] | any;
  user?: Login001mb | any;
  customer001mb: Customer001mb[] = []
  productdetails: any;
  qtydetails: boolean = false;
  prodbuy001mb: Prodbuy001mb[] | any;


  constructor(
    private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private datepipe: DatePipe,
    private prodmasterManager: ProdmasterManager,
    private customerManager: CustomerManager,
    public dialog: MatDialog,
    private prodbuyManager: ProdbuyManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.CustomerForm = this.formBuilder.group({
      date: ['', Validators.required],
      customer_name: ['', Validators.required],
      customer_mobile: ['', Validators.required],
      product_Name: ['', Validators.required],
      qty: ['', Validators.required],
      retail_cost: ['', Validators.required],
      customer_price: ['', Validators.required],
      profit: ['', Validators.required],
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

  get f() { return this.CustomerForm.controls }


  loadData() {
    this.customerManager.allcustomer(this.user.unitslno).subscribe(response => {
      this.customer001mb = deserialize<Customer001mb[]>(Customer001mb, response);
      if (this.customer001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.customer001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }

    });
    this.createDataGrid001();
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.prodmaster001mb = this.prodmaster001mb.filter(o => o.prodName.toLowerCase().includes(filterValue));
  }

  onSelectionChange(event: any) {

    this.productdetails = this.prodmaster001mb.find((x) => x.prodName == event.option.value)
    this.CustomerForm.patchValue({
      'qty': this.productdetails?.qty,
      'retail_cost': this.productdetails?.prodPrice
    })

  }

  onBlurMethod(event: any) {
    
    let item = this.prodmaster001mb.find((x) => x.prodName == this.f.product_Name.value)
    let valeu = this.productdetails?.prodPrice ? this.productdetails?.prodPrice : item?.prodPrice;

    let total: any = parseInt(event.target.value) * parseInt(valeu)
    let quality = this.prodbuy001mb.find((x: any) => x.proSlno == item?.slNo)
   
    let qtys = String(event?.target?.value).padStart(2, '0')
    if (parseInt(quality?.qty) >= parseInt(qtys)) {
      this.qtydetails = false;
    } else {
      this.qtydetails = true;
    }
    this.CustomerForm.patchValue({
      'retail_cost': total,
      'profit': parseInt(this.f.customer_price.value) - parseInt(total)
    })
  }
  onProfitMethod(event: any) {
    let total: any = parseInt(event.target.value) - parseInt(this.f.retail_cost.value)
    this.CustomerForm.patchValue({
      'profit': total
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
        headerName: 'Customer Name',
        field: 'customerName',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: (params: any) => {
        //   return params.data.unitslno ? this.unitmasters.find((x: any) => x?.slNo === params?.data?.unitslno)?.unitName : '';
        // }
        // valueGetter: this.setPatientNo.bind(this)
      },
      {
        headerName: 'Customer Mobile',
        field: 'customerMobile',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: (params: any) => {
        //   return params.data.clinicslno ? this.unitmasters.find((x: any) => x?.slNo === params?.data?.clinicslno)?.unitName : '';
        // }
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
        headerName: 'qty',
        field: 'qty',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Retail Price',
        field: 'retailCost',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Customer Price',
        field: 'customerPrice',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Profit',
        field: 'profit',
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
    this.productdetails = this.prodmaster001mb.find((x) => x.slNo == params.data.prodslno)
    this.CustomerForm.patchValue({
      'customer_name': params.data.customerName,
      'customer_mobile': params.data.customerMobile,
      'product_Name': params.data.prodslno ? this.prodmaster001mb.find((x: any) => x?.slNo === params?.data?.prodslno)?.prodName : '',
      'travel_durection': params.data.travelDurection,
      'qty': params.data.qty,
      'retail_cost': params.data.retailCost,
      'customer_price': params.data.customerPrice,
      'profit': params.data.profit,
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
        this.customerManager.deleteCustomer(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.customer001mb.length; i++) {
            if (this.customer001mb[i].slNo == params.data.slNo) {
              this.customer001mb?.splice(i, 1);
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

  onCustomer(event: any, prodmasterForm: any) {
    let customer001mb = new Customer001mb();
    customer001mb.date = this.f.date.value;
    customer001mb.customerName = this.f.customer_name.value;
    customer001mb.customerMobile = this.f.customer_mobile.value;
    customer001mb.prodslno = this.f.product_Name.value ? this.productdetails?.slNo : '';
    customer001mb.qty = this.f.qty.value;
    customer001mb.retailCost = this.f.retail_cost.value;
    customer001mb.customerPrice = this.f.customer_price.value;
    customer001mb.profit = this.f.profit.value;

    if (this.slNo) {
      customer001mb.slNo = this.slNo;
      customer001mb.unitslno = this.unitslno;
      customer001mb.insertUser = this.insertUser;
      customer001mb.insertDatetime = this.insertDatetime;
      customer001mb.updatedUser = this.authManager.getcurrentUser.username;
      customer001mb.updatedDatetime = new Date();
      this.customerManager.updateCustomer(customer001mb).subscribe((response) => {
        this.toast.updateSnackBar('Product Salase Updated Successfully');
        this.loadData();
        this.slNo = null;
      });
    } else {
      customer001mb.unitslno = this.user.unitslno;
      customer001mb.insertUser = this.authManager.getcurrentUser.username;
      customer001mb.insertDatetime = new Date();
      this.customerManager.saveCustomer(customer001mb).subscribe((response) => {
        this.loadData();
        this.CustomerForm.reset();
        this.toast.saveSnackBar('Product Salase Saved Successfully');

      })
    }
  }

}