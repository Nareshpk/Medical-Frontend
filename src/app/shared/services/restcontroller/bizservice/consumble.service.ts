import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Consumble001mb } from "../entities/Consumble001mb";



@Injectable()
export class ConsumbleManager extends BaseService {
    private consumbleUrl: string = `${environment.apiUrl}/consumble`


    allconsumble(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.consumbleUrl}` + "/findAll",data);
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.consumbleUrl}`, data);
    }

    consumbleSave(consumble001mb: Consumble001mb) {
        return this.postCallService(`${this.consumbleUrl}` + "/save", {}, consumble001mb);
    }

    consumbleUpdate(consumble001mb: Consumble001mb) {
        return this.putCallService(`${this.consumbleUrl}` + "/update", {}, consumble001mb);
    }
    getCount() {
        return this.getCallService(`${this.consumbleUrl}` + "/getCount");
    }


    consumbletDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.consumbleUrl}` + "/delete", data);
    }

    consumblePdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.consumbleUrl}` + "/pdf", data)
    }

    consumbleExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.consumbleUrl}` + "/excel", data)
    }
}