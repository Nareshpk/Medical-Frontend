import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Customerconsignee001mb } from "../entities/Customerconsignee001mb";

@Injectable()
export class CustomerConsigneeManager extends BaseService {
    private customerConsigneeUrl: string = `${environment.apiUrl}/customerConsignee`

    customerConsigneeSave(customerconsignee001mb: Customerconsignee001mb) {
        return this.postCallService(`${this.customerConsigneeUrl}` + "/save", {}, customerconsignee001mb);
    }

    customerConsigneeUpdate(customerconsignee001mb: Customerconsignee001mb) {
        return this.putCallService(`${this.customerConsigneeUrl}` + "/update", {}, customerconsignee001mb);
    }

    allCustomerConsignee(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.customerConsigneeUrl}` + "/findAll",data);
    }

    findAllbyConsigneeId(slNo: any) {
        let poslNo: any = {};
        poslNo['slNo'] = slNo;
        return this.getCallService(`${this.customerConsigneeUrl}` + "/findAllbyConsigneeId", poslNo);
    }


    customerConsigneeDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.customerConsigneeUrl}` + "/delete", data);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.customerConsigneeUrl}`, data);
    }

    custconsigneePdf(unitslno:number) {  
        let data: any = {};
        data['unitslno'] = unitslno;   
        return this.getCallService1(`${this.customerConsigneeUrl}` + "/pdf",data)
    }
    custconsigneeExcel(unitslno:number) {
        console.log("1--->");
        
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.customerConsigneeUrl}` + "/excel",data)
    }
}