import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Orderitemspecification001wb } from "../entities/Orderitemspecification001wb";



@Injectable()
export class OrderSpecificationManager extends BaseService {
    private orderSpecificationUrl: string = `${environment.apiUrl}/orderspecification`
    

    orderspecificationall(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.orderSpecificationUrl}` + "/findAll",data);
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.orderSpecificationUrl}`, data);
    }

    orderspecificationSave(orderitemspecification001wb:Orderitemspecification001wb) {
        return this.postCallService(`${this.orderSpecificationUrl}` + "/save", {}, orderitemspecification001wb);
    }

    orderspecificationUpdate(orderitemspecification001wb: Orderitemspecification001wb) {        
        return this.putCallService(`${this.orderSpecificationUrl}` + "/update", {}, orderitemspecification001wb);
    }

    orderspecificationDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.orderSpecificationUrl}` + "/delete", data);
    }

    // findAllbyspecificationId(slNo: any) {
    //     let poslNo: any = {};
    //     poslNo['slNo'] = slNo;
    //     return this.getCallService(`${this.orderSpecificationUrl}` + "/findAllbyspecificationId", poslNo);
    // }


    


}