import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GridOptions } from "ag-grid-community";
import { deserialize } from "serializer.ts/Serializer";
import { DeleteDialogComponent } from "src/app/shared/delete-dialog/delete-dialog.component";
import { IconRendererComponent } from "src/app/shared/services/renderercomponent/icon-renderer-component";
import { ProdmasterManager } from "src/app/shared/services/restcontroller/bizservice/ProductMaster.service";
import { AuthManager } from "src/app/shared/services/restcontroller/bizservice/auth-manager.service";
import { ToastService } from "src/app/shared/services/restcontroller/callout/toast.service";
import { Login001mb } from "src/app/shared/services/restcontroller/entities/Login001mb";
import { Prodmaster001mb } from "src/app/shared/services/restcontroller/entities/Prodmaster001mb";

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {

  prodmasterForm: FormGroup | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  slNo: number;
  unitslno: number;
  prodId: string;
  prodName: string;
  prodPrice: string;
  qty: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;

  prodmaster001mb: Prodmaster001mb[] | any;
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
    public dialog: MatDialog
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.user = this.authManager.getcurrentUser;
    this.loadData();
    this.createDataGrid001();
    this.prodmasterForm = this.formBuilder.group({
      prodId: ['', Validators.required],
      prodName: ['', Validators.required],
      prodPrice: ['', Validators.required],
      qty: ['1', Validators.required],
    });
  }

  loadData() {
    this.prodmasterManager.allprodmaster(this.user.unitslno).subscribe(response => {
      this.prodmaster001mb = deserialize<Prodmaster001mb[]>(Prodmaster001mb, response);
      if (this.prodmaster001mb.length > 0) {
        this.gridOptions?.api?.setRowData(this.prodmaster001mb);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }

    });

    this.prodmasterManager.getCount().subscribe(response => {
      let date = this.datepipe.transform(new Date, 'MM-yy')
      this.count = response[0].row == 0 ? 1 : parseInt(response[0].row) + 1;
      this.prodmasterForm.patchValue({
        prodId: String(`prod/`) + String(this.count).padStart(4, '0')
      });
    });
    
  }

  get f() { return this.prodmasterForm.controls }
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
        headerName: 'Product Id',
        field: 'prodId',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
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
   
    this.prodmasterForm.patchValue({
      'prodId':  params.data.prodId,
      'prodName': params.data.prodName,
      'product_qty': params.data.qty,
      'prodPrice': params.data.prodPrice
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
        this.prodmasterManager.prodmasterdelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.prodmaster001mb.length; i++) {
            if (this.prodmaster001mb[i].slNo == params.data.slNo) {
              this.prodmaster001mb?.splice(i, 1);
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


  onProdmaster(event:any,prodmasterForm:any){
    let prodmaster001mb = new Prodmaster001mb();
    prodmaster001mb.prodId = this.f.prodId.value;
    prodmaster001mb.prodName = this.f.prodName.value;
    prodmaster001mb.prodPrice = this.f.prodPrice.value;
    prodmaster001mb.qty = this.f.qty.value;

    if (this.slNo) {
      prodmaster001mb.slNo = this.slNo;
      prodmaster001mb.unitslno = this.unitslno;
      prodmaster001mb.insertUser = this.insertUser;
      prodmaster001mb.insertDatetime = this.insertDatetime;
      prodmaster001mb.updatedUser = this.authManager.getcurrentUser.username;
      prodmaster001mb.updatedDatetime = new Date();
      this.prodmasterManager.prodmasterupdate(prodmaster001mb).subscribe((response) => {
        this.toast.updateSnackBar('Patientop Updated Successfully');
        this.router.navigate(['./app-dash-board/app-home-consultation/app-home-consultation/app-list-op-patient']);
        this.loadData();
        this.slNo = null;
      });
    } else {
      prodmaster001mb.unitslno = this.user.unitslno;
      prodmaster001mb.insertUser = this.authManager.getcurrentUser.username;
      prodmaster001mb.insertDatetime = new Date();
      this.prodmasterManager.prodmastersave(prodmaster001mb).subscribe((response) => {
        this.ngOnInit()
        this.toast.saveSnackBar('Patientop Saved Successfully');
       
      })
    }
  }


}