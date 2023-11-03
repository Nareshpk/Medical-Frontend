import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Salesorder001wb } from "../entities/Salesorder001wb";

@Injectable()

export class SalesOrderManager extends BaseService {
    private SalesOrderUrl: string = `${environment.apiUrl}/sales`

    allsale(unitslno:number) {
        let data:any ={};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.SalesOrderUrl}` + "/findAll",data);
    }

    salesave(salesorder001wb: Salesorder001wb) {
        return this.postCallService(`${this.SalesOrderUrl}` + "/save", {}, salesorder001wb);
    }

    saleupdate(salesorder001wb: Salesorder001wb) {
        return this.putCallService(`${this.SalesOrderUrl}` + "/update", {}, salesorder001wb);
    }

    saledelete(id: any) {
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