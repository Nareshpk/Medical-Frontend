import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Supplierquotationitems001wb } from "../entities/Supplierquotationitems001wb";





@Injectable()
export class SupplierQuotationItemManager extends BaseService {
    private supplierQuotationItemUrl: string = `${environment.apiUrl}/supplierquotaitem`



    allsupplierItem(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.supplierQuotationItemUrl}` + "/findAll",data);
    }
    findNotificationAll() {
        return this.getCallService(`${this.supplierQuotationItemUrl}` + "/findNotificationAll");
    }
    


    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.supplierQuotationItemUrl}`, data);
    }

    supplierItemsave(purchasereqitem001wb : Supplierquotationitems001wb ) {
    return this.postCallService(`${this.supplierQuotationItemUrl}` + "/save", {}, purchasereqitem001wb );
    }
  
    supplierItemUpdate(purchasereqitem001wb: Supplierquotationitems001wb) {
        return this.putCallService(`${this.supplierQuotationItemUrl}` + "/update", {}, purchasereqitem001wb);
    }
  

    supplierItemDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.supplierQuotationItemUrl}` + "/delete", data);
    }

}