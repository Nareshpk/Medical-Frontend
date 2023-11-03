import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";

@Injectable()
export class PurchaseInvoicePayItemManager extends BaseService {
    private purchaseInvoicePayItemUrl: string = `${environment.apiUrl}/PurchaseInvoicePayItem`
    
    allPurchaseItem(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.purchaseInvoicePayItemUrl}` + "/findAll",data);
    }

}