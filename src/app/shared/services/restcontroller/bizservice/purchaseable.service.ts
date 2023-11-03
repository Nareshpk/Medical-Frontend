import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Purchaseable001mb } from "../entities/purchaseable001mb";



@Injectable()
export class PurchaseableManager extends BaseService {
    private purchaseableUrl: string = `${environment.apiUrl}/purchaseable`
    

    allpurchaseable(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.purchaseableUrl}` + "/findAll",data);
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.purchaseableUrl}`, data);
    }

    purchaseableSave(purchaseable001mb: Purchaseable001mb) {
        
        return this.postCallService(`${this.purchaseableUrl}` + "/save", {}, purchaseable001mb);
    }

    purchaseableUpdate(purchaseable001mb: Purchaseable001mb) {        
        return this.putCallService(`${this.purchaseableUrl}` + "/update", {}, purchaseable001mb);
    }

    purchaseableDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.purchaseableUrl}` + "/delete", data);
    }

    // prodPdf() {
    //     return this.getCallService1(`${this.purchaseableUrl}` + "/pdf")
    // }
    // prodExcel() {
    //     return this.getCallService1(`${this.purchaseableUrl}` + "/excel")
    // }
}