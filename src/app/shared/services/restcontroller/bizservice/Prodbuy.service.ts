import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Prodbuy001mb } from "../entities/Prodbuy001mb";

@Injectable()
export class ProdbuyManager extends BaseService {
    private ProdbuytUrl: string = `${environment.apiUrl}/Prodbuy`
    allProdbuy(unitslno: any) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.ProdbuytUrl}` + "/findAll", data);
    }

    getCount() {
        return this.getCallService(`${this.ProdbuytUrl}` + "/getCount");
      }

    Prodbuysave(prodbuy001mb: Prodbuy001mb) {

        return this.postCallService(`${this.ProdbuytUrl}` + "/save", {}, prodbuy001mb);
    }

    Prodbuyupdate(prodbuy001mb: Prodbuy001mb) {
        return this.putCallService(`${this.ProdbuytUrl}` + "/update", {}, prodbuy001mb);
    }

    Prodbuydelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.ProdbuytUrl}` + "/delete", data);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.ProdbuytUrl}`, data);
    }

}
