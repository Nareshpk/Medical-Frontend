import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Orderitem001wb } from "../entities/orderitem001wb";



@Injectable()
export class OrderItemManager extends BaseService {
    private orderItemUrl: string = `${environment.apiUrl}/orderitem`



    allorder(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.orderItemUrl}` + "/findAll",data);
    }
    findNotificationAll() {
        return this.getCallService(`${this.orderItemUrl}` + "/findNotificationAll");
    }
    


    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.orderItemUrl}`, data);
    }

    ordersave(orderitem001wb : Orderitem001wb ) {
    return this.postCallService(`${this.orderItemUrl}` + "/save", {}, orderitem001wb );
    }
  
    orderUpdate(orderitem001wb: Orderitem001wb) {
        return this.putCallService(`${this.orderItemUrl}` + "/update", {}, orderitem001wb);
    }
  

    orderDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.orderItemUrl}` + "/delete", data);
    }

}