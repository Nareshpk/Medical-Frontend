import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Partspecification001wb } from "../entities/Partspecification001wb";


@Injectable()
export class PartspecificationManager extends BaseService {
    private PartspecificationUrl: string = `${environment.apiUrl}/partspecific`
    

    allPartspecification(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.PartspecificationUrl}` + "/findAll",data);
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.PartspecificationUrl}`, data);
    }

    PartspecificationSave(partspecification001wb: Partspecification001wb) {
        return this.postCallService(`${this.PartspecificationUrl}` + "/save", {}, partspecification001wb);
    }

    PartspecificationUpdate(partspecification001wb: Partspecification001wb) {        
        return this.putCallService(`${this.PartspecificationUrl}` + "/update", {}, partspecification001wb);
    }

    PartspecificationDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.PartspecificationUrl}` + "/delete", data);
    }

    PartspecificationPdf() {
        return this.getCallService1(`${this.PartspecificationUrl}` + "/pdf")
    }
    PartspecificationExcel() {
        return this.getCallService1(`${this.PartspecificationUrl}` + "/excel")
    }
}