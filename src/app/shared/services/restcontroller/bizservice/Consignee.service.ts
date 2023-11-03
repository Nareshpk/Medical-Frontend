import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Consignee001mb } from "../entities/Consignee001mb";



@Injectable()
export class ConsigneeManager extends BaseService {

    private ConsigneeUrl: string = `${environment.apiUrl}/consignee`

    allconsignee(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.ConsigneeUrl}` + "/findAll",data);
    }

    findAllbyPurchaseOrderId(slNo: any) {
        let poslNo: any = {};
        poslNo['slNo'] = slNo;
        return this.getCallService(`${this.ConsigneeUrl}` + "/findAllbyPurchaseOrderId", poslNo);
    }

    consigneeSave(consignee001mb: Consignee001mb) {
        return this.postCallService(`${this.ConsigneeUrl}` + "/save", {}, consignee001mb);
    }

    consigneeUpdate(consignee001mb: Consignee001mb) {
        return this.putCallService(`${this.ConsigneeUrl}` + "/update", {}, consignee001mb);
    }

    findAllByconsignee(consigneeSlno: any) {
        let data: any = {};
        data['consigneeSlno'] = consigneeSlno;
        return this.getCallService(`${this.ConsigneeUrl}`, data);
    }

    consigneeDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.ConsigneeUrl}` + "/delete", data);
    }

    consigneePdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.ConsigneeUrl}` + "/pdf",data)
    }
    consigneeExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.ConsigneeUrl}` + "/excel",data)
    }

}