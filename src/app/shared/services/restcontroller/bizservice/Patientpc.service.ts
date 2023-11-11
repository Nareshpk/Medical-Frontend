import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Patientpc001mb } from "../entities/Patientpc001mb";


@Injectable()
export class PatientPcManager extends BaseService {
  private patientpcUrl: string = `${environment.apiUrl}/patientpc`
  allpatientpc(unitslno:any) {
    let data: any = {};
    data['unitslno'] = unitslno;
    return this.getCallService(`${this.patientpcUrl}` + "/findAll",data);
  }

  getCount() {
    return this.getCallService(`${this.patientpcUrl}` + "/getCount");
  }

  patientpcsave(patientpc001mb: Patientpc001mb[]) {
    return this.postCallService(`${this.patientpcUrl}` + "/save", {}, patientpc001mb);
  }
  patientpcupdate(patientpc001mb: Patientpc001mb[]) {
    return this.putCallService(`${this.patientpcUrl}` + "/update", {}, patientpc001mb);
  }

  patientpcdelete(slNo: any) {
    let data: any = {};
    data['slNo'] = slNo;
    return this.deleteCallService(`${this.patientpcUrl}` + "/delete", data);
  }
  findOne(id: any) {
    let data: any = {};
    data['id'] = id;
    console.log("data",data);
    
    return this.getCallService(`${this.patientpcUrl}`, data);
  }

}
