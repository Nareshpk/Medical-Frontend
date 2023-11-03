import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Partitem001wb } from "../entities/Partitem001wb";


@Injectable()
export class PartItemManager extends BaseService {
    private PartitemUrl: string = `${environment.apiUrl}/partitem`


    allpartitem(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.PartitemUrl}` + "/findAll",data);
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.PartitemUrl}`, data);
    }

    partitemSave(partitem001wb: Partitem001wb) {
        return this.postCallService(`${this.PartitemUrl}` + "/save", {}, partitem001wb);
    }

    partitemUpdate(partitem001wb: Partitem001wb) {
        return this.putCallService(`${this.PartitemUrl}` + "/update", {}, partitem001wb);
    }

    


    parttDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.PartitemUrl}` + "/delete", data);
    }

    partPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.PartitemUrl}` + "/pdf", data)
    }

    partExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.PartitemUrl}` + "/excel", data)
    }
}