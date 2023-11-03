import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Patient001mb } from "../entities/Patient001mb";


@Injectable()
export class PatientManager extends BaseService {
  private patienttUrl: string = `${environment.apiUrl}/patient`
  allpatient(unitslno: any) {
    let data: any = {};
    data['unitslno'] = unitslno;
    return this.getCallService(`${this.patienttUrl}` + "/findAll", data);
  }

  getCount() {
    return this.getCallService(`${this.patienttUrl}` + "/getCount");
  }

  patientsave(patient001mb: Patient001mb) {

    return this.postCallService(`${this.patienttUrl}` + "/save", {}, patient001mb);
  }
  patientupdate(patient001mb: Patient001mb) {
    return this.putCallService(`${this.patienttUrl}` + "/update", {}, patient001mb);
  }

  patientdelete(slNo: any) {
    let data: any = {};
    data['slNo'] = slNo;
    return this.deleteCallService(`${this.patienttUrl}` + "/delete", data);
  }
  findOne(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.getCallService(`${this.patienttUrl}`, data);
  }

}
