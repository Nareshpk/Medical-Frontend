import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Salesinvoice001wb } from "../entities/Salesinvoice001wb";




@Injectable()
export class SalesInvoiceManager extends BaseService {

    private salesinvoicerUrl: string = `${environment.apiUrl}/salesinvocie`

    allsalesinvoice(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.salesinvoicerUrl}` + "/findAll",data);
    }

    salesinvoicesave(salesinvoice001wb: Salesinvoice001wb) {
        
        return this.postCallService(`${this.salesinvoicerUrl}` + "/save", {}, salesinvoice001wb);
    }

    salesinvoiceupdate(salesinvoice001wb: Salesinvoice001wb) {
        return this.putCallService(`${this.salesinvoicerUrl}` + "/update", {}, salesinvoice001wb);
    }
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.salesinvoicerUrl}`, data);
    }

    salesinvoicedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.salesinvoicerUrl}` + "/delete", data);
    }

    salesinvoicePdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.salesinvoicerUrl}` + "/pdf", data)
    }

    salesinvoiceParamsPdf(id: any,unitslno:number) {
        let data: any = {};
        data['id'] = id;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.salesinvoicerUrl}` + "/pdf", data);
    }
    salesinvoiceExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.salesinvoicerUrl}` + "/excel", data)
    }
   
    salesinvoicesingleExcel(id:any,unitslno:number) {
        let data: any = {};
        data['id'] = id;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.salesinvoicerUrl}` + "/excel", data)
    }

    getCount() {
        return this.getCallService(`${this.salesinvoicerUrl}` + "/getCount");
    }

    getCount1() {
        return this.getCallService(`${this.salesinvoicerUrl}` + "/getCount1");
    }

}