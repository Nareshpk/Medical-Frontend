import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Custemer001wb } from "../entities/Custemer001wb";
import { Orderitem001wb } from "../entities/orderitem001wb";



@Injectable()
export class CustemerAddManager extends BaseService {
    private custemerUrl: string = `${environment.apiUrl}/custemerwb`



    allcustemer(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.custemerUrl}` + "/findAll",data);
    }
    findNotificationAll() {
        return this.getCallService(`${this.custemerUrl}` + "/findNotificationAll");
    }
    


    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.custemerUrl}`, data);
    }

    custemersave(custemer001wb : Custemer001wb ) {
    return this.postCallService(`${this.custemerUrl}` + "/save", {}, custemer001wb );
    }
  
    custemerUpdate(custemer001wb: Custemer001wb) {
        return this.putCallService(`${this.custemerUrl}` + "/update", {}, custemer001wb);
    }
  

    custemerDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.custemerUrl}` + "/delete", data);
    }

}