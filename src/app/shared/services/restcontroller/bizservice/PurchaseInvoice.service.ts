import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { PurchaseInvoice001wb } from "../entities/PurchaseInvoice001wb";

@Injectable()

export class PurchaseInvoiceManager extends BaseService {
    private SalesOrderUrl: string = `${environment.apiUrl}/sales`

    allpurchaseInvoice(unitslno:number) {
        let data:any ={};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.SalesOrderUrl}` + "/findAll",data);
    }

    purchaseInvoicesave(purchaseInvoice001wb: PurchaseInvoice001wb) {
        return this.postCallService(`${this.SalesOrderUrl}` + "/save", {}, purchaseInvoice001wb);
    }

    purchaseInvoiceupdate(purchaseInvoice001wb: PurchaseInvoice001wb) {
        return this.putCallService(`${this.SalesOrderUrl}` + "/update", {}, purchaseInvoice001wb);
    }

    purchaseInvoicedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.SalesOrderUrl}` + "/delete", data);
    }

    findAllbySalesOrderId(slNo: any) {
        let salesno: any = {};
        salesno['salesno'] = slNo;
        return this.getCallService(`${this.SalesOrderUrl}` + "/findAllbySalesOrderId", salesno);
    }

    onGeneratePdfReport() {
        return this.getCallService1(`${this.SalesOrderUrl}` + "/pdf")
    }

    onGenerateExcelReport() {
        return this.getCallService1(`${this.SalesOrderUrl}` + "/excel")
    }
}