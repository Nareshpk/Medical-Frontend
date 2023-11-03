import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Diagnosis001mb } from "../entities/Diagnosis001mb";


@Injectable()
export class DiagnosisManager extends BaseService {
  private diagnosistUrl: string = `${environment.apiUrl}/diagnosis`
  alldiagnosis(unitslno:any) {
    let data: any = {};
    data['unitslno'] = unitslno;
    return this.getCallService(`${this.diagnosistUrl}` + "/findAll",data);
  }

  diagnosissave(diagnosis001mb: Diagnosis001mb) {

    return this.postCallService(`${this.diagnosistUrl}` + "/save", {}, diagnosis001mb);
  }
  diagnosisupdate(diagnosis001mb: Diagnosis001mb) {
    return this.putCallService(`${this.diagnosistUrl}` + "/update", {}, diagnosis001mb);
  }

  diagnosisdelete(slNo: any) {
    let data: any = {};
    data['slNo'] = slNo;
    return this.deleteCallService(`${this.diagnosistUrl}` + "/delete", data);
  }
  findOne(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.getCallService(`${this.diagnosistUrl}`, data);
  }

}
