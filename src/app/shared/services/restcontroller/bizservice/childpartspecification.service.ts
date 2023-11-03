import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Childpartspecification001wb } from "../entities/childpartsepecific001wb";



@Injectable()
export class ChildPartspecificationManager extends BaseService {
    private cprtSpecificationUrl: string = `${environment.apiUrl}/ childpartspecification`
    

   cprtspecificationall(unitslno:number) {
    let data: any = {};
    data['unitslno'] = unitslno;
        return this.getCallService(`${this.cprtSpecificationUrl}` + "/findAll",data);
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.cprtSpecificationUrl}`, data);
    }

    cprtspecificationSave( childpartspecification001wb: Childpartspecification001wb) {
        return this.postCallService(`${this.cprtSpecificationUrl}` + "/save", {}, childpartspecification001wb);
    }

    cprtspecificationUpdate(childpartspecification001wb:  Childpartspecification001wb) {        
        return this.putCallService(`${this.cprtSpecificationUrl}` + "/update", {}, childpartspecification001wb);
    }

    cprtspecificationDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.cprtSpecificationUrl}` + "/delete", data);
    }

    // findAllbyspecificationId(slNo: any) {
    //     let poslNo: any = {};
    //     poslNo['slNo'] = slNo;
    //     return this.getCallService(`${this.orderSpecificationUrl}` + "/findAllbyspecificationId", poslNo);
    // }


    


}