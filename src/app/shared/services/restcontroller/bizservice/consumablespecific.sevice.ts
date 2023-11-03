import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Consumerspecification001wb } from "../entities/consumablespecific001wb";



@Injectable()
export class ConsumerspecificationManager extends BaseService {
    private cosumSpecificationUrl: string = `${environment.apiUrl}/consumerspecification`
    

   cosumspecificationall(unitslno:number) {
    let data: any = {};
    data['unitslno'] = unitslno;
        return this.getCallService(`${this.cosumSpecificationUrl}` + "/findAll",data);
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.cosumSpecificationUrl}`, data);
    }

    cosumspecificationSave(consumerspecification001wb:Consumerspecification001wb) {
        return this.postCallService(`${this.cosumSpecificationUrl}` + "/save", {}, consumerspecification001wb);
    }

    cosumspecificationUpdate(consumerspecification001wb: Consumerspecification001wb) {        
        return this.putCallService(`${this.cosumSpecificationUrl}` + "/update", {}, consumerspecification001wb);
    }

    cosumspecificationDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.cosumSpecificationUrl}` + "/delete", data);
    }

    // findAllbyspecificationId(slNo: any) {
    //     let poslNo: any = {};
    //     poslNo['slNo'] = slNo;
    //     return this.getCallService(`${this.orderSpecificationUrl}` + "/findAllbyspecificationId", poslNo);
    // }


    


}