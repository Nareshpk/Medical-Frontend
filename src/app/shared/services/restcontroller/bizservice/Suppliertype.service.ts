import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Suppliertype001mb } from "../entities/Suppliertype001mb";

@Injectable()
export class SupplierTypeManager extends BaseService {
    private statusUrl: string = `${environment.apiUrl}/suppliertype`

    allsuppliertype(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.statusUrl}` + "/findAll",data);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.statusUrl}`, data);
    }

    suppliertypsave(suppliertype001mb: Suppliertype001mb) {
        return this.postCallService(`${this.statusUrl}` + "/save", {}, suppliertype001mb);
    }

    suppliertypupdate(suppliertype001mb: Suppliertype001mb) {
        return this.putCallService(`${this.statusUrl}` + "/update", {}, suppliertype001mb);
    }

    suppliertypdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.statusUrl}`+"/delete", data);
    }

    supliertypePdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.statusUrl}` + "/pdf", data)
    }
    
    supliertypeExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.statusUrl}` + "/excel", data)
    }
}