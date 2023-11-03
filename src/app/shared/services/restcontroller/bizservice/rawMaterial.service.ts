import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Rawmaterial001wb } from "../entities/Rawmaterial001wb";


@Injectable()
export class RawmaterialManager extends BaseService {
    private RawmaterialUrl: string = `${environment.apiUrl}/part`


    allpart() {
        return this.getCallService(`${this.RawmaterialUrl}` + "/findAll");
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.RawmaterialUrl}`, data);
    }

    partSave(rawmaterial001wb: Rawmaterial001wb) {
        return this.postCallService(`${this.RawmaterialUrl}` + "/save", {}, rawmaterial001wb);
    }

    partUpdate(rawmaterial001wb: Rawmaterial001wb) {
        return this.putCallService(`${this.RawmaterialUrl}` + "/update", {}, rawmaterial001wb);
    }
    getCount() {
        return this.getCallService(`${this.RawmaterialUrl}` + "/getCount");
    }


    parttDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.RawmaterialUrl}` + "/delete", data);
    }

  
}