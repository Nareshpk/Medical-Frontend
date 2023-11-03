import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Treatment001mb } from "../entities/Treatment001mb";


@Injectable()
export class TreatmentManager extends BaseService {
  private treatmentUrl: string = `${environment.apiUrl}/treatment`
  alltreatment(unitslno: any) {
    let data: any = {};
    data['unitslno'] = unitslno;
    return this.getCallService(`${this.treatmentUrl}` + "/findAll",data);
  }

  treatmentsave(treatment001mb: Treatment001mb) {

    return this.postCallService(`${this.treatmentUrl}` + "/save", {}, treatment001mb);
  }
  treatmentupdate(treatment001mb: Treatment001mb) {
    return this.putCallService(`${this.treatmentUrl}` + "/update", {}, treatment001mb);
  }

  treatmentdelete(slNo: any) {
    let data: any = {};
    data['slNo'] = slNo;
    return this.deleteCallService(`${this.treatmentUrl}` + "/delete", data);
  }
  findOne(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.getCallService(`${this.treatmentUrl}`, data);
  }

}
