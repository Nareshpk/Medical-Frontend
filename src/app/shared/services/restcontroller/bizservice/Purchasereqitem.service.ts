import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Purchasereqitem001wb } from "../entities/purchasereqitems001wb";




@Injectable()
export class PurchasereqItemManager extends BaseService {
    private purchasereqItemUrl: string = `${environment.apiUrl}/purchasereqitem`



    allpurchasereqItem(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.purchasereqItemUrl}` + "/findAll",data);
    }
    findNotificationAll() {
        return this.getCallService(`${this.purchasereqItemUrl}` + "/findNotificationAll");
    }
    


    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.purchasereqItemUrl}`, data);
    }

    purchasereqItemsave(purchasereqitem001wb : Purchasereqitem001wb ) {
    return this.postCallService(`${this.purchasereqItemUrl}` + "/save", {}, purchasereqitem001wb );
    }
  
    purchasereqItemUpdate(purchasereqitem001wb: Purchasereqitem001wb) {
        return this.putCallService(`${this.purchasereqItemUrl}` + "/update", {}, purchasereqitem001wb);
    }
  

    purchasereqItemrDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.purchasereqItemUrl}` + "/delete", data);
    }

}