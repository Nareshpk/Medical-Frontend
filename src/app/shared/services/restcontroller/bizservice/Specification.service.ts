import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Specification001wb } from "../entities/Specification001wb";



@Injectable()
export class SpecificationManager extends BaseService {
    private SpecificationUrl: string = `${environment.apiUrl}/specification`
    

    specificationall(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.SpecificationUrl}` + "/findAll",data);
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.SpecificationUrl}`, data);
    }

    specificationSave(specification001wb: Specification001wb) {
        return this.postCallService(`${this.SpecificationUrl}` + "/save", {}, specification001wb);
    }

    specificationUpdate(specification001wb: Specification001wb) {        
        return this.putCallService(`${this.SpecificationUrl}` + "/update", {}, specification001wb);
    }

    specificationDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.SpecificationUrl}` + "/delete", data);
    }

    findAllbyspecificationId(slNo: any) {
        let poslNo: any = {};
        poslNo['slNo'] = slNo;
        return this.getCallService(`${this.SpecificationUrl}` + "/findAllbyspecificationId", poslNo);
    }


    


}