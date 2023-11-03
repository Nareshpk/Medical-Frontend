import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { SalesQuotation001wb } from "../entities/salesQuotation001wb";




@Injectable()
export class SalesQuotationManager extends BaseService {

    private salesquotationrUrl: string = `${environment.apiUrl}/salesquotation`

    allsalesquotation(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.salesquotationrUrl}` + "/findAll",data);
    }

    salesquotationsave(salesQuotation001wb: SalesQuotation001wb) {
        return this.postCallService(`${this.salesquotationrUrl}` + "/save", {}, salesQuotation001wb);
    }

    salesquotationupdate(salesQuotation001wb: SalesQuotation001wb) {
        return this.putCallService(`${this.salesquotationrUrl}` + "/update", {}, salesQuotation001wb);
    }
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.salesquotationrUrl}`, data);
    }

    salesquotationdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.salesquotationrUrl}` + "/delete", data);
    }

    salesquotationPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.salesquotationrUrl}` + "/pdf", data)
    }

    salesquotationParamsPdf(id: any,unitslno:number) {
        let data: any = {};
        data['id'] = id;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.salesquotationrUrl}` + "/pdf", data);
    }
    salesquotationExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.salesquotationrUrl}` + "/excel", data)
    }
   
    salesquotationsingleExcel(id:any,unitslno:number) {
        let data: any = {};
        data['id'] = id;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.salesquotationrUrl}` + "/excel", data)
    }

    getCount() {
        return this.getCallService(`${this.salesquotationrUrl}` + "/getCount");
    }

    getCount1() {
        return this.getCallService(`${this.salesquotationrUrl}` + "/getCount1");
    }

}