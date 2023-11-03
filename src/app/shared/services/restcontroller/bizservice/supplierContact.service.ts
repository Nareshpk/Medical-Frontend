import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { SupplierContact001wb } from "../entities/SupplierContact001wb";



@Injectable()
export class SupplierContactManager extends BaseService {
    private SupplierContactUrl: string = `${environment.apiUrl}/suppliercontact`
    

    suppliercontactall(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.SupplierContactUrl}` + "/findAll",data);
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.SupplierContactUrl}`, data);
    }

    findAllbysupplierId(slNo: any) {
        let poslNo: any = {};
        poslNo['slNo'] = slNo;
        return this.getCallService(`${this.SupplierContactUrl}` + "/findAllbysupplierId", poslNo);
    }

    suppliercontactSave(supplierContact001wb: SupplierContact001wb) {
        return this.postCallService(`${this.SupplierContactUrl}` + "/save", {}, supplierContact001wb);
    }

    suppliercontactUpdate(supplierContact001wb: SupplierContact001wb) {        
        return this.putCallService(`${this.SupplierContactUrl}` + "/update", {}, supplierContact001wb);
    }

    suppliercontactDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.SupplierContactUrl}` + "/delete", data);
    }


    


}