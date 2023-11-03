import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { environment } from 'src/environments/environment';
import { AuditComponent } from '../audit/audit.component';
import { ConformationComponent } from '../conformation/conformation.component';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { PaymentManager } from '../services/restcontroller/bizservice/Payment.service';
import { PurchaseInvoicePayManager } from '../services/restcontroller/bizservice/PurchaseInvoicePay.service';
import { PurchaseInvoicePayItemManager } from '../services/restcontroller/bizservice/PurchaseInvoicesItems.service';
import { PurchaseorderManager } from '../services/restcontroller/bizservice/Purchaseorder.service';
import { SalesOrderManager } from '../services/restcontroller/bizservice/Salesorder.service';
import { SupplierRegManager } from '../services/restcontroller/bizservice/supplierReg.service';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { Payment001wb } from '../services/restcontroller/entities/Payment001wb';
import { Purchaseinvoicepay001wb } from '../services/restcontroller/entities/purchaseinvoicepay001wb';
import { PurchaseItem001wb } from '../services/restcontroller/entities/purchaseItesm001wb';
import { Purchaseorder001wb } from '../services/restcontroller/entities/Purchaseorder001wb';
import { Salesorder001wb } from '../services/restcontroller/entities/Salesorder001wb';
import { Supplierquotation001wb } from '../services/restcontroller/entities/supplierquotation001wb ';
import { Supplierregistration001mb } from '../services/restcontroller/entities/supplierRegistration001mb';
import { CalloutService } from '../services/services/callout.service';

@Component({
  selector: 'app-payment-popup',
  templateUrl: './payment-popup.component.html',
  styleUrls: ['./payment-popup.component.css']
})
export class PaymentPopupComponent implements OnInit {
  @Input() supreg001mb: Supplierregistration001mb | any;
  @Input() purinvoice001mb: Purchaseinvoicepay001wb | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  paymentForm: FormGroup | any;
  submitted = false;
  slNo: number | any;
  date: Date | any;
  tAmount: number | any;
  paidAmount: number | any;
  outAmount: number | any;
  modeofPay: string = "";
  chequeNo: string = "";
  payIdno: string = "";
  status: string = "";
  dueDate: Date | any;

  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  minDate = new Date();
  maxDate = new Date();
  sales: Salesorder001wb[] = [];
  payment: Payment001wb[] = [];
  orders: Purchaseorder001wb[] = [];
  user?: Login001mb | any;
  unitslno: number | any;
  qrimage: any;
  supplierquotations: Supplierquotation001wb[] = [];
  amount: number | any;
  purchaseinvoicepay: Purchaseinvoicepay001wb[] = [];
  purchaseItem001wbs: PurchaseItem001wb[] = [];
  purinvoiceitems: PurchaseItem001wb[] = [];
  totalAMT: number | any;
  supplierReg: Supplierregistration001mb[] = [];
  constructor(private formBuilder: FormBuilder,
    private supplierRegManager: SupplierRegManager,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private datepipe: DatePipe,
    private salesOrderManager: SalesOrderManager,
    private paymentManager: PaymentManager,
    public activeModal: NgbActiveModal,
    private purchaseorderManager: PurchaseorderManager,
    private purchaseInvoicePayItemManager: PurchaseInvoicePayItemManager,
    private purchaseInvoicePayManager: PurchaseInvoicePayManager,) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.qrimage=`${environment.baseUrl}`+"/testandreportstudio/api/supplierReg/findimg/"+this.supreg001mb.originalfilename;
 
    this.user = this.authManager.getcurrentUser;

    this.maxDate.setDate(this.maxDate.getDate() + 90)

    this.createDataGrid001();

    this.loadData();

    this.paymentForm = this.formBuilder.group({
      date: [this.datepipe.transform(new Date(), 'dd-MM-yyyy')],
      tAmount: ['',],
      paidAmount: ['', Validators.required],
      outAmount: [''],
      modeofPay: ['', Validators.required],
      chequeNo: [''],
      payIdno: [''],
      status: [''],
      dueDate: ['',],

      amount: [''],
    })

