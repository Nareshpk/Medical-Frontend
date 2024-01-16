import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Prodmaster001mb } from "../entities/Prodmaster001mb";

@Injectable()
export class ProdmasterManager extends BaseService {
    private prodmastertUrl: string = `${environment.apiUrl}/Prodmaster`
    allprodmaster(unitslno: any) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.prodmastertUrl}` + "/findAll", data);
    }

    getCount() {
        return this.getCallService(`${this.prodmastertUrl}` + "/getCount");
      }

    prodmastersave(prodmaster001mb: Prodmaster001mb) {

        return this.postCallService(`${this.prodmastertUrl}` + "/save", {}, prodmaster001mb);
    }

    prodmasterupdate(prodmaster001mb: Prodmaster001mb) {
        return this.putCallService(`${this.prodmastertUrl}` + "/update", {}, prodmaster001mb);
    }

    prodmasterdelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.prodmastertUrl}` + "/delete", data);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.prodmastertUrl}`, data);
    }

}
