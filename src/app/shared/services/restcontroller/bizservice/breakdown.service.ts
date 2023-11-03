import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Breakdown001mb } from "../entities/Breakdown001mb";

@Injectable()
export class BreakdownSettingManager extends BaseService {
    private breakdownUrl: string = `${environment.apiUrl}/breakdown`

    allbreakdown(unitslno:any) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.breakdownUrl}` + "/findAll",data);
    }

    breakdowntsave(breakdown001mb: Breakdown001mb) {
        return this.postCallService(`${this.breakdownUrl}` + "/save", {}, breakdown001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.breakdownUrl}`, data);
    }

    breakdownupdate(breakdown001mb: Breakdown001mb) {
        return this.putCallService(`${this.breakdownUrl}` + "/update", {}, breakdown001mb);
    }

    breakdowndelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.breakdownUrl}` + "/delete", data);
    }

    breakPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.breakdownUrl}` + "/pdf",data)
    }
    breakExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.breakdownUrl}` + "/excel",data)
    }
}