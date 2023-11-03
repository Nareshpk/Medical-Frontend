import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Customercontact001wb } from "../entities/Customercontact001wb";

@Injectable()
export class CustomerContactManager extends BaseService {
    private customerContactUrl: string = `${environment.apiUrl}/custemerContact`

    suppliercontactall(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.customerContactUrl}` + "/findAll",data);
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.customerContactUrl}`, data);
    }

    findAllbysupplierId(slNo: any) {
        let poslNo: any = {};
        poslNo['slNo'] = slNo;
        return this.getCallService(`${this.customerContactUrl}` + "/findAllbysupplierId", poslNo);
    }

    suppliercontactSave(customerContact001wb: Customercontact001wb) {
        return this.postCallService(`${this.customerContactUrl}` + "/save", {}, customerContact001wb);
    }

    suppliercontactUpdate(customerContact001wb: Customercontact001wb) {        
        return this.putCallService(`${this.customerContactUrl}` + "/update", {}, customerContact001wb);
    }

    suppliercontactDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.customerContactUrl}` + "/delete", data);
    }
}