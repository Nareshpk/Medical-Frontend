import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Patientmaster001mb } from "../entities/Patientmaster001mb";


@Injectable()
export class PatientmasterManager extends BaseService {
  private patientmastertUrl: string = `${environment.apiUrl}/patientmaster`
  allpatientmaster(unitslno: any) {
    let data: any = {};
    data['unitslno'] = unitslno;
    return this.getCallService(`${this.patientmastertUrl}` + "/findAll", data);
  }

  getCount() {
    return this.getCallService(`${this.patientmastertUrl}` + "/getCount");
  }

  patientmastersave(patientmaster001mb: Patientmaster001mb) {

    return this.postCallService(`${this.patientmastertUrl}` + "/save", {}, patientmaster001mb);
  }
  patientmasterupdate(patientmaster001mb: Patientmaster001mb) {
    return this.putCallService(`${this.patientmastertUrl}` + "/update", {}, patientmaster001mb);
  }

  patientmasterdelete(slNo: any) {
    let data: any = {};
    data['slNo'] = slNo;
    return this.deleteCallService(`${this.patientmastertUrl}` + "/delete", data);
  }
  findOne(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.getCallService(`${this.patientmastertUrl}`, data);
  }

}