    this.salesOrderManager.allsale(this.user.unitslno).subscribe(response => {
      this.sales = deserialize<Salesorder001wb[]>(Salesorder001wb, response);
    });

    this.purchaseorderManager.allpurchaseorder(this.user.unitslno).subscribe(response => {
      this.orders = deserialize<Purchaseorder001wb[]>(Purchaseorder001wb, response);
    });

    this.purchaseInvoicePayItemManager.allPurchaseItem(this.user.unitslno).subscribe(response => {
      this.purchaseItem001wbs = deserialize<PurchaseItem001wb[]>(PurchaseItem001wb, response);
      for (let i = 0; i < this.purchaseItem001wbs.length; i++) {
        if (this.purchaseItem001wbs[i].purchaseslno == this.purinvoice001mb.slNo) {
          this.purinvoiceitems.push(this.purchaseItem001wbs[i])
        }
      }
      this.totalAMT = 0;
      for (let i = 0; i < this.purinvoiceitems.length; i++) {
        if (this.purinvoiceitems[i].totalamount) {
          this.totalAMT += this.purinvoiceitems[i].totalamount;
        }
        if (this.purinvoiceitems[i].cutotalamount) {
          this.totalAMT += this.purinvoiceitems[i].cutotalamount;
        }
        if (this.purinvoiceitems[i].cpttotalamount) {
          this.totalAMT += this.purinvoiceitems[i].cpttotalamount;
        }
        if (this.purinvoiceitems[i].cpttotalamount) {
          this.totalAMT += this.purinvoiceitems[i].cpttotalamount;
        }
        this.paymentForm.controls['tAmount'].setValue(this.totalAMT);
      }

    });



  }

  loadData() {
    this.paymentManager.allpayment(this.user.unitslno).subscribe(response => {
      this.payment = deserialize<Payment001wb[]>(Payment001wb, response);
      if (this.payment.length > 0) {
        this.gridOptions?.api?.setRowData(this.payment);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.paymentForm.controls }

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
        headerName: 'Sl No',
        field: 'slNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Payment Date',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.dueDate ? this.datepipe.transform(params.data.dueDate, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Total Amount',
        field: 'tAmount',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Paid Amount',
        field: 'paidAmount',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Outstanding Amount',
        field: 'outAmount',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Mode of Pay',
        field: 'modeofPay',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Cheque No',
        field: 'chequeNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Payment Reference ID No',
        field: 'payIdno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Next Due Date',
        field: 'dueDate',
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
        width: 80,
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
      {
        headerName: 'Audit',
        cellRenderer: 'iconRenderer',
        width: 80,
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onAuditButtonClick.bind(this),
          label: 'Audit'
        },
      },

    ];
  }



  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Payment";
    modalRef.componentInstance.details = params.data
  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.unitslno = params.data.unitslno;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.paymentForm.patchValue({
      'date': new Date(params.data.tAmount),
      'tAmount': params.data.date,
      'paidAmount': params.data.paidAmount,
      'outAmount': params.data.outAmount,
      'modeofPay': params.data.modeofPay,
      'chequeNo': params.data.chequeNo,
      'payIdno': params.data.payIdno,
      'status': params.data.status,
      'dueDate': new Date(params.data.dueDate),
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Payment";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.paymentManager.paymentDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.payment.length; i++) {
            if (this.payment[i].slNo == params.data.slNo) {
              this.payment?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Payment Removed Successfully");
        });
      }
    })
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onPaidAmountChange(event: any) {
    let paidAmt = event.target.value
    setTimeout(() => {

      if ((this.f.tAmount.value >= paidAmt) && (paidAmt != 0)) {
        let outAmount = this.f.tAmount.value - paidAmt

        this.paymentForm.patchValue({
          'outAmount': outAmount,
        });

        if (outAmount == 0) {
          this.paymentForm.patchValue({
            'status': "Paid",
          });
        } else {
          this.paymentForm.patchValue({
            'status': "Partially Paid",
          });
        }

      } else {
        this.calloutService.showWarning("Paid Amount Is Not Valid");
        this.paymentForm.controls.outAmount.reset();
        this.paymentForm.controls.status.reset();
      }
    }, 100);
  }

  onmodeofPayChange(event: any) {

    let modeofpay = event.target.value;
    setTimeout(() => {
      if ((modeofpay == "NEFT") || (modeofpay == "UPI")) {
        this.paymentForm.controls.chequeNo.reset();
        this.paymentForm.get('chequeNo').disable();
        this.paymentForm.get('payIdno').enable();
      } else {
        this.paymentForm.controls.payIdno.reset();
        this.paymentForm.get('payIdno').disable();
        this.paymentForm.get('chequeNo').enable();
      }
    }, 100);
  }

  onpaymentClick(event: any, paymentForm: any) {

    this.markFormGroupTouched(this.paymentForm);
    this.submitted = true;
    if (this.paymentForm.invalid) {
      return;
    }

    let payment001wb = new Payment001wb();
    payment001wb.date = new Date(this.f.date.value);
    payment001wb.tAmount = this.f.tAmount.value ? this.f.tAmount.value : "";
    payment001wb.paidAmount = this.f.paidAmount.value ? this.f.paidAmount.value : "";
    payment001wb.outAmount = this.f.outAmount.value ? this.f.outAmount.value : 0;
    payment001wb.modeofPay = this.f.modeofPay.value ? this.f.modeofPay.value : "";
    payment001wb.chequeNo = this.f.chequeNo.value ? this.f.chequeNo.value : "";
    payment001wb.payIdno = this.f.payIdno.value ? this.f.payIdno.value : "";
    payment001wb.status = this.f.status.value ? this.f.status.value : "";
    payment001wb.dueDate = new Date(this.f.dueDate.value);
    if (this.slNo) {
      payment001wb.slNo = this.slNo;
      payment001wb.unitslno = this.unitslno;
      payment001wb.insertUser = this.insertUser;
      payment001wb.insertDatetime = this.insertDatetime;
      payment001wb.updatedUser = this.authManager.getcurrentUser.username;
      payment001wb.updatedDatetime = new Date();
      this.paymentManager.paymentUpdate(payment001wb).subscribe((response) => {
        this.calloutService.showSuccess("Payment Updated Successfully");
        this.paymentForm.reset();
        this.loadData();
        this.paymentForm.patchValue(
          { date: this.datepipe.transform(new Date(), 'dd-MM-yyyy') }
        );
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      payment001wb.date = new Date();
      payment001wb.unitslno = this.user.unitslno;
      payment001wb.insertUser = this.authManager.getcurrentUser.username;
      payment001wb.insertDatetime = new Date();
      if (payment001wb.chequeNo || payment001wb.payIdno) {
        this.paymentManager.paymentSave(payment001wb).subscribe((response) => {
          this.calloutService.showSuccess("Payment Saved Successfully");
          this.paymentForm.reset();
          this.paymentForm.patchValue(
            { date: this.datepipe.transform(new Date(), 'dd-MM-yyyy') }
          );
          this.loadData();
          this.submitted = false;
        });
      } else {
        this.calloutService.showWarning("Please enter paid details");
      }

    }
  }

  onReset() {
    this.submitted = false;
    this.paymentForm.reset();
  }

  onPayClick() {

  }

  onCancelClick() {
    this.activeModal.close('No');
  }


  // onViewClick() {
  //   this.paymentManager.paymentPdf(this.user.unitslno).subscribe((response) => {
  //     var blob = new Blob([response], { type: 'application/pdf' });
  //     var blobURL = URL.createObjectURL(blob);
  //     window.open(blobURL);
  //   })
  // }

  // onGeneratePdfReport() {
  //   this.paymentManager.paymentPdf(this.user.unitslno).subscribe((response) => {
  //     saveAs(response, "payment");
  //   })
  // }

  // onGenerateExcelReport() {
  //   this.paymentManager.paymentExcel(this.user.unitslno).subscribe((response) => {
  //     saveAs(response, "payment");
  //   })
  // }

}