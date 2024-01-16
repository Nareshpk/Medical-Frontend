import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Distribution001mb } from "../entities/Distribution001mb";

@Injectable()
export class DistributionManager extends BaseService {
    private DistributiontUrl: string = `${environment.apiUrl}/distribution`
    allDistribution(unitslno: any) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.DistributiontUrl}` + "/findAll", data);
    }

    getCount() {
        return this.getCallService(`${this.DistributiontUrl}` + "/getCount");
      }

    Distributionsave(distribution001mb: Distribution001mb) {

        return this.postCallService(`${this.DistributiontUrl}` + "/save", {}, distribution001mb);
    }

    Distributionupdate(distribution001mb: Distribution001mb) {
        return this.putCallService(`${this.DistributiontUrl}` + "/update", {}, distribution001mb);
    }

    Distributiondelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.DistributiontUrl}` + "/delete", data);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.DistributiontUrl}`, data);
    }

}
