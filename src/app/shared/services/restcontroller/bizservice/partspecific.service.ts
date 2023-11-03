import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Partspecific001wb } from "../entities/partspecifc001wb";



@Injectable()
export class PartSpecificManager extends BaseService {
    private partSpecificationUrl: string = `${environment.apiUrl}/partspecif`
    

   partspecificationall(unitslno:number) {
    let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.partSpecificationUrl}` + "/findAll",data);
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.partSpecificationUrl}`, data);
    }

    partspecificationSave(partspecific001wb:Partspecific001wb) {
        return this.postCallService(`${this.partSpecificationUrl}` + "/save", {}, partspecific001wb);
    }

   partspecificationUpdate(partspecific001wb: Partspecific001wb) {        
        return this.putCallService(`${this.partSpecificationUrl}` + "/update", {}, partspecific001wb);
    }

   partspecificationDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.partSpecificationUrl}` + "/delete", data);
    }

    // findAllbyspecificationId(slNo: any) {
    //     let poslNo: any = {};
    //     poslNo['slNo'] = slNo;
    //     return this.getCallService(`${this.orderSpecificationUrl}` + "/findAllbyspecificationId", poslNo);
    // }


    


}