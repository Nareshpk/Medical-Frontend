import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Patientop001mb } from "../entities/Patientop001mb";


@Injectable()
export class PatientOpManager extends BaseService {
  private patientopUrl: string = `${environment.apiUrl}/patientop`
  allpatientop(unitslno:any) {
    let data: any = {};
    data['unitslno'] = unitslno;
    return this.getCallService(`${this.patientopUrl}` + "/findAll",data);
  }

  getCount() {
    return this.getCallService(`${this.patientopUrl}` + "/getCount");
  }

  patientopsave(patientop001mb: Patientop001mb) {
    console.log("patientop001mb", patientop001mb);

    return this.postCallService(`${this.patientopUrl}` + "/save", {}, patientop001mb);
  }
  patientopupdate(patientop001mb: Patientop001mb) {
    return this.putCallService(`${this.patientopUrl}` + "/update", {}, patientop001mb);
  }

  patientopdelete(slNo: any) {
    let data: any = {};
    data['slNo'] = slNo;
    return this.deleteCallService(`${this.patientopUrl}` + "/delete", data);
  }
  findOne(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.getCallService(`${this.patientopUrl}`, data);
}

}
