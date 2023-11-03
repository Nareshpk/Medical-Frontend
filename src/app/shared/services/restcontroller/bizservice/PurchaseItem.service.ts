import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { PurchaseItem001wb } from "../entities/purchaseItesm001wb";



@Injectable()
export class PurchaseItemManager extends BaseService {
    private purchaseItemUrl: string = `${environment.apiUrl}/purchaseItem`



    allorder() {
        return this.getCallService(`${this.purchaseItemUrl}` + "/findAll");
    }
    findNotificationAll() {
        return this.getCallService(`${this.purchaseItemUrl}` + "/findNotificationAll");
    }
    


    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.purchaseItemUrl}`, data);
    }

    purchaseItemsave(purchaseItem001wb : PurchaseItem001wb ) {
    return this.postCallService(`${this.purchaseItemUrl}` + "/save", {}, purchaseItem001wb );
    }
  
    purchaseItemUpdate(purchaseItem001wb: PurchaseItem001wb) {
        return this.putCallService(`${this.purchaseItemUrl}` + "/update", {}, purchaseItem001wb);
    }
  

    purchaseItemDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.purchaseItemUrl}` + "/delete", data);
    }

}